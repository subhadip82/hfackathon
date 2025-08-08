# from langchain_core.prompts import ChatPromptTemplate
# from langchain_core.output_parsers import StrOutputParser
# from langchain_community.llms import Ollama
# import streamlit as st

# # Prompt Template
# prompt = ChatPromptTemplate.from_messages([
#     ("system", "You are a helpful assistant. Please respond to the user queries."),
#     ("user", "Question: {question}")
# ])

# # Streamlit App
# st.title('LangChain Demo with LLaMA 3 (Ollama)')
# input_text = st.text_input("Ask your question")

# # LLM Setup
# llm = Ollama(model="llama3.1")
# output_parser = StrOutputParser()
# chain = prompt | llm | output_parser

# # Get Answer
# if input_text:
#     response = chain.invoke({"question": input_text})
#     st.write(response)





import os
import re
import streamlit as st
from langchain_community.llms import Ollama
from langchain.prompts import PromptTemplate
from langchain_community.document_loaders import DirectoryLoader, PyMuPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import FAISS
from langchain.output_parsers import StructuredOutputParser, ResponseSchema

# -------- Step 1: Load & Embed Documents --------
@st.cache_resource
def load_vector_store():
    loader = DirectoryLoader("C:\Lanchain\chatbot\documents", glob="*.pdf", loader_cls=PyMuPDFLoader)
    docs = loader.load()
    splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    chunks = splitter.split_documents(docs)
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    db = FAISS.from_documents(chunks, embeddings)
    return db

db = load_vector_store()

# -------- Step 2: Get Relevant Clauses --------
def get_relevant_clauses(query):
    results = db.similarity_search(query, k=3)
    return "\n\n".join([doc.page_content for doc in results])

# -------- Step 3: ₹Amount Extractor --------
def extract_amount_rupee(text):
    match = re.findall(r"₹\s?\d{1,3}(?:,\d{3})*(?:\.\d{2})?", text)
    return match[0] if match else None

# -------- Step 4: Output Format --------
response_schemas = [
    ResponseSchema(name="decision", description="approved or rejected"),
    ResponseSchema(name="amount", description="₹ amount to be paid or null"),
    ResponseSchema(name="justification", description="reason based on policy clause")
]
output_parser = StructuredOutputParser.from_response_schemas(response_schemas)
format_instructions = output_parser.get_format_instructions()

# -------- Step 5: Optimized Prompt --------
prompt_template = PromptTemplate(
    input_variables=["query", "context", "format_instructions"],
    template="""
You are a highly reliable insurance claim assistant.

Given the user query and the provided policy clauses, determine whether the claim is approved or rejected.

⛔ Do not assume anything beyond the context.  
✅ Use only the information given in the context.

Respond in the following JSON format only:
{format_instructions}

Rules:
1. "decision" must be either "approved" or "rejected" — never null.
2. "amount" must be in INR format with ₹ sign (e.g., "₹50000") if an amount is clearly mentioned in the context.
3. If no amount is found in the context, return "amount": null
4. "justification" must clearly explain the reason and quote clause if possible.
5. Do not add anything outside the JSON.

---

User Query:
{query}

Relevant Policy Clauses:
{context}
"""
)

# -------- Step 6: Chain --------
llm = Ollama(model="llama3.2:1b")
chain = prompt_template | llm | output_parser

# -------- Step 7: Streamlit UI --------
st.title("🛡️ Insurance Clause Query System - HackRx")

query = st.text_input("Enter your claim query (e.g. 46M, knee surgery in Pune, 3-month policy):")

if query:
    with st.spinner("Processing..."):
        context = get_relevant_clauses(query)
        extracted_amount = extract_amount_rupee(context)
        response = chain.invoke({
            "query": query,
            "context": context,
            "format_instructions": format_instructions
        })

        # ✅ Inject amount if model misses it
        if not response.get("amount") or response["amount"] in ["null", "NULL", None]:
            response["amount"] = extracted_amount or None

        st.subheader("📄 Structured Decision Output")
        st.json(response)

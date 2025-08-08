from flask import Flask, render_template, request
from langchain_community.llms import Ollama
from langchain.prompts import PromptTemplate
from langchain.output_parsers import StructuredOutputParser, ResponseSchema
from vectorstore_loader import load_vector_store, extract_amount_rupee

app = Flask(__name__)
db = load_vector_store()

def get_relevant_clauses(query):
    results = db.similarity_search(query, k=3)
    return "\n\n".join([doc.page_content for doc in results])

@app.route("/", methods=["GET"])
def index():
    return render_template("claimpolicy.html")

@app.route("/predict", methods=["POST"])
def predict():
    try:
        query = request.form.get("query", "")

        if not query.strip():
            return render_template("claimpolicy.html", result={
                "decision": "rejected",
                "amount": "₹0",
                "justification": "No query provided."
            })

        # Define expected JSON schema
        response_schemas = [
            ResponseSchema(name="decision", description="approved or rejected"),
            ResponseSchema(name="amount", description="₹ amount to be paid or null"),
            ResponseSchema(name="justification", description="reason based on policy clause")
        ]
        output_parser = StructuredOutputParser.from_response_schemas(response_schemas)
        format_instructions = output_parser.get_format_instructions()

        # Prompt Template
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

        llm = Ollama(model="llama3.2:1b")
        chain = prompt_template | llm | output_parser

        context = get_relevant_clauses(query)

        response = chain.invoke({
            "query": query,
            "context": context,
            "format_instructions": format_instructions
        })

        # Fix key capitalization issues like 'Justification'
        response = {k.lower(): v for k, v in response.items()}

        # fallback if amount is null
        if not response.get("amount") or response["amount"] in ["null", "NULL", None]:
            response["amount"] = extract_amount_rupee(context) or "₹Not specified"

        return render_template("claimpolicy.html", result=response)

    except Exception as e:
        return render_template("claimpolicy.html", result={
            "decision": "rejected",
            "amount": "₹0",
            "justification": f"Internal server error: {str(e)}"
        })

if __name__ == "__main__":
    app.run(debug=True)

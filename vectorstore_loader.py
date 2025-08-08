import re
from langchain_community.document_loaders import DirectoryLoader, PyMuPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import FAISS

def load_vector_store():
    loader = DirectoryLoader("documents", glob="*.pdf", loader_cls=PyMuPDFLoader)
    docs = loader.load()
    splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    chunks = splitter.split_documents(docs)
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    db = FAISS.from_documents(chunks, embeddings)
    return db

def extract_amount_rupee(text):
    # Match common formats like ₹5000, ₹ 5,000, Rs. 5,000, INR 50000
    patterns = [
        r'₹\s?[\d,]+(?:\.\d{1,2})?',         # ₹5000 or ₹ 5,000.00
        r'Rs\.?\s?[\d,]+(?:\.\d{1,2})?',     # Rs.5000 or Rs 5,000
        r'INR\s?[\d,]+(?:\.\d{1,2})?'        # INR5000 or INR 5,000
    ]
    
    for pattern in patterns:
        match = re.search(pattern, text)
        if match:
            amt = match.group().strip()
            # Normalize the currency symbol to ₹
            amt = amt.replace("Rs.", "₹").replace("Rs", "₹").replace("INR", "₹").replace(" ", "")
            return amt
    
    return "Not specified"

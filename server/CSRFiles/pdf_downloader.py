import os
import requests
import streamlit as st
from serpapi import GoogleSearch
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get the base directory of the script
base_dir = os.path.dirname(os.path.abspath(__file__))

# Configure the download directory within the base directory
download_dir = os.path.join(base_dir, "downloads")

# Ensure the download directory exists
if not os.path.exists(download_dir):
    os.makedirs(download_dir)

# Dictionary of company names
company_names = {
    1: "Reliance",
    2: "Tata Consultancy Services",
    3: "HDFC Bank Limited",
    4: "ICICI Bank Limited",
    5: "Bharti Airtel Limited"
}

# Dork query
dork = "csr doc filetype:pdf"

# Function to fetch PDF links using SerpApi
def fetch_pdf_links(query):
    search = GoogleSearch({"q": query, "api_key": os.getenv("SERPAPI_API_KEY")})
    results = search.get_dict()
    pdf_links = []

    for result in results.get("organic_results", []):
        link = result.get("link")
        if link and link.endswith(".pdf"):
            pdf_links.append(link)

    return pdf_links

# Function to download PDFs
def download_pdfs(links):
    for link in links:
        response = requests.get(link)
        if response.status_code == 200:
            file_name = os.path.join(download_dir, os.path.basename(link))
            with open(file_name, 'wb') as f:
                f.write(response.content)
            print(f"Downloaded {file_name}")

# Main function to run the Streamlit app
def main():
    st.set_page_config("PDF Downloader")
    st.header("Download PDFs using SerpApi")

    with st.sidebar:
        st.title("Menu:")
        query = st.text_input("Enter search query to find PDF files")
        if st.button("Search PDFs"):
            with st.spinner("Searching..."):
                pdf_links = fetch_pdf_links(f"{query} {dork}")
                download_pdfs(pdf_links)
                st.success("PDFs downloaded")

if __name__ == "__main__":
    main()

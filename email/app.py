from flask import Flask, jsonify, request
import webbrowser
import urllib.parse
import openpyxl
import google.generativeai as genai
import os

from flask_cors import CORS

app = Flask(__name__)
CORS(app)


# Path to your Excel file
EXCEL_FILE_PATH = r'/Users/sakethreddy/harshi/github/Team-54/email/StateWiseReport.xlsx'  # Update with your file path

# Load data from Excel file
wb = openpyxl.load_workbook(EXCEL_FILE_PATH)
sheet = wb.active

# Initialize row index (start after the header row)
current_row = 2

@app.route('/generate_mailto_link', methods=['GET'])
def generate_mailto_link():
    global current_row

    if current_row <= sheet.max_row:
        row = [cell.value for cell in sheet[current_row]]

        state = row[1]
        email = row[-1]  # Assuming email is in the last column
        fy_spent = row[1:-1]  # Financial year expenditure values

        # Find the highest expenditure
        max_expenditure = max(fy_spent)
        max_index = fy_spent.index(max_expenditure)
        max_fy = f"FY {2014 + max_index}-{2015 + max_index}"  # Example: FY 2014-15, FY 2015-16, etc.

        # Construct email subject and body
        GOOGLE_API_KEY = "AIzaSyAROwFJemYjA8LUDVpEEDWHMg7UM-AExgU"
        genai.configure(api_key=GOOGLE_API_KEY)
        model = genai.GenerativeModel('gemini-pro')
        res = model.generate_content(f"Generate Mail content to {state} with expenditure {max_expenditure} spent indexing {max_index} for the year {max_fy} it should be requesting donations for Jeldara Foundation, convincing for working towards drinking water improvement")
        generated = res.text.replace('.', ' *')
        subject = "Help us make a difference. Join hands with Jaldhaara"
        body = generated
        subject_encoded = urllib.parse.quote(subject)
        body_encoded = urllib.parse.quote(body)

        # Construct mailto link for Gmail
        mailto_link = f"https://mail.google.com/mail/?view=cm&fs=1&to={email}&su={subject_encoded}&body={body_encoded}"

        # Move to the next row for the next button press
        current_row += 1

        return jsonify({"mailto_link": mailto_link})
    else:
        return jsonify({"error": "All emails have been sent."}), 400

if __name__ == '__main__':
    app.run(debug=True)

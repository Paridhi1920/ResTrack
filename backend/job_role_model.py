import joblib
import docx
import PyPDF2
import os

# ✅ Load model and vectorizer using absolute path
base_path = os.path.dirname(os.path.abspath(__file__))
model = joblib.load(os.path.join(base_path, 'job_role_model.pkl'))
vectorizer = joblib.load(os.path.join(base_path, 'vectorizer.pkl'))

# ✅ Extract text from PDF or DOCX
def get_resume_text(file_path):
    text = ""
    try:
        if file_path.endswith(".pdf"):
            with open(file_path, "rb") as file:
                reader = PyPDF2.PdfReader(file)
                for page in reader.pages:
                    page_text = page.extract_text()
                    if page_text:
                        text += page_text
        elif file_path.endswith(".docx"):
            doc = docx.Document(file_path)
            for para in doc.paragraphs:
                text += para.text + "\n"
    except Exception as e:
        print("Error reading resume file:", e)
    return text

# ✅ Predict job roles based on extracted text
def predict_job_roles(resume_text):
    try:
        transformed_text = vectorizer.transform([resume_text])
        prediction = model.predict(transformed_text)
        return [prediction[0]]
    except Exception as e:
        print("Error in prediction:", e)
        return ["Could not predict"]

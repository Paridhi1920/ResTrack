# utils.py
import pdfplumber
import docx

def extract_text_from_resume(file):
    if file.filename.endswith('.pdf'):
        text = ''
        with pdfplumber.open(file) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text
        return text
    elif file.filename.endswith('.docx'):
        doc = docx.Document(file)
        return '\n'.join([para.text for para in doc.paragraphs])
    else:
        return ""


# utils.py (append at bottom)
def extract_job_role(text):
    roles = [
        "Data Scientist", "Software Engineer", "Machine Learning Engineer",
        "Data Analyst", "AI Engineer", "Business Analyst", "Web Developer",
        "React Developer", "Cybersecurity Analyst"
    ]
    text_lower = text.lower()
    for role in roles:
        if role.lower() in text_lower:
            return role
    return "Job Role Not Specified"

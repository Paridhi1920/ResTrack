import pdfplumber
import docx

def extract_text_from_resume(file):
    try:
        if file.endswith('.pdf'):
            text = ''
            with pdfplumber.open(file) as pdf:
                for page in pdf.pages:
                    page_text = page.extract_text()
                    if page_text:
                        text += page_text
            return text
        elif file.endswith('.docx'):
            doc = docx.Document(file)
            return '\n'.join([para.text for para in doc.paragraphs])
        else:
            return "Unsupported file format"
    except Exception as e:
        return f"Error: {str(e)}"

def extract_skills(text):
    predefined_skills = [
        "Python", "Data Science", "Machine Learning", "AI", "Deep Learning",
        "Java", "SQL", "Excel", "Tableau", "TensorFlow", "Keras", "R"
    ]
    return [skill for skill in predefined_skills if skill.lower() in text.lower()]

def extract_job_role(text):
    roles = [
        "Data Scientist", "Software Engineer", "Machine Learning Engineer",
        "Data Analyst", "AI Engineer", "Business Analyst"
    ]
    matched_roles = [role for role in roles if role.lower() in text.lower()]
    return ', '.join(matched_roles) if matched_roles else "Job Role Not Specified"

def suggest_jobs(resume_text, predicted_roles=None):
    extracted_skills = extract_skills(resume_text)
    job_roles = []

    job_mapping = {
        'python': 'Python Developer',
        'data science': 'Data Scientist',
        'machine learning': 'Machine Learning Engineer',
        'deep learning': 'Deep Learning Engineer',
        'ai': 'AI Engineer',
        'sql': 'Data Analyst',
        'excel': 'Business Analyst',
        'tableau': 'Data Visualization Specialist',
        'tensorflow': 'ML Engineer',
        'keras': 'Deep Learning Specialist',
        'java': 'Java Developer',
        'r': 'Statistician',
        'blockchain': 'Blockchain Developer',
        'html': 'Frontend Developer',
        'react': 'React Developer',
        'cybersecurity': 'Cybersecurity Analyst'
    }

    for skill in extracted_skills:
        for key in job_mapping:
            if key in skill.lower():
                job_roles.append(job_mapping[key])

    return list(set(job_roles)) or predicted_roles

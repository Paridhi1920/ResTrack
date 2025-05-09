import re
from collections import Counter
import nltk
from nltk.corpus import stopwords

nltk.download('punkt')
nltk.download('stopwords')

POSSIBLE_SKILLS = ["python", "data science", "machine learning", "ai", "deep learning", "java", "sql", "excel", "tableau", "tensorflow", "keras", "r"]
JOB_ROLES = ["data scientist", "software engineer", "machine learning engineer", "data analyst", "ai engineer", "business analyst"]

def extract_skills(resume_text):
    stop_words = set(stopwords.words('english'))
    words = nltk.word_tokenize(resume_text.lower())
    words = [word for word in words if word.isalpha() and word not in stop_words]
    word_freq = Counter(words)

    found_skills = []
    for skill in POSSIBLE_SKILLS:
        if " " in skill:
            if skill in resume_text.lower():
                found_skills.append(skill.title())
        else:
            if skill in word_freq:
                found_skills.append(skill.title())
    return ', '.join(found_skills) if found_skills else "Relevant Skills Not Found"

def extract_job_role(resume_text):
    resume_text = resume_text.lower()
    for role in JOB_ROLES:
        if role in resume_text:
            return role.title()
    return "Job Role Not Specified"

def extract_name(resume_text):
    lines = resume_text.strip().split('\n')
    for line in lines[:5]:
        match = re.match(r"^[A-Z][a-z]+(?: [A-Z]\.)?(?: [A-Z][a-z]+)+$", line.strip())
        if match:
            return match.group(0)
    return "Applicant"

def generate_cover_letter(resume_text):
    name = extract_name(resume_text)
    job_role = extract_job_role(resume_text)
    skills = extract_skills(resume_text)
    return f"Dear Hiring Manager,\n\nI am {name} and I am applying for the {job_role} position. I believe my skills in {skills} make me a suitable candidate.\n\nSincerely,\n{name}"

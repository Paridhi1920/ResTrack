from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

nltk.download('punkt')
nltk.download('stopwords')

def calculate_ats_score(resume_text, job_keywords):
    tokens = word_tokenize(resume_text.lower())
    tokens = [word for word in tokens if word.isalnum() and word not in stopwords.words('english')]
    
    match_count = sum(1 for word in job_keywords if word in tokens)
    score = (match_count / len(job_keywords)) * 100 if job_keywords else 0
    return round(score)

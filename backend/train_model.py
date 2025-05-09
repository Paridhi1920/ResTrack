import joblib
import pandas as pd
import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB

# Sample training data
data = {
    'resume': [
        'Software developer experienced in Java',
        'Data scientist with expertise in Python and ML',
        'Web developer with skills in React.js'
    ],
    'job_role': ['Software Developer', 'Data Scientist', 'Web Developer']
}
df = pd.DataFrame(data)

# Vectorization
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(df['resume'])
y = df['job_role']

# Model Training
model = MultinomialNB()
model.fit(X, y)

# Save Model and Vectorizer using full path
base_dir = os.path.dirname(os.path.abspath(__file__))
joblib.dump(model, os.path.join(base_dir, 'job_role_model.pkl'))
joblib.dump(vectorizer, os.path.join(base_dir, 'vectorizer.pkl'))

print("✅ Model and vectorizer saved successfully.")

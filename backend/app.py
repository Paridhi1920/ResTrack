from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
import zipfile
import tempfile
import shutil
from werkzeug.utils import secure_filename

# Job Seeker Imports
from ats_score import calculate_ats_score as js_calculate_ats_score
from cover_letter import generate_cover_letter
from job_role_model import get_resume_text, predict_job_roles
from job_suggestions import suggest_jobs
from job_keywords_dict import job_keywords_dict

# Recruiter Import
from ats_r import calculate_ats_score as recruiter_ats_score

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

@app.route('/')
def index():
    return jsonify({'message': 'Backend running fine!'})

# ✅ JOB SEEKER ENDPOINT
@app.route('/upload-resume', methods=['POST'])
def upload_resume():
    if 'resume' not in request.files:
        return jsonify({'error': 'No resume file provided'}), 400

    resume = request.files['resume']
    print("Received resume:", resume.filename)

    resume_path = os.path.join("uploads", secure_filename(resume.filename))
    os.makedirs("uploads", exist_ok=True)
    resume.save(resume_path)

    try:
        # Step 1: Extract text
        resume_text = get_resume_text(resume_path)

        # Step 2: Predict job roles
        predicted_roles = predict_job_roles(resume_text)
        print("Predicted Roles:", predicted_roles)

        # Step 3: Get keywords for predicted roles
        combined_keywords = []
        for role in predicted_roles:
            keywords = job_keywords_dict.get(role, [])
            combined_keywords.extend(keywords)
        combined_keywords = list(set(combined_keywords))  # Remove duplicates

        print("Extracted Keywords:", combined_keywords)

        # Step 4: ATS Score
        ats_score = js_calculate_ats_score(resume_text, combined_keywords)

        # Step 5: Cover Letter
        cover_letter = generate_cover_letter(resume_text)

        # Step 6: Job Suggestions
        suggestions = suggest_jobs(resume_text, predicted_roles)

        return jsonify({
            "ATS_Score": ats_score,
            "Cover_Letter": cover_letter,
            "Job_Roles": suggestions
        })

    except Exception as e:
        print("Error:", str(e))
        return jsonify({'error': 'Internal Server Error', 'details': str(e)}), 500

# ✅ RECRUITER ENDPOINT
@app.route('/recruiter', methods=['POST'])
def recruiter():
    jd_text = request.form.get('job_description')
    num_candidates = int(request.form.get('num_candidates', 1))
    uploaded_files = request.files.getlist('resumes')

    if not jd_text or not uploaded_files:
        return jsonify({"error": "Job description or resumes missing"}), 400

    scores = []
    temp_dir = tempfile.mkdtemp()

    try:
        for resume in uploaded_files:
            filename = secure_filename(resume.filename)
            filepath = os.path.join(temp_dir, filename)
            resume.save(filepath)
            score = recruiter_ats_score(jd_text, filepath)
            scores.append((score, filepath))

        # Sort and pick top candidates
        scores.sort(reverse=True, key=lambda x: x[0])
        top_files = [f[1] for f in scores[:num_candidates]]

        # Create zip
        zip_path = os.path.join(temp_dir, 'shortlisted_resumes.zip')
        with zipfile.ZipFile(zip_path, 'w') as zipf:
            for file in top_files:
                zipf.write(file, os.path.basename(file))

        return send_file(zip_path, as_attachment=True, download_name="shortlisted_resumes.zip")

    except Exception as e:
        print("Recruiter error:", str(e))
        return jsonify({"error": "Internal error", "details": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

# AI Job Assistant

## Structure
- `backend/`: Python Flask backend (ATS Score, Cover Letter Generator, Job Role Detection via ML)
- `frontend/`: React.js frontend with Tailwind CSS (Blue & White theme)

## How to Run

### Backend
```bash
cd backend
pip install flask flask-cors PyPDF2 joblib scikit-learn pandas
python app.py
```

### Frontend
```bash
cd frontend
npm install
npm start
```
from flask import Flask, render_template, request, jsonify
import spacy
import os
import re
from models.spam_classifier import comprehensive_spam_classifier, detect_high_risk_content

app = Flask(__name__)

# Load spaCy model
try:
    nlp = spacy.load("en_core_web_sm")
except:
    os.system("python -m spacy download en_core_web_sm")
    nlp = spacy.load("en_core_web_sm")

def preprocess_text(text):
    """Process text for spam detection"""
    doc = nlp(text.lower())
    processed_text = " ".join(token.lemma_ for token in doc if not token.is_stop)
    return processed_text

# Custom Jinja2 filter to check if a value is a number
@app.template_filter('is_number')
def is_number(value):
    return isinstance(value, (int, float))

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/analyze', methods=['POST'])
def api_analyze():
    """API endpoint for programmatic access"""
    if request.is_json:
        data = request.get_json()
        message = data.get('message', '')
        is_email = data.get('is_email', False)
        is_call = data.get('is_call', False)
        is_academic = data.get('is_academic', False)
        call_metadata = data.get('call_metadata', None)
        
        classification, score, details = comprehensive_spam_classifier(
            message, is_email, is_call, call_metadata, is_academic
        )
        
        # Check for high-risk content
        is_high_risk, risk_reasons = detect_high_risk_content(message)
        
        # Add high-risk info to response
        result = {
            'classification': classification,
            'score': score,
            'details': details,
            'is_high_risk': is_high_risk,
            'risk_reasons': risk_reasons
        }
        
        return jsonify(result)
    return jsonify({'error': 'Invalid request format'}), 400

@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        try:
            message = request.form['message']
            is_email = request.form.get('is_email') == 'true'
            is_call = request.form.get('is_call') == 'true'
            is_academic = request.form.get('is_academic') == 'true'

            # Prepare call metadata if it's a call
            call_metadata = None
            if is_call:
                caller_id = request.form.get('caller_id', '')
                duration = request.form.get('duration', 0)
                frequency = request.form.get('frequency', 0)
                call_metadata = {
                    'caller_id': caller_id,
                    'duration': int(duration) if duration.isdigit() else 0,
                    'frequency': int(frequency) if frequency.isdigit() else 0
                }

            # Process text with spaCy if needed
            processed_text = preprocess_text(message)
            
            # Use the comprehensive spam classifier
            classification, score, details = comprehensive_spam_classifier(
                message,
                is_email=is_email,
                is_call=is_call,
                call_metadata=call_metadata,
                is_academic=is_academic
            )

            # Check for high-risk content
            is_high_risk, risk_reasons = detect_high_risk_content(message)

            # Generate advice based on classification
            advice = {
                'spam': "Avoid responding or clicking links. Delete this message.",
                'phishing': "Do NOT click any links or provide information. Report immediately.",
                'suspicious': "Exercise caution. Verify sender independently before acting.",
                'legitimate': "Appears safe, but always verify unexpected messages.",
                'robocall': "This is likely an automated call. Do not answer or call back.",
                'telemarketing': "This may be a sales call. Consider blocking the number."
            }.get(classification, "Use caution and verify independently.")
            
            if is_high_risk:
                advice = "HIGH RISK DETECTED! " + advice + " " + ", ".join(risk_reasons)

            # Format result for template with safeguards
            component_scores = details.get('component_scores', {})
            matches = details.get('matches', {})
            
            formatted_result = {
                'message': message,
                'is_spam': classification in ['spam', 'phishing', 'robocall', 'telemarketing'],
                'is_high_risk': is_high_risk,
                'confidence': round(score * 100, 1),
                'prediction': classification.capitalize() if classification else 'Unknown',
                'details': {
                    'keyword_score': round(component_scores.get('keyword_score', 0.0) * 100, 1),
                    'pattern_score': round(component_scores.get('pattern_score', 0.0) * 100, 1),
                    'word_score': round(component_scores.get('word_score', 0.0) * 100, 1),
                    'url_score': round(component_scores.get('url_score', 0.0) * 100, 1),
                    'format_score': round(component_scores.get('format_score', 0.0) * 100, 1),
                    'email_metadata_score': round(details.get('email_metadata_score', 0.0) * 100, 1),
                    'call_metadata_score': round(details.get('call_metadata_score', 0.0) * 100, 1),
                    'keyword_hits': matches.get('spam_keywords', {}),
                    'pattern_hits': matches.get('spam_patterns', 0),
                    'phishing_hits': matches.get('phishing_patterns', 0),
                    'call_patterns': matches.get('call_patterns', 0),
                    'matched_spam_keywords': matches.get('matched_spam_keywords', {}),
                    'matched_spam_patterns': matches.get('matched_spam_patterns', []),
                    'matched_phishing_patterns': matches.get('matched_phishing_patterns', []),
                    'matched_call_patterns': matches.get('matched_call_patterns', []),
                    'matched_call_keywords': matches.get('matched_call_keywords', {}),
                    'risk_reasons': risk_reasons if is_high_risk else []
                },
                'advice': advice
            }

            # Debug output to terminal
            print("Debug: Formatted Result:", formatted_result)

            return render_template('result.html', result=formatted_result)

        except Exception as e:
            error_message = f"An error occurred: {str(e)}"
            print(error_message)
            return render_template('error.html', error=error_message)

@app.route('/batch_analyze', methods=['GET', 'POST'])
def batch_analyze():
    if request.method == 'GET':
        return render_template('batch.html')
    else:
        try:
            file = request.files.get('file')
            if not file:
                return render_template('error.html', error="No file uploaded")
            
            content = file.read().decode('utf-8').splitlines()
            results = []
            
            for line in content:
                line = line.strip()
                if line:
                    # Default to text analysis
                    classification, score, _ = comprehensive_spam_classifier(line)
                    is_high_risk, risk_reasons = detect_high_risk_content(line)
                    
                    results.append({
                        'text': line[:100] + '...' if len(line) > 100 else line,
                        'classification': classification,
                        'score': round(score * 100, 1),
                        'is_high_risk': is_high_risk,
                        'risk_reasons': risk_reasons
                    })
            
            return render_template('batch_results.html', results=results)
        except Exception as e:
            error_message = f"An error occurred during batch processing: {str(e)}"
            return render_template('error.html', error=error_message)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
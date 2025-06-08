import string
import re
from collections import Counter
import html
from urllib.parse import urlparse
import email.parser
import base64
from datetime import datetime, timedelta

def comprehensive_spam_classifier(text, is_email=False, is_call=False, call_metadata=None, is_academic=False):
    """
    A comprehensive spam, phishing, and call classifier with enhanced detection capabilities
    
    Args:
        text (str): The text, email content, or call transcript to analyze
        is_email (bool): Flag indicating if the input is a complete email (with headers)
        is_call (bool): Flag indicating if the input is a mobile call (with metadata)
        call_metadata (dict): Optional dict with call details (e.g., {'caller_id': '+1234567890', 'duration': 15, 'frequency': 3})
        is_academic (bool): Flag to indicate if context is academic
    
    Returns:
        tuple: (classification, score, details)
            - classification: "spam", "phishing", "suspicious", "robocall", "telemarketing", or "legitimate"
            - score: Spam score between 0 and 1
            - details: Dictionary with detailed component scores and matches
    """
    email_headers = {}
    email_metadata_score = 0
    call_metadata_score = 0
    
    if is_email:
        try:
            parser = email.parser.Parser()
            email_message = parser.parsestr(text)
            
            for key in email_message.keys():
                email_headers[key.lower()] = email_message[key]
            
            if email_message.is_multipart():
                text_parts = []
                for part in email_message.walk():
                    content_type = part.get_content_type()
                    if content_type in ["text/plain", "text/html"]:
                        payload = part.get_payload(decode=True)
                        if payload:
                            try:
                                decoded_text = payload.decode('utf-8', errors='ignore')
                                text_parts.append(decoded_text)
                            except:
                                pass
                text = "\n".join(text_parts)
            else:
                payload = email_message.get_payload(decode=True)
                if payload:
                    text = payload.decode('utf-8', errors='ignore')
            
            email_metadata_score = analyze_email_headers(email_headers, is_academic)
        except Exception:
            email_metadata_score = 0.1  # Slight suspicion for malformed email
    
    if is_call and call_metadata:
        call_metadata_score = analyze_call_metadata(call_metadata)
        if not text.strip():
            text = "Automated call detected"  # Default if no transcript

    original_text = text
    
    if re.search(r'<html|<body|<div|<span|<table|<a\s+href', text, re.IGNORECASE):
        text = clean_html_content(text)
    
    normalized_text = text.lower()
    
    # Spam keywords
    spam_keywords = {
        'financial': ['free', 'win', 'winner', 'won', 'cash', 'prize', 'claim', 'gift card', 'gift',
                      'loan', 'credit', 'rich', 'opportunity', 'discount', 'sale', 'off', '$', '€', '£',
                      'money', 'dollar', 'prize', 'reward', 'casino', 'bonus', 'investments', 'forex',
                      'bitcoin', 'investment', 'earn', 'income', 'make money', 'fast cash', 'debt',
                      'credit score', 'insurance', 'mortgage', 'refinance', 'rates', 'funds', 'banking',
                      'bank account', 'transaction', 'transfer', 'wire', 'deposit', 'atm', 'cashback',
                      'lottery', 'jackpot', 'payout', 'wealthy', 'millionaire', 'financial freedom',
                      'collection', 'stocks', 'investor', 'market', 'profit', 'dividend', 'crypto',
                      'cryptocurrency', 'blockchain', 'trading', 'trade', 'invest', 'fortune'],
        'urgency': ['call now', 'limited time', 'offer', 'urgent', 'act now', 'limited', 'exclusive',
                    'today only', 'guaranteed', 'incredible', 'once in a lifetime', 'hurry',
                    'expires', 'deadline', 'now', 'immediately', 'instant', 'instantly', 'quickly',
                    'fast', 'rapid', 'rush', 'time sensitive', 'don\'t wait', 'don\'t delay',
                    'before it\'s too late', 'running out', 'while supplies last', 'final notice',
                    'last chance', 'closing soon', 'only few left', 'never again', 'one time',
                    'don\'t miss', 'today', 'act fast', 'time is running out'],
        'authority': ['verify', 'verification', 'confirm', 'confirmation', 'validate', 'validation',
                      'authenticate', 'authentication', 'secure', 'security', 'important', 'alert',
                      'notification', 'required', 'action required', 'update', 'upgrade', 'maintain',
                      'protect', 'warning', 'caution', 'attention', 'critical', 'official', 'authorized',
                      'certified', 'verified', 'approved', 'endorsed', 'recommended', 'compliance',
                      'policy', 'terms', 'agreement', 'legal', 'law', 'regulation', 'requirement'],
        'health': ['viagra', 'pills', 'weight loss', 'diet', 'lose weight', 'fat', 'slim',
                   'medication', 'pharmacy', 'prescription', 'drug', 'cure', 'treatment', 'remedy',
                   'health', 'healthcare', 'medical', 'doctor', 'clinic', 'hospital', 'therapy',
                   'supplement', 'vitamin', 'herbal', 'natural', 'organic', 'wellness', 'fitness',
                   'exercise', 'workout', 'muscle', 'strength', 'performance', 'enhancement',
                   'enlargement', 'hair loss', 'anti-aging', 'rejuvenation', 'energy', 'stamina'],
        'retail': ['amazon', 'walmart', 'target', 'best buy', 'shop', 'shopping', 'purchase',
                   'buy', 'order', 'product', 'merchandise', 'item', 'goods', 'delivery', 'shipping',
                   'tracking', 'shipment', 'package', 'delivered', 'warehouse', 'inventory', 'stock',
                   'customer', 'consumer', 'client', 'satisfaction', 'service', 'support', 'help',
                   'assistance', 'representative', 'agent', 'department', 'store', 'mall', 'outlet',
                   'clearance', 'closeout', 'wholesale', 'retail', 'dealer', 'vendor', 'supplier'],
        'personal': ['dating', 'singles', 'hot', 'sexy', 'adult', 'mature', 'romance', 'relationship',
                     'match', 'partner', 'mate', 'companion', 'friend', 'dating', 'marry', 'marriage',
                     'bachelor', 'bachelorette', 'bride', 'groom', 'wedding', 'engagement', 'divorce',
                     'separated', 'lonely', 'alone', 'single', 'meet', 'hookup', 'date', 'sex', 'sexual'],
        'marketing': ['miracle', 'secret', 'reveal', 'discovery', 'breakthrough', 'revolutionary',
                      'innovative', 'advanced', 'cutting-edge', 'state-of-the-art', 'next-generation',
                      'groundbreaking', 'pioneering', 'industry-leading', 'world-class', 'premium',
                      'elite', 'luxury', 'high-end', 'superior', 'quality', 'excellence', 'exceptional',
                      'outstanding', 'remarkable', 'incredible', 'unbelievable', 'amazing', 'astonishing',
                      'surprising', 'shocking', 'stunning', 'dramatic', 'extraordinary', 'tremendous'],
        'account': ['account', 'password', 'username', 'login', 'sign-in', 'access', 'credentials',
                    'authentication', 'token', 'session', 'expired', 'terminated', 'suspended',
                    'locked', 'blocked', 'restricted', 'limitation', 'exceeded', 'quota', 'usage',
                    'storage', 'space', 'capacity', 'bandwidth', 'data', 'information', 'profile',
                    'personal', 'identity', 'id', 'identification', 'verify identity', 'confirm identity'],
        'action': ['click', 'tap', 'press', 'select', 'choose', 'pick', 'opt', 'subscribe', 'unsubscribe',
                   'register', 'sign up', 'enroll', 'join', 'participate', 'engage', 'interact',
                   'follow', 'share', 'like', 'comment', 'post', 'upload', 'download', 'install',
                   'activate', 'enable', 'disable', 'deactivate', 'remove', 'delete', 'erase',
                   'cancel', 'stop', 'cease', 'halt', 'terminate', 'end', 'begin', 'start', 'resume'],
        'tech': ['software', 'hardware', 'device', 'computer', 'laptop', 'desktop', 'tablet',
                 'smartphone', 'mobile', 'app', 'application', 'program', 'system', 'network',
                 'server', 'cloud', 'database', 'storage', 'backup', 'restore', 'recovery',
                 'update', 'upgrade', 'patch', 'fix', 'repair', 'maintenance', 'support',
                 'technical', 'it', 'information technology', 'cyber', 'digital', 'electronic',
                 'online', 'web', 'internet', 'website', 'webpage', 'portal', 'platform'],
        'institutions': ['bank of america', 'chase', 'wells fargo', 'citibank', 'capital one',
                         'paypal', 'visa', 'mastercard', 'american express', 'discover',
                         'td bank', 'hsbc', 'barclays', 'santander', 'pnc', 'bank', 'credit union',
                         'financial institution', 'treasury', 'federal', 'irs', 'tax', 'revenue',
                         'social security', 'medicare', 'medicaid', 'insurance', 'healthcare'],
        'sms_spam': ['msg', 'txt', 'text', 'reply', 'stop', 'opt out', 'opt-out', 'sms',
                     'valued customer', 'mobile', 'phone', 'ringtone', 'alert', 'reminder',
                     'service msg', 'service message', 'shortcode', 'short code', 'send',
                     'message', 'texting', 'std rates', 'standard rates', 'apply', 'charges may apply',
                     'data rates', 'msg&data rates', 'subscription', 'per month', 'per wk', 'per week',
                     'per msg', 'per message', 'auto renewal', 'autorenewal', 'recurring']
    }
    
    # Call-specific keywords
    call_keywords = {
        'robocall': ['automated', 'robot', 'press', '1 to speak', 'record', 'message', 'notification', 'irs', 'tax', 'government'],
        'telemarketing': ['promotion', 'deal', 'offer', 'subscribe', 'free trial', 'discount', 'save', 'vacation', 'insurance']
    }
    
    academic_terms = [
        'university', 'college', 'professor', 'faculty', 'student', 'dean', 'chancellor',
        'department', 'course', 'class', 'lecture', 'seminar', 'workshop', 'conference',
        'syllabus', 'curriculum', 'academic', 'scholarship', 'fellowship', 'grant',
        'research', 'study', 'lab', 'laboratory', 'thesis', 'dissertation', 'paper',
        'journal', 'publication', 'publish', 'author', 'review', 'peer-review',
        'assignment', 'homework', 'project', 'exam', 'test', 'quiz', 'grading', 'grade',
        'deadline', 'submission', 'present', 'presentation', 'abstract', 'proposal',
        'defense', 'committee', 'advisor', 'mentor', 'colleague', 'collaborate',
        'collaboration', 'survey', 'data', 'analysis', 'methodology', 'results',
        'discussion', 'conclusion', 'references', 'bibliography', 'citation',
        'admission', 'application', 'enrollment', 'registrar', 'financial aid', 'bursar',
        'transcript', 'credit', 'semester', 'quarter', 'term', 'program', 'major', 'minor',
        'degree', 'bachelor', 'master', 'doctoral', 'phd', 'certificate', 'alumni',
        'graduation', 'commencement', 'orientation', 'accreditation', 'board of trustees',
        '.edu', 'institute', 'school'
    ]
    
    all_spam_keywords = [kw for category in spam_keywords.values() for kw in category]
    all_call_keywords = [kw for category in call_keywords.values() for kw in category]
    
    spam_patterns = [
        r'\d+%\s*off', r'[$€£]\d+', r'\$\d+', r'\d+\s*dollars',
        r'https?://\S+', r'\[link\]', r'\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b',
        r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b',
        r'congratulations.*won', r'gift\s*card', r'click\s*here', r'claim.*now',
        r'limited\s*time', r'act\s*now', r'once\s*in\s*a\s*lifetime', r'don\'?t\s*miss',
        r'attention', r'urgent\s*(notice|action|alert)', r'security\s*(alert|notice|warning)',
        r'account\s*(verify|verify|confirm|validate|update)', r'password\s*(expired|reset|update)',
        r'unusual\s*(activity|login|sign-in)', r'suspicious\s*(activity|transaction|login)',
        r'you\'?ve?\s*(been\s*selected|won)', r'you\s*are\s*(selected|chosen|picked)',
        r'\bjust\s*\d+\s*(easy\s*)?payments\b', r'\b(no\s*obligation|no\s*risk)\b',
        r'\b(satisfaction\s*guaranteed)\b', r'(verify|confirm|update).*account.*information',
        r'(verify|confirm|update).*bank.*information', r'(verify|confirm|update).*payment.*information',
        r'(verify|confirm|update).*personal.*information', r'(verify|confirm|update).*credit.*card',
        r'(verify|confirm|update).*billing.*information', r'bank.*account.*suspended',
        r'account.*hold', r'account.*locked', r'account.*limited', r'unusual.*activity',
        r'suspicious.*activity', r'action\s*required', r'immediate\s*action', r'attention\s*required',
        r'response\s*required', r'avoid.*cancellation', r'prevent.*termination', r'avoid.*suspension',
        r'before.*terminated', r'will\s*be\s*(closed|suspended|terminated|cancelled)',
        r'click\s*(below|here|following)\s*(link|button)', r'follow\s*(this|the)\s*link',
        r'legal\s*(action|consequences|implications)', r'court\s*(order|action|decision)',
        r'lawsuit', r'v[i1]agr[a@]', r'ph[a@]rm[a@]cy', r'm[e3]d[i1]c[a@]t[i1][o0]n',
        r'p[i1]ll[s5]', r'STOP\s+to\s+opt\s+out', r'Text\s+STOP\s+to', r'Msg(\&Data)?\s+rates\s+may\s+apply',
        r'Txt\s+\w+\s+to\s+\d{5,}', r'Txt\s+\w+\s+for\s+info', r'\d+/msg', r'\d+/month',
        r'\d+/week', r'Subscription\s*service', r'Free\s*msg', r'Reply\s+Y\s+to', r'Reply\s+with\s+YES',
        r'Reply\s+to\s+subscribe', r'Reminder:', r'Alert:', r'Service\s*MSG:'
    ]
    
    phishing_patterns = [
        r'(bank|financial|credit union).*?(verify|confirm|validate).*?(account|information)',
        r'(update|verify|confirm).*?(personal|account|payment|billing).*?(details|information|data)',
        r'account.*?(suspension|hold|locked|limited|restricted|blocked)',
        r'unusual.*?(activity|login|sign-in|transaction|purchase)',
        r'suspicious.*?(activity|login|sign-in|transaction|purchase)',
        r'security.*?(breach|compromise|concern|issue|alert|warning)',
        r'(click|follow|visit).*?(link|website|url|page).*?(verify|confirm|validate|update)',
        r'(verify|confirm|validate|update).*?(now|immediately|right away|asap|urgent)',
        r'(avoid|prevent).*?(suspension|cancellation|termination|closure|limitation)',
        r'(enter|provide|submit|input).*?(username|password|login|credentials)',
        r'(update|change|reset).*?(password|pin|security questions|security answers)',
        r'(verify|confirm|update).*?(social security|ssn|tax id|passport|driver\'?s license)',
        r'(confirm|verify).*?(identity|identification)',
        r'(action|attention|response).*?(required|needed|necessary|mandatory)',
        r'limited time.*?(offer|opportunity|access)',
        r'(expires|deadline).*?(today|soon|in \d+ hours)',
        r'your.*?(account|subscription|membership|service).*?(will|has been|been).*?(terminate|suspend|cancel)',
        r'<a [^>]*?href\s*=\s*["\']?(?!https?://(www\.)?(bankofamerica|paypal|amazon)\.com)[^"\']*["\']?[^>]*>.*?bank.*?</a>',
        r'<a [^>]*?href\s*=\s*["\']?(?!https?://(www\.)?(bankofamerica|paypal|amazon)\.com)[^"\']*["\']?[^>]*>.*?paypal.*?</a>',
        r'<a [^>]*?href\s*=\s*["\']?(?!https?://(www\.)?(bankofamerica|paypal|amazon)\.com)[^"\']*["\']?[^>]*>.*?amazon.*?</a>',
        r'(verify|confirm).*?(phone|mobile|device|number)',
        r'(send|reply with).*?(personal|private|sensitive).*?(information|details|data)',
        r'(click|tap|follow).*?(to claim|to verify|to confirm)',
        r'(suspicious|unusual).*?(activity|login|attempt|transaction).*?(detected|identified|found)',
        r'(account|service|subscription).*?(suspended|on hold|locked|blocked)',
        r'(reply|respond).*?(with|using).*?(code|pin|password)'
    ]
    
    call_patterns = [
        r'press\s+\d+\s+to\s+(speak|continue|opt out)',
        r'(offer|deal|discount).*?(expires|limited)',
        r'call\s+back\s+now',
        r'warranty.*extended',
        r'(IRS|tax|government).*case.*against you',
        r'your car.*warranty',
        r'student loan.*forgiveness',
        r'reduce your debt',
        r'your business.*listing',
        r'Google.*listing'
    ]
    
    spam_stop_words = {
        'you': 0.2, 'your': 0.2, 'free': 0.8, 'now': 0.6, 'today': 0.5, 'limited': 0.7, 'only': 0.4,
        'get': 0.4, 'click': 0.8, 'here': 0.6, 'best': 0.4, 'new': 0.3, 'amazing': 0.6, 'incredible': 0.6,
        'exclusive': 0.6, 'guaranteed': 0.7, 'instantly': 0.5, 'easily': 0.4, 'quickly': 0.4, 'urgent': 0.9,
        'important': 0.5, 'attention': 0.6, 'critical': 0.7, 'immediately': 0.7, 'instant': 0.5, 'selected': 0.8,
        'congratulations': 0.9, 'won': 0.9, 'winner': 0.9, 'prize': 0.8, 'success': 0.4, 'rich': 0.7,
        'wealth': 0.7, 'millionaire': 0.8, 'risk': 0.5, 'buy': 0.4, 'order': 0.4, 'discount': 0.6,
        'save': 0.5, 'money': 0.6, 'cash': 0.7, 'payment': 0.4, 'credit': 0.4, 'loan': 0.6, 'debt': 0.6,
        'guarantee': 0.6, 'refund': 0.4, 'satisfaction': 0.4, 'secret': 0.7, 'trick': 0.7, 'hack': 0.7,
        'cheat': 0.8, 'offer': 0.5, 'special': 0.4, 'deal': 0.5, 'opportunity': 0.6, 'account': 0.4,
        'password': 0.6, 'security': 0.4, 'login': 0.5, 'access': 0.4, 'verify': 0.6, 'confirm': 0.6,
        'update': 0.4, 'link': 0.7, 'visit': 0.5, 'download': 0.6, 'suspended': 0.8,
        'locked': 0.8, 'limited': 0.7, 'restricted': 0.8, 'hold': 0.7, 'terminate': 0.8, 'cancel': 0.6,
        'lose': 0.6, 'expired': 0.7, 'bank': 0.2, 'paypal': 0.2, 'amazon': 0.2, 'ebay': 0.2, 'apple': 0.2,
        'microsoft': 0.2, 'google': 0.2, 'revolutionary': 0.6, 'breakthrough': 0.6, 'ultimate': 0.5,
        'extraordinary': 0.5, 'miraculous': 0.7, 'genuine': 0.4, 'authentic': 0.4
    }
    
    # Calculate scores for text content
    spam_keyword_counts = {}
    matched_spam_keywords = {}  # Dictionary to store matched keywords per category
    for category, keywords in spam_keywords.items():
        matches = [kw for kw in keywords if re.search(r'\b' + re.escape(kw) + r'\b', normalized_text, re.IGNORECASE)]
        spam_keyword_counts[category] = len(matches)
        matched_spam_keywords[category] = matches if matches else []

    call_keyword_counts = {}
    matched_call_keywords = {}
    if is_call:
        for category, keywords in call_keywords.items():
            matches = [kw for kw in keywords if re.search(r'\b' + re.escape(kw) + r'\b', normalized_text, re.IGNORECASE)]
            call_keyword_counts[category] = len(matches)
            matched_call_keywords[category] = matches if matches else []

    # Count pattern matches and store matched patterns
    matched_spam_patterns = [pattern for pattern in spam_patterns if re.search(pattern, text, re.IGNORECASE)]
    spam_pattern_matches = len(matched_spam_patterns)
    
    matched_phishing_patterns = [pattern for pattern in phishing_patterns if re.search(pattern, text, re.IGNORECASE)]
    phishing_pattern_matches = len(matched_phishing_patterns)
    
    matched_call_patterns = []
    call_pattern_matches = 0
    if is_call:
        matched_call_patterns = [pattern for pattern in call_patterns if re.search(pattern, text, re.IGNORECASE)]
        call_pattern_matches = len(matched_call_patterns)
    
    # Calculate word-level spam score (increased weight for text)
    words = re.findall(r'\b\w+\b', normalized_text.lower())
    spam_word_score = sum(spam_stop_words.get(word, 0) for word in words) / max(len(words), 1) * 1.2  # Increased by 20%
    
    # Check for academic context mitigation
    academic_context_score = 0
    if is_academic:
        academic_term_count = sum(1 for term in academic_terms if re.search(r'\b' + re.escape(term) + r'\b', normalized_text, re.IGNORECASE))
        academic_context_score = min(academic_term_count / 10.0, 0.8)  # Cap at 0.8 reduction
    
    # Check for URLs and analyze them
    urls = re.findall(r'https?://\S+', text)
    url_score = analyze_urls(urls) if urls else 0.0
    
    # Check email formatting and capitalization excess
    format_score = analyze_text_formatting(original_text)
    
    # Calculate component scores
    keyword_score = sum(spam_keyword_counts.values()) / max(50, len(text.split()) / 2)
    keyword_score = min(keyword_score, 0.9)  # Cap at 0.9
    
    pattern_score = (spam_pattern_matches * 0.15) + (phishing_pattern_matches * 0.20)  # Increased weights
    pattern_score = min(pattern_score, 0.9)  # Cap at 0.9
    
    # Final score calculation with component weighting
    base_score = (
        keyword_score * 0.35 +
        pattern_score * 0.30 +  # Increased from 0.25
        spam_word_score * 0.20 +  # Increased from 0.15
        url_score * 0.10 +
        format_score * 0.05
    )
    
    # Add in email or call specific scores
    if is_email:
        final_score = (base_score * 0.7) + (email_metadata_score * 0.3)
    elif is_call:
        call_spam_score = (
            sum(call_keyword_counts.values()) / 5.0 * 0.6 +
            call_pattern_matches / 2.0 * 0.4
        )
        call_spam_score = min(call_spam_score, 0.9)
        final_score = (base_score * 0.4) + (call_spam_score * 0.4) + (call_metadata_score * 0.2)
    else:
        final_score = base_score * 1.1  # Slight boost for text-only spam detection
    
    # Apply academic context mitigation
    if is_academic:
        final_score = max(0, final_score - academic_context_score)
    
    # Ensure score is bounded between 0 and 1
    final_score = max(0, min(final_score, 1.0))
    
    # Determine classification
    classification = "legitimate"
    classification_thresholds = {
        "spam": 0.60,  # Lowered from 0.65
        "phishing": 0.75,
        "suspicious": 0.45,
        "robocall": 0.60,
        "telemarketing": 0.60
    }
    
    if is_call:
        if final_score >= classification_thresholds["robocall"] and call_keyword_counts.get('robocall', 0) >= 1:
            classification = "robocall"
        elif final_score >= classification_thresholds["telemarketing"] and call_keyword_counts.get('telemarketing', 0) >= 1:
            classification = "telemarketing"
        elif final_score >= classification_thresholds["suspicious"]:
            classification = "suspicious"
    else:
        if phishing_pattern_matches >= 3 and final_score >= classification_thresholds["phishing"]:
            classification = "phishing"
        elif final_score >= classification_thresholds["spam"]:
            classification = "spam"
        elif final_score >= classification_thresholds["suspicious"]:
            classification = "suspicious"
    
    # Prepare detailed results with all lists
    details = {
        "component_scores": {
            "keyword_score": keyword_score,
            "pattern_score": pattern_score,
            "word_score": spam_word_score,
            "url_score": url_score,
            "format_score": format_score
        },
        "matches": {
            "spam_keywords": {category: count for category, count in spam_keyword_counts.items() if count > 0},
            "matched_spam_keywords": {category: keywords for category, keywords in matched_spam_keywords.items() if keywords},
            "spam_patterns": spam_pattern_matches,
            "matched_spam_patterns": matched_spam_patterns,
            "phishing_patterns": phishing_pattern_matches,
            "matched_phishing_patterns": matched_phishing_patterns,
            "call_patterns": call_pattern_matches,
            "matched_call_patterns": matched_call_patterns,
            "call_keywords": {category: count for category, count in call_keyword_counts.items() if count > 0} if is_call else {},
            "matched_call_keywords": {category: keywords for category, keywords in matched_call_keywords.items() if keywords} if is_call else {}
        }
    }
    
    if is_email:
        details["email_metadata_score"] = email_metadata_score
    
    if is_call:
        details["call_metadata_score"] = call_metadata_score
    
    if is_academic:
        details["academic_mitigation"] = academic_context_score
    
    # Debug output to verify data structure
    print("Debug: Classifier Output - classification:", classification, "score:", final_score, "details:", details)
    
    return classification, final_score, details

def clean_html_content(html_text):
    """
    Extract readable text from HTML content and detect suspicious HTML structures
    
    Args:
        html_text (str): HTML content to clean
    
    Returns:
        str: Cleaned text content
    """
    # Decode HTML entities
    text = html.unescape(html_text)
    
    # Extract text from links for analysis
    links = re.findall(r'<a\s+[^>]*?href\s*=\s*["\']([^"\']*)["\'][^>]*>(.*?)</a>', text, re.IGNORECASE|re.DOTALL)
    link_texts = [f"{link_text} ({href})" for href, link_text in links]
    
    # Remove HTML tags
    text = re.sub(r'<style[^>]*>.*?</style>', ' ', text, flags=re.DOTALL|re.IGNORECASE)
    text = re.sub(r'<script[^>]*>.*?</script>', ' ', text, flags=re.DOTALL|re.IGNORECASE)
    text = re.sub(r'<[^>]*>', ' ', text)
    
    # Normalize whitespace
    text = re.sub(r'\s+', ' ', text).strip()
    
    # Add back extracted link texts for analysis
    if link_texts:
        text += " " + " ".join(link_texts)
    
    return text

def analyze_urls(urls):
    """
    Analyze URLs for suspicious patterns
    
    Args:
        urls (list): List of URLs to analyze
    
    Returns:
        float: Suspiciousness score between 0 and 1
    """
    if not urls:
        return 0.0
    
    suspicious_score = 0.0
    url_count = len(urls)
    
    for url in urls:
        # Check for URL shorteners
        if re.search(r'bit\.ly|tinyurl\.com|goo\.gl|t\.co|is\.gd|cli\.gs|ow\.ly|tr\.im|tiny\.cc|url\.ie', url, re.IGNORECASE):
            suspicious_score += 0.8  # Increased from 0.7
            continue
        
        try:
            parsed = urlparse(url)
            domain = parsed.netloc.lower()
            path = parsed.path.lower()
            
            # Check for suspicious domains
            if re.search(r'\.(tk|ml|ga|cf|gq|xyz|top|win|bid|stream|club|pw|loan|webcam|science|review|date)$', domain):
                suspicious_score += 0.7  # Increased from 0.6
                
            # Check for numeric or random-looking domains
            if re.search(r'^[0-9.-]+$', domain) or re.search(r'^[a-z0-9]{10,}\.', domain):
                suspicious_score += 0.9  # Increased from 0.8
                
            # Check for brand impersonation
            if re.search(r'(paypal|apple|microsoft|amazon|google|facebook|instagram|twitter|bank|ebay|chase|amex|visa|secure)\W', domain) and not domain.endswith(('.com', '.net', '.org')):
                suspicious_score += 1.0  # Increased from 0.9
                
            # Check for suspicious URL paths
            if re.search(r'(login|verify|confirm|secure|account|banking|payment|credit|update|user|signin|authenticate)', path):
                suspicious_score += 0.5  # Increased from 0.4
                
            # Check for excessive subdomains
            if domain.count('.') > 3:
                suspicious_score += 0.6  # Increased from 0.5
                
            # Check for IP address in domain
            if re.search(r'^(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})', domain):
                suspicious_score += 0.9  # Increased from 0.8
                
            # Check for suspicious query parameters
            query = parsed.query.lower()
            if re.search(r'(password|username|login|ssn|account|card|credit|routing|email|bank|auth|token)', query):
                suspicious_score += 0.8  # Increased from 0.7
                
        except Exception:
            suspicious_score += 0.4  # Increased from 0.3
    
    # Normalize score
    score = min(suspicious_score / url_count, 1.0)
    return score

def analyze_text_formatting(text):
    """
    Analyze text formatting for signs of spam
    
    Args:
        text (str): Text to analyze
    
    Returns:
        float: Formatting suspiciousness score between 0 and 1
    """
    score = 0.0
    
    # Check for excessive capitalization
    if len(text) > 20:
        uppercase_ratio = sum(1 for c in text if c.isupper()) / len(text)
        if uppercase_ratio > 0.3:
            score += min(uppercase_ratio * 1.2, 0.8)  # Increased weight
    
    # Check for excessive punctuation
    punct_count = sum(1 for c in text if c in string.punctuation)
    punct_ratio = punct_count / max(len(text), 1)
    if punct_ratio > 0.1:
        score += min(punct_ratio * 4, 0.7)  # Increased weight
    
    # Check for repeated exclamation or question marks
    if re.search(r'[!]{2,}', text):
        score += 0.5  # Increased from 0.4
    if re.search(r'[?]{2,}', text):
        score += 0.4  # Increased from 0.3
    
    # Check for repeated words (e.g., "free free free")
    words = re.findall(r'\b\w+\b', text.lower())
    word_counts = Counter(words)
    repeated_words = [word for word, count in word_counts.items() if count > 2 and len(word) > 3]
    if repeated_words:
        score += min(0.2 * len(repeated_words), 0.6)  # Increased weight
    
    # Check for dollar signs followed by numbers
    if re.search(r'\$\d+', text):
        score += 0.4  # Increased from 0.3
    
    # Check for excessive spacing between letters
    if re.search(r'\b\w \w \w\b', text):
        score += 0.5  # Increased from 0.4
    
    # Check for obfuscation of spam words
    if re.search(r'[fF][rR][eE][eE]|[cC][aA][sS][hH]|[mM][oO][nN][eE][yY]', text):
        score += 0.6  # Increased from 0.5
    
    # Normalize score
    return min(score, 1.0)

def analyze_email_headers(headers, is_academic=False):
    """
    Analyze email headers for signs of spam or phishing
    
    Args:
        headers (dict): Dictionary of email headers
        is_academic (bool): Flag indicating if context is academic
    
    Returns:
        float: Header suspiciousness score between 0 and 1
    """
    score = 0.0
    
    # Check From vs. Reply-To mismatch
    if 'from' in headers and 'reply-to' in headers:
        from_domain = re.search(r'@([A-Za-z0-9.-]+\.[A-Za-z]{2,})', headers['from'])
        reply_domain = re.search(r'@([A-Za-z0-9.-]+\.[A-Za-z]{2,})', headers['reply-to'])
        
        if from_domain and reply_domain and from_domain.group(1) != reply_domain.group(1):
            score += 0.7
    
    # Check for suspicious received headers
    if 'received' in headers:
        received_headers = headers['received'] if isinstance(headers['received'], list) else [headers['received']]
        for received in received_headers:
            if re.search(r'(suspicious|spam|blocked|blacklisted)', received, re.IGNORECASE):
                score += 0.6
    
    # Check for academic domains in From field if academic context
    if is_academic and 'from' in headers:
        if re.search(r'@.+\.edu\b', headers['from'], re.IGNORECASE):
            score -= 0.3  # Reduce suspicion for .edu domains in academic context
    
    # Check for suspicious mail clients or X-Mailer headers
    if 'x-mailer' in headers:
        if re.search(r'(bulk|mass|marketing|newsletter|campaign)', headers['x-mailer'], re.IGNORECASE):
            score += 0.5
    
    # Check for suspicious content types
    if 'content-type' in headers:
        if re.search(r'multipart/mixed', headers['content-type'], re.IGNORECASE):
            score += 0.2  # Slightly suspicious (could have attachments)
    
    # Check for missing or suspicious Message-ID
    if 'message-id' not in headers:
        score += 0.3
    elif 'message-id' in headers:
        if not re.search(r'<[^>]+@[^>]+>', headers['message-id']):
            score += 0.4  # Malformed Message-ID
    
    # Check for auto-generated or bulk message indicators
    auto_bulk_indicators = ['x-auto-response-suppress', 'auto-submitted', 'x-cron-env', 'x-amazon-mail-relay-type']
    for indicator in auto_bulk_indicators:
        if indicator in headers:
            score += 0.3
            break
    
    # Check for bulk mail software indicators
    bulk_software = ['phpmailer', 'phplist', 'mailchimp', 'constantcontact', 'sender', 'mailgun', 'sendgrid']
    for header_key, header_value in headers.items():
        for software in bulk_software:
            if software in str(header_value).lower():
                score += 0.4
                break
    
    # Normalize score
    return min(score, 1.0)

def analyze_call_metadata(metadata):
    """
    Analyze call metadata for signs of spam or scam calls
    
    Args:
        metadata (dict): Dictionary containing call metadata
    
    Returns:
        float: Call metadata suspiciousness score between 0 and 1
    """
    print(f"Debug: analyze_call_metadata received metadata: {metadata}")
    
    score = 0.0
    
    try:
        # Check for suspicious caller ID patterns
        if 'caller_id' in metadata:
            print("Debug: Processing caller_id")
            caller_id = str(metadata['caller_id']).strip()
            if not caller_id or re.search(r'000-0000|555-0100|999-9999', caller_id.replace('-', '')) or len(caller_id) < 10:
                score += 0.5
            elif not re.match(r'^\+?1?\d{10,11}$', caller_id):
                score += 0.3
        
        # Check call duration
        if 'duration' in metadata:
            print(f"Debug: Processing duration: {metadata['duration']} (type: {type(metadata['duration'])})")
            try:
                duration = int(metadata['duration'])
                if duration < 5:  # Very short calls might be suspicious
                    score += 0.4
                elif duration > 300:  # Unusually long calls might be telemarketing
                    score += 0.3
            except (TypeError, ValueError) as e:
                print(f"Debug: Error processing duration: {str(e)}")
        
        # Check call frequency
        if 'frequency' in metadata:
            print(f"Debug: Processing frequency: {metadata['frequency']} (type: {type(metadata['frequency'])})")
            try:
                frequency = int(metadata['frequency'])
                if frequency > 3:  # High frequency suggests spam
                    score += min(0.1 * frequency, 0.7)
            except (TypeError, ValueError) as e:
                print(f"Debug: Error processing frequency: {str(e)}")
        
        # Check time of call
        if 'call_time' in metadata:
            try:
                call_time = datetime.strptime(metadata['call_time'], '%Y-%m-%d %H:%M:%S')
                hour = call_time.hour
                
                # Calls during odd hours
                if hour < 6 or hour > 21:
                    score += 0.5
            except:
                pass
    
    except Exception as e:
        print(f"Error in analyze_call_metadata: {str(e)}")
        return 0.0  # Return safe default value if error occurs
    
    # Normalize score
    return min(score, 1.0)

def detect_high_risk_content(text):
    """
    Detect high-risk content in messages, such as attempts at identity theft, financial fraud, etc.
    
    Args:
        text (str): The text to analyze
    
    Returns:
        tuple: (is_high_risk, risk_reasons)
            - is_high_risk: Boolean indicating if high risk content was detected
            - risk_reasons: List of reasons why content is considered high risk
    """
    normalized_text = text.lower()
    risk_reasons = []
    
    # Check for personal information requests
    if re.search(r'(ssn|social security|tax id|passport|driver\'?s license|id card)', normalized_text):
        risk_reasons.append("Requests for personal identification")
    
    # Check for financial fraud indicators
    if re.search(r'(bank account|routing number|account number|credit card|cvv|expiration date|pin|security code)', normalized_text):
        risk_reasons.append("Requests for financial information")
    
    # Check for urgent financial requests
    if re.search(r'(send money|wire transfer|western union|moneygram|gift card|bitcoin|cryptocurrency)', normalized_text):
        risk_reasons.append("Suspicious money transfer request")
    
    # Check for extortion or blackmail
    if re.search(r'(compromised|hacked|exposed|recorded|webcam|video of you|publish|share.*photos)', normalized_text):
        risk_reasons.append("Possible extortion attempt")
    
    # Check for tech support scams
    if re.search(r'(virus|malware|infected|tech support|remote access|security alert|microsoft support|apple support)', normalized_text):
        risk_reasons.append("Possible tech support scam")
    
    # Check for impersonation of officials
    if re.search(r'(irs|tax authority|fbi|police|government|official|agent|officer|warrant|arrest|legal action)', normalized_text):
        risk_reasons.append("Authority impersonation")
    
    # Check for lottery/inheritance scams
    if re.search(r'(lottery|winner|prize|inheritance|unclaimed|beneficiary|deceased relative|claim your)', normalized_text):
        risk_reasons.append("Suspicious prize or inheritance claim")
    
    return len(risk_reasons) > 0, risk_reasons
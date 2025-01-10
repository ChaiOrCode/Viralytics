from flask import Flask, request, jsonify
from flask_cors import CORS 

from Functions import combined_flow_output_timestamp, run_flow_postAnalyzer, run_flow_contentSuggestor, run_flow_postType, run_flow_sentimentAnalysis, retrieveTweetComments
app = Flask(__name__)

CORS(app)

@app.route('/api/timestamp', methods=['GET']) #called from button click : no data from frontend => just curr timestamp is analyzed for posting or not
def api_combined_flow_output_timestamp():
    try:
        response = combined_flow_output_timestamp()
        return jsonify({"response": response}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/content-suggestor', methods=['POST']) # gets text input, output = text
def api_run_flow_contentSuggestor():
    try:
        data = request.get_json()
        message = data.get('message', '')
        response = run_flow_contentSuggestor(message)
        return jsonify({"response": response}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/post-analyzer', methods=['POST']) # input = text, output = json
def api_run_flow_postAnalyzer():
    try:
        data = request.get_json()
        message = data.get('message', '')
        response = run_flow_postAnalyzer(message)
        return jsonify({"response": response}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/post-type', methods=['POST']) # input = text, output = json
def api_run_flow_postType():
    try:
        data = request.get_json()
        message = data.get('message', '')
        response = run_flow_postType(message)
        return jsonify({"response": response}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/sentiment-analysis', methods=['POST']) # input = tweetid, output = json
def api_run_flow_sentimentAnalysis():
    try:
        data = request.get_json()
        tweet_id = data.get('tweet_id', '1866869309277937937')  # Default value if not provided
        comment_list_for_a_tweetid = retrieveTweetComments(tweet_id)
        response = run_flow_sentimentAnalysis(comment_list_for_a_tweetid)
        return jsonify({"response": response}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

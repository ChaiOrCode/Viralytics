document.getElementById("submitButton").addEventListener("click", async () => {
    const timestamp = document.getElementById("timestampInput").value;
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "Loading...";

    if (!timestamp) {
        resultDiv.innerHTML = "Please select a date and time.";
        return;
    }

    try {
        const response = await fetch(`https://pythonbackend-n73y.onrender.com/api/timestamp?timestamp=${encodeURIComponent(timestamp)}`, {
            method: "GET"
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // Parsing the response body (which is a string with JSON)
        const parsedResponse = JSON.parse(data.response);

        // Formatting the parsed response for better readability
        resultDiv.innerHTML = `
            <pre>
{
    "Should Post": ${parsedResponse.should_post},
    "Predicted Retweets": ${parsedResponse.predicted_retweets},
    "Predicted Likes": ${parsedResponse.predicted_likes},
    "Timestamp": "${parsedResponse.timestamp}",
    "Should Post At": "${parsedResponse.should_post_at}",
    "Reason": "${parsedResponse.reason}"
}
            </pre>
        `;
    } catch (error) {
        resultDiv.innerHTML = `Error: ${error.message}`;
    }
});

document.getElementById("contentSuggestorButton").addEventListener("click", async () => {
    const contentInput = document.getElementById("contentInput").value;
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "Loading...";

    if (!contentInput) {
        resultDiv.innerHTML = "Please enter a topic for content suggestions.";
        return;
    }

    try {
        const response = await fetch(`https://pythonbackend-n73y.onrender.com/api/content-suggestor?topic=${encodeURIComponent(contentInput)}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"  // Indicate that we are sending JSON data
            },
            body: JSON.stringify({ topic: contentInput }) 
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // Parsing the response body (which is a string with content suggestions)
        const contentResponse = data.response;

        // Displaying the content suggestions
        resultDiv.innerHTML = `
            <pre>${contentResponse}</pre>
        `;
    } catch (error) {
        resultDiv.innerHTML = `Error: ${error.message}`;
    }
});

document.getElementById("postAnalyzerButton").addEventListener("click", async () => {
    const postInput = document.getElementById("postInput").value;
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "Loading...";

    if (!postInput) {
        resultDiv.innerHTML = "Please enter a post to analyze.";
        return;
    }

    try {
        const response = await fetch("https://pythonbackend-n73y.onrender.com/api/post-analyzer", {
            method: "POST",  
            headers: {
                "Content-Type": "application/json"  
            },
            body: JSON.stringify({ post: postInput })  
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const postResponse = JSON.parse(data.response); 

        resultDiv.innerHTML = `
            <h3>Post Analysis Results:</h3>
            <pre>Predicted Likes: ${postResponse.predicted_likes}</pre>
            <pre>Predicted Retweets: ${postResponse.predicted_retweets}</pre>
            <pre>Predicted Engagement Rate: ${postResponse.predicted_engagement_rate}</pre>
            <p><strong>Explanation:</strong></p>
            <pre>${postResponse.explanation}</pre>
        `;
    } catch (error) {
        resultDiv.innerHTML = `Error: ${error.message}`;
    }
});

document.getElementById("postTypeButton").addEventListener("click", async () => {
    const postTypeInput = document.getElementById("postTypeInput").value;
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "Loading...";

    if (!postTypeInput) {
        resultDiv.innerHTML = "Please select a post type.";
        return;
    }

    try {
        const response = await fetch(`https://pythonbackend-n73y.onrender.com/api/post-type?type=${encodeURIComponent(postTypeInput)}`, {
            method: "GET"
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        resultDiv.innerHTML = `
            <pre>${data.response}</pre>
        `;
    } catch (error) {
        resultDiv.innerHTML = `Error: ${error.message}`;
    }
});
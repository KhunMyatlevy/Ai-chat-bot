const apiKey = "1588b733eemsh7e1c6cfd87b741bp1a034djsn36f1068b8f8d";  // Replace with your actual API key

async function sendMessage() {
    const userInput = document.getElementById('user-input').value;

    if (userInput === "") return;

    // Display the user's message in the chat box
    displayMessage("User", userInput);
    
    // Clear the input field
    document.getElementById('user-input').value = "";

    // Prepare the API request
    const url = "https://chat-gpt26.p.rapidapi.com/";  // Replace with correct endpoint
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'chat-gpt26.p.rapidapi.com'  // Replace with correct host
        },
        body: JSON.stringify({
            model: "gpt-4",
            messages: [{ role: "user", content: userInput }]
        })
    };

    try {
        const response = await fetch(url, options);
        if (response.ok) {
            const data = await response.json();
            const gptResponse = data.choices[0].message.content;
            
            // Display GPT's response in the chat box
            displayMessage("ChatGPT", gptResponse);
        } else {
            displayMessage("ChatGPT", "Error: Could not get a response.");
        }
    } catch (error) {
        displayMessage("ChatGPT", "Error: " + error.message);
    }
}

function displayMessage(sender, message) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatBox.appendChild(messageElement);
    
    // Scroll to the bottom of the chat box
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to insert prompt
function insertPrompt(text) {
    console.log(text); // Replace with the actual action you want to perform
}

// Add event listeners to buttons
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("greeting-prompt").addEventListener("click", function() {
        insertPrompt("Start the conversation with a friendly greeting and ask how the user's day is going.");
    });

    document.getElementById("advice-prompt").addEventListener("click", function() {
        insertPrompt("Ask the user if they need advice on any specific topic and provide a supportive response.");
    });

    document.getElementById("question-prompt").addEventListener("click", function() {
        insertPrompt("Encourage the user to ask any questions they might have about a given topic.");
    });
});

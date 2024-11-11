document.addEventListener("DOMContentLoaded", function() {
    const prompt = "Your custom prompt text goes here";

    const chatInput = document.querySelector("textarea"); 

    if (chatInput) {
        chatInput.value = prompt;
        chatInput.dispatchEvent(new Event("input", { bubbles: true }));
    } else {
        console.warn("ChatGPT input field not found.");
    }
});

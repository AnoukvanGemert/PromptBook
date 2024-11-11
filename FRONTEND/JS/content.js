chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "insertPrompt") {
        insertPrompt(request.prompt);
    }
});

function insertPrompt(promptText) {
    const inputId = document.getElementById("prompt-textarea")
    if (inputId) {
        inputId.value = promptText;
        inputId.focus();
    }
}

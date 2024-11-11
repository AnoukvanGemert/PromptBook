chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "insertPrompt") {
        insertPrompt(request.prompt);
    }
});

function insertPrompt(promptText) {
    const chatInput = document.querySelector("textarea");
    if (chatInput) {
        chatInput.value = promptText;
        chatInput.focus();
    }
}

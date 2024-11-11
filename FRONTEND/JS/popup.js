function insertPrompt(promptText) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "insertPrompt", prompt: promptText });
    });
}

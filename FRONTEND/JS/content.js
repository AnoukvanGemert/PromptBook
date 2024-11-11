document.getElementById("sendMessage").addEventListener("click", async () => {
    const message = document.getElementById("EXT").value;
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: sendMessageToChatGPT,
        args: [message]
    });
});

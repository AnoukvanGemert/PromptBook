const promptId = 4;
const promptTitleElement = document.getElementById('prompt-title');
const promptTextarea = document.getElementById('prompt');
const askButton = document.getElementById('askChatGPT');
const saveButton = document.getElementById('saveNewPrompt');

fetch(`http://localhost:8000/composite_prompts/${promptId}/expanded`)
    .then(response => response.json())
    .then(promptData => {
        promptTitleElement.innerText = promptData.title;
        let promptText = '';
        promptData.fragments.forEach(fragment => {
            promptText += fragment.content;
            promptText += '\n\n';
        });
        promptTextarea.value = promptText;
    });

askButton.addEventListener('click', () => {
    window.location.href = `https://chat.openai.com/?q=${promptTextarea.value}`;
});

saveButton.addEventListener('click', async () => {
    const newPrompt = await fetch(`http://localhost:8000/composite_prompts`, {
        method: 'POST',
        body: JSON.stringify({
            "author_id": 1,
            "title": "New Prompt",
            "description": "default description"
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            return data;
        });
    const newFragment = await fetch(`http://localhost:8000/prompt_fragments`, {
        method: 'POST',
        body: JSON.stringify({
            "author_id": 1,
            "content": promptTextarea.value,
            "description": "default description fragment",
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            return data
        });

        askButton.addEventListener('click', () => {
            window.location.href = `https://chat.openai.com/?q=${promptTextarea.value}`;
        });

    fetch(`http://localhost:8000/composite_prompts/${newPrompt.id}/fragments/${newFragment.id}`, {
        method: 'POST',
        body: JSON.stringify({
            "order_index": 0
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        });
});
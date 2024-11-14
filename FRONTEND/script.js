const promptId = 4;
const promptTitleElement = document.getElementById('prompt-title');
const promptTextarea = document.getElementById('prompt');
const askButton = document.getElementById('askChatGPT');
const saveButton = document.getElementById('saveNewPrompt');
const outputLinks = document.getElementById('links');
const input = document.getElementById('storeInput');

function storePromptChats(SAVED) {
    localStorage.setItem('prompts', JSON.stringify(SAVED));
}

async function fetchPromptData() {
    try {
        const response = await fetch(`http://localhost:8000/composite_prompts/${promptId}/expanded`);
        const promptData = await response.json();
        promptTitleElement.innerText = promptData.title;
        let promptText = '';
        promptData.fragments.forEach(fragment => {
            promptText += fragment.content + '\n\n';
        });
        promptTextarea.value = promptText;

    } catch (error) {
        console.error('Error fetching prompt data:', error);
    }
}

askButton.addEventListener('click', () => {
    window.location.href = `https://chat.openai.com/?q=${promptTextarea.value}`;
});

function displayPromptChats() {
    input.addEventListener('keyup', (event) => {
        if (event.key == 'Enter') {
            const li = document.createElement('li');
            li.innerHTML = input.value;
            outputLinks.innerHTML = input.value;
            outputLinks.appendChild(li);
            localStorage.setItem('link', JSON.stringify(outputLinks));
        }
    });
}

async function savePrompt() {
    try {
        const newPrompt = await fetch('http://localhost:8000/composite_prompts', {
            method: 'POST',
            body: JSON.stringify({
                "author_id": 1,
                "title": "New Prompt",
                "description": "default description"
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());

        const newFragment = await fetch('http://localhost:8000/prompt_fragments', {
            method: 'POST',
            body: JSON.stringify({
                "author_id": 1,
                "content": promptTextarea.value,
                "description": "default description fragment",
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());

        await fetch(`http://localhost:8000/composite_prompts/${newPrompt.id}/fragments/${newFragment.id}`, {
            method: 'POST',
            body: JSON.stringify({
                "order_index": 0
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('New prompt and fragment saved successfully');
    } catch (error) {
        console.error('Error saving new prompt or fragment:', error);
    }
}

saveButton.addEventListener('click', savePrompt);

fetchPromptData();
displayPromptChats();
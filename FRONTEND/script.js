const promptId = 4;
const promptTitleElement = document.getElementById('prompt-title');
const promptTextarea = document.getElementById('prompt');
const askButton = document.getElementById('askChatGPT');
const saveButton = document.getElementById('saveNewPrompt');
const randomPrompt = document.getElementById('createRandomPrompt');
const ulPrompts = document.getElementById('ulPrompts');

async function pull() {
    const data = await fetch('data.json');
    const json = data.json();
    return await json;
}

fetch(`http://localhost:8000/composite_prompts/${promptId}/expanded`)
    .then(response => response.json())
    .then(promptData => {
        promptTitleElement.innerText = promptData.title;
        let promptText = '';
        promptData.fragments.forEach(fragment => {
            promptText += fragment.content + '\n\n';
        });
        promptTextarea.value = promptText;
    })
    .catch(error => {
        console.error('Error fetching prompt data:', error);
    });

askButton.addEventListener('click', () => {
    window.location.href = `https://chat.openai.com/?q=${promptTextarea.value}`;
});

promptTextarea.addEventListener('keyup', (event) => {
    if (event.key == 'Enter') {
        if (promptTextarea.value === "\n") {
            alert('Fill in your prompt');
            event.preventDefault();
            promptTextarea.value = '';
        } else {
            event.preventDefault();
            const data = JSON.parse(localStorage.getItem('promptList')) || [];
            data.push(promptTextarea.value);
            localStorage.setItem('promptList', JSON.stringify(data));
            ulPrompts.innerHTML = '';
            data.forEach(prompt => {
                const li = document.createElement('li');
                li.style.listStyleType = 'none'
                li.textContent = prompt;
                ulPrompts.appendChild(li);
            });
            promptTextarea.textContent = '';
        }
    }
});

randomPrompt.addEventListener('click', () => {
    const ding = ["a guy", "an astronaut", "a detective", "a robot", "someone"];
    const wat = ["discovers", "explores", "solves", "destroys", "creates", "invents"];
    const plek = ["a hidden cave", "an ancient city", "a faraway planet", "a parallel universe", "a promising future"];

    function getComplexPrompt() {
        const array = getPrompt(ding, wat, plek);
        return `${array[0]} ${array[1]} ${array[2]}.`;
    }

    let randomDing = 0;
    let randomWat = 0;
    let randomPlek = 0;

    function getPrompt(ding, wat, plek) {
        while (true) {
            let random = randomInteger(0, ding.length - 1);
            if (random != randomDing) {
                randomDing = random;
                break;
            }
        }

        while (true) {
            let random = randomInteger(0, wat.length - 1);
            if (random != randomWat) {
                randomWat = random;
                break;
            }
        }

        while (true) {
            let random = randomInteger(0, plek.length - 1);
            if (random != randomPlek) {
                randomPlek = random;
                break;
            }
        }

        const subject = ding[randomDing];
        const action = wat[randomWat];
        const place = plek[randomPlek];

        return [subject, action, place];
    }

    function randomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    promptTextarea.textContent = getComplexPrompt();
});


// Ties zijn code
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
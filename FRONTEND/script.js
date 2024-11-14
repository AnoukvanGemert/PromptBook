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

function fetchCategorizedPrompts() {
    fetch('/BACKEND/api/categorizedPromps.json')
    .then((res) => {
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
    })
    .then(data => {
        displayCategorizedPrompts(data.prompts);
    })
    .catch((error) => {
        console.log("Unable to fetch data:", error);
    });
}

function displayCategorizedPrompts(prompts) {
    const showPrompts = document.getElementById('showCategorized');
    showPrompts.innerHTML = "";

    const categorySelect = document.getElementById('categorySelect');
    const uniqueCategories = getUniqueCategories(prompts);
    
    uniqueCategories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        option.classList.add('text-gray-400')
        categorySelect.appendChild(option);
    });

    const table = document.createElement('table');
    table.classList.add('table-auto', 'w-full', "border-collapse", "border", 'border-slate-500');  

    const headerRow = document.createElement('tr');
    headerRow.classList.add('text-xl', "bg-gray-700");

    headerRow.innerHTML = `
        <thead>
            <th class="w-[70%] border border-slate-600 px-6 py-3 text-gray-400">Content</th>
            <th class="w-[15%] border border-slate-600 text-gray-400 px-6 py-3">Category</th>
            <th class="w-[15%] border border-slate-600 text-gray-400 px-6 py-3">Genre</th>
        </thead>
    `;
    table.appendChild(headerRow);

    prompts.forEach(prompt => {
        const row = document.createElement('tr');
        row.classList.add('bg-gray-800');
        row.setAttribute('data-category', prompt.category);  

        row.innerHTML = `
            <td class="border border-slate-600 px-6 py-4 text-gray-400"> ${prompt.content} </td>
            <td class="border border-slate-600 px-6 py-4 text-gray-400"> ${prompt.category} </td>
            <td class="border border-slate-600 px-6 py-4 text-gray-400"> ${prompt.genre} </td>
        `;
        table.appendChild(row);
    });

    showPrompts.appendChild(table);

    categorySelect.addEventListener('change', (e) => {
        const selectedCategory = e.target.value;
        filterByCategory(prompts, selectedCategory);
    });
}

function filterByCategory(prompts, category) {
    const rows = document.querySelectorAll('tr[data-category]');
    rows.forEach(row => {
        if (category === "" || row.getAttribute('data-category').toLowerCase() === category.toLowerCase()) {
            row.style.display = '';  
        } else {
            row.style.display = 'none';  
        }
    });
}

function getUniqueCategories(prompts) {
    const categories = prompts.map(prompt => prompt.category);
    return [...new Set(categories)]; 
}

saveButton.addEventListener('click', savePrompt);

fetchCategorizedPrompts()
displayPromptChats();
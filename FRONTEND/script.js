const promptId = 4;
const promptTitleElement = document.getElementById('prompt-title');
const promptTextarea = document.getElementById('prompt');
const askButton = document.getElementById('askChatGPT');
const saveButton = document.getElementById('saveNewPrompt');
const randomPrompt = document.getElementById('createRandomPrompt');
const ulPrompts = document.getElementById('ulPrompts');
const date = new Date();
const time = date.toTimeString();
const day = date.getDay();

function saving(prompts) {
    saveButton.addEventListener('click', () => {
        const table = document.getElementById('rowPrompt');
        console.log(prompts);
        
        const li = document.createElement('li');
        li.style.listStyleType = 'none';
        li.innerHTML = promptTextarea.value;
        promptTextarea.value = '';
        prompts.forEach(prompt => {
            li.setAttribute('data-category', prompt.category);

            li.innerHTML = `
            <p> 
                <div>
                    <p id="textContent">${prompt.content}  ${prompt.category}  ${prompt.genre}</p>
                </div>
            </p>
        `;
            table.appendChild(li);
        });
        ulPrompts.appendChild(li);
    });
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

function copyToClipboard(value) {
    navigator.clipboard.writeText(value).then(() => {
        alert(`The text "${value}" has been copied to your clipboard!`);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
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
        option.classList.add('text-gray-500')
        categorySelect.appendChild(option);
    });

    const table = document.createElement('table');
    table.classList.add('table-auto', 'w-full', "border-collapse", "border", 'border-slate-500');

    const headerRow = document.createElement('tr');
    headerRow.classList.add('text-xl', "text-gray-500", "bg-gray-50");

    headerRow.innerHTML = `
        <thead>
            <th class="w-[70%] border border-slate-600 px-6 py-3 ">Content</th>
            <th class="w-[15%] border border-slate-600  px-6 py-3">Category</th>
            <th class="w-[15%] border border-slate-600  px-6 py-3">Genre</th>
        </thead>
    `;
    table.appendChild(headerRow);

    prompts.forEach(prompt => {
        const row = document.createElement('tr');
        row.classList.add('bg-gray-100', 'hover:bg-gray-200');
        table.setAttribute('id', 'rowPrompt');

        row.setAttribute('data-category', prompt.category);

        row.innerHTML = `
            <td class="border border-slate-600 px-6 py-4 text-gray-500"> 
                <div class='text-gray-500 flex justify-between'>
                    <p class='text-gray-500 w-[80%]' id="textContent">${prompt.content}</p>
                    <button onclick="copyToClipboard('${prompt.content}')" class="hover:text-gray-700 hover:underline">Copy text</button>
                </div>
            </td>
            <td class="border border-slate-600 px-6 py-4 text-gray-500"> ${prompt.category} </td>
            <td class="border border-slate-600 px-6 py-4 text-gray-500"> ${prompt.genre} </td>
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

    promptTextarea.value = getComplexPrompt();

});

// Ties zijn code is nu tijdelijk weg

fetchCategorizedPrompts();
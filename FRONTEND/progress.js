const bookmark = document.getElementById('bookBtn');
const inputPrompt = document.getElementById('inputPrompt');
const promptlist = document.getElementById('promptlist');

bookmark.addEventListener('click', () => {
    if (bookmark) {
        bookmark.setAttribute('fill', 'yellow')
    }
})

inputPrompt.addEventListener('keyup', (event) => {
    if (event.key == 'Enter') {
        const li = document.createElement('li');
        li.innerHTML = inputPrompt.value;
        promptlist.appendChild(li);
    }
})
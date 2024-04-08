const baseUrl = window.location.href;
const links = document.querySelectorAll('a:not([target="_blank"])');
const contentPage = document.getElementById('content');

for (const link of links) {
    link.addEventListener('click', async function (event) {
        event.preventDefault();
        
        const urlPage = link.getAttribute('href');
        const response = await fetch(`${baseUrl}${urlPage}`);

        if (!response.ok) return false;

        const html = await response.text();
        contentPage.innerHTML = html;

        

        return true;
    });
}

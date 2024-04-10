const baseUrl = window.location.origin;
const contentPage = document.getElementById('content');
const btnToggleSitemap = document.getElementById('toggle-sitemap');

const routePages = {
    '/about': 'pages/about.html',
    '/mural': 'pages/mural/index.html',
    '/mural/buzios': 'pages/mural/buzios.html',
    '/mural/arraial': 'pages/mural/arraial.html',
    '/mural/boa-esperanca': 'pages/mural/boa-esperanca.html',
    '/mural/futevolei': 'pages/mural/futevolei.html',
    '/mural/cam': 'pages/mural/cam.html',
    '/mural/festa-fantasia': 'pages/mural/festa-fantasia.html',
}

const initPage = async () => {
    const routeName = window.location.pathname;
    return await resolveRoute(routeName);
};

const resolveRoute = async (routeName) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    contentPage.innerHTML = `<p class="loading-page">Carregando...</p>`;

    const urlPage = routePages[routeName] || routePages['/about'];
    const response = await fetch(`${baseUrl}/${urlPage}`);

    if (!response.ok) return false;

    const html = await response.text();
    contentPage.innerHTML = html;

    const responseAsHtml = new DOMParser().parseFromString(html, 'text/html');
    const pageScripts = responseAsHtml.querySelectorAll('input.page-script');

    if(pageScripts.length) for (const inputScript of pageScripts) {
        const scriptUrl = inputScript.value;
        const script = document.createElement('script');
        script.src = scriptUrl;
        document.body.appendChild(script);
    }

    resolveEventLinks();

    window.history.pushState(null, null, routeName);
    return true;
}

const resolveEventLinks = () => {
    const links = document.querySelectorAll('a:not([target="_blank"]):not(.tracked)');

    for (const link of links) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            
            const routeName = link.getAttribute('href');
            return resolveRoute(routeName);
        });

        link.classList.add('tracked');
    }
}

btnToggleSitemap.addEventListener('click', () => {
    const sitemap = document.getElementById('sitemap');
    sitemap.classList.toggle('d-none');

    if (!sitemap.classList.contains('d-none')) {
        const heightPage = document.body.scrollHeight;
        window.scrollTo({ top: heightPage, behavior: 'smooth' });
    }
});

addEventListener("popstate", (e) => initPage());
initPage();
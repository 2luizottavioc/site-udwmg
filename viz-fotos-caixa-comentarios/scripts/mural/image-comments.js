function init() {
    const btnSendComment = document.querySelector('.image-mural-comments-container-send-message .btns .send');
    const btnCancelComment = document.querySelector('.image-mural-comments-container-send-message .btns .cancel');
    const textAreaComment = document.querySelector('.image-mural-comments-container-send-message textarea');
    const listComments = document.querySelector('.image-mural-comments-list');
    
    btnSendComment.addEventListener('click', (e) => {
        e.preventDefault();
    
        const comment = textAreaComment.value;
        if (!comment) return;
    
        const commentEl = `<li class="image-mural-comments-item">
            <h1>Você</h1>
            <p>${comment}</p>
            <time>${new Date().toLocaleString()}</time>
        </li>`;
    
        const nodeComment = new DOMParser().parseFromString(commentEl, 'text/html');
    
        listComments.prepend(nodeComment.body.firstChild);
        textAreaComment.value = '';
    });
    
    btnCancelComment.addEventListener('click', (e) => {
        e.preventDefault();
        textAreaComment.value = '';
    });
}

init();
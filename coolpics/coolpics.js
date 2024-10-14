document.addEventListener("DOMContentLoaded", function() {
    const menuButton = document.querySelector('.menu');
    const menuItems = document.querySelector('nav ul');
    const gallery = document.querySelector('.gallery');

    // Hide menu items by default
    menuItems.classList.add('hide');

    // Add event listener to the menu button
    menuButton.addEventListener('click', function() {
        menuItems.classList.toggle('hide');
    });

    function handleResize() {
        if (window.innerWidth > 1000) {
            menuItems.classList.remove('hide');
        } else {
            menuItems.classList.add('hide');
        }
    }

    handleResize();

    // Add event listener to window to watch for resize events
    window.addEventListener('resize', handleResize);

    // Viewer template function
    function viewerTemplate(src, alt) {
        return `
            <div class="viewer">
                <button class="close-viewer">X</button>
                <img src="${src}" alt="${alt}">
            </div>
        `;
    }

    function viewHandler(event) {
        const clickedElement = event.target;
        if (clickedElement.tagName === 'IMG') {
            const src = clickedElement.src.split('-')[0] + '-full.jpeg';
            const alt = clickedElement.alt;
            document.body.insertAdjacentHTML('afterbegin', viewerTemplate(src, alt));
            document.querySelector('.close-viewer').addEventListener('click', closeViewer);
        }
    }

    function closeViewer() {
        const viewer = document.querySelector('.viewer');
        if (viewer) {
            viewer.remove();
        }
    }

    gallery.addEventListener('click', viewHandler);
});

document.addEventListener('DOMContentLoaded', function() {
    const themeSelector = document.querySelector('#theme-select');

    function changeTheme() {
        if (themeSelector.value === 'dark') {
            document.body.classList.add('dark');
            document.querySelector('footer img').src = 'images/byui-logo_white.png';
        } else {
            document.body.classList.remove('dark');
            document.querySelector('footer img').src = 'images/byui-logo_blue.webp';
        }
    }

    themeSelector.addEventListener('change', changeTheme);
});
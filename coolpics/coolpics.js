document.addEventListener("DOMContentLoaded", function() {
    const menuButton = document.querySelector(".menu");
    const menuItems = document.querySelector('nav ul');

    // Hide menu items by default
    menuItems.classList.add("hide");

    // Add event listener to the menu button
    menuButton.addEventListener("click", function() {
        menuItems.classList.toggle("hide");
    });

    function handleResize() {
        if (window.innerWidth > 1000) {
            menuItems.classList.remove("hide");
        } else {
            menuItems.classList.add("hide");
        }
    }

    // Call handleResize immediately when the page loads
    handleResize();

    // Add event listener to window to watch for resize events
    window.addEventListener("resize", handleResize);
});

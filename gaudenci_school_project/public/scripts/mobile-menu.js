document.addEventListener('DOMContentLoaded', function () {
    // Código para o menu cascata móvel
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
    });
});

const checkbox = document.querySelector('.checkbox');
const body = document.querySelector('body');
const navbar = document.querySelector('.navbar');

checkbox.addEventListener('change', function () {
    if (this.checked) {
        body.style.overflow = 'hidden';
        navbar.classList.add('menu-open');
    } else {
        body.style.overflow = 'auto';
        navbar.classList.remove('menu-open');
    }
});

body.addEventListener('click', function (event) {
    if (!navbar.contains(event.target) && checkbox.checked) {
        checkbox.checked = false;
        body.style.overflow = 'auto';
        navbar.classList.remove('menu-open');
    }
});

let btn = document.querySelector('#btn');
let sidebar = document.querySelector('.sidebar');
let searchBtn = document.querySelector('.bx-search');

let limiter = document.querySelector('.limiter');

btn.addEventListener('click', () => {
    sidebar.classList.toggle('sidebar-active');
})

searchBtn.addEventListener('click', () => {
    sidebar.classList.toggle('sidebar-active');
})

limiter.addEventListener('click', () => {
    limiter.classList.toggle('.limit-active');
})

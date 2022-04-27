let btn = document.querySelector('#btn');
let sidebar = document.querySelector('.sidebar');
let searchBtn = document.querySelector('.bx-search');
let deleteConfirm = document.querySelectorAll('.deleteConfirm');
let deleteLink = document.querySelectorAll('.deleteLink');

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

for(let i = 0; i < this.deleteLink.length; i++) {
    console.log(deleteLink[i]);
}

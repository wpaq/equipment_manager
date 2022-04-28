let btn = document.querySelector('#btn');
let sidebar = document.querySelector('.sidebar');
let searchBtn = document.querySelector('.bx-search');
const deleteConfirm = document.querySelector('.deleteConfirm');
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

// modal bootstrap confirm delete onclick
for(let i = 0; i < deleteLink.length; i++) {
    deleteLink[i].onclick = () => {
        deleteConfirm.onclick = () => {
            location.replace(deleteLink[i].href);
        }
    }
}
// -- modal bootstrap confirm delete onclick 

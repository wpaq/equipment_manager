export default {
    get() {
        this.btn = document.querySelector('#btn');
        this.sidebar = document.querySelector('.sidebar');
        this.searchBtn = document.querySelector('.bx-search');
        this.deleteConfirm = document.querySelector('.deleteConfirm');
        this.deleteLink = document.querySelectorAll('.deleteLink');
        this.limiter = document.querySelector('.limiter');
        this.equipmentDate = document.querySelector('#equipment-date');
    },

    actions() {
        if (this.btn) {
            this.btn.addEventListener('click', () => {
                this.sidebar.classList.toggle('sidebar-active');
            })
        }
        
        if (this.searchBtn) {
            this.searchBtn.addEventListener('click', () => {
            this.sidebar.classList.toggle('sidebar-active');
            })
        }
        
        if (this.limiter) {
            this.limiter.addEventListener('click', () => {
                this.limiter.classList.toggle('.limit-active');
            })
        }
        
        // modal bootstrap confirm delete onclick
        if (this.deleteLink) {
            for(let i = 0; i < this.deleteLink.length; i++) {
                this.deleteLink[i].onclick = () => {
                    this.deleteConfirm.onclick = () => {
                        location.replace(this.deleteLink[i].href);
                    }
                }
            }
        }

        // mask date jquery
        if (this.equipmentDate) {
            $(this.equipmentDate).mask("99/99/9999");
        }      
    
    }
}
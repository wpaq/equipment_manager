import data from "./data.js";

export default {
    get() {
        this.btn = document.querySelector('#btn');
        this.sidebar = document.querySelector('.sidebar');
        this.searchBtn = document.querySelector('.bx-search');
        this.deleteConfirm = document.querySelector('.deleteConfirm');
        this.deleteLink = document.querySelectorAll('.deleteLink');
        this.limiter = document.querySelector('.limiter');
        this.equipmentDate = document.querySelector('#equipment-date');
        this.qrcodeLink = document.querySelectorAll('.qrcodeLink');
        this.qrcodeImage = document.querySelector('.qrcodeImage');
        this.qrcodeImageLinkDownload = document.querySelector('.qrCodeImageLinkDownload');
        this.equipmentSelect = document.querySelector('.equipment-select');

        this.dataa = document.querySelector('#form6Example7');

        this.selectOptionEquipment = document.querySelector('#form6Example2');
        this.selectOptionEmpresa = document.querySelector('.empresa-select');
    },

    actions() {
        // mask date jquery
        if (this.equipmentDate) {
            $(this.equipmentDate).mask("00/00/0000");
        }  

        if (this.dataa) {
            $(this.dataa).mask("00/00/0000");
        }

        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        })

        $(document).ready( function () {
            $('#myTable').DataTable();
        } );


        if (this.equipmentSelect) {
            if (this.equipmentSelect.value === 'GABINETE') {
                this.equipmentSelect.options[1].selected = 'selected';
            } 
            if (this.equipmentSelect.value === 'MONITOR') {
                this.equipmentSelect.options[2].selected = 'selected';
            } 
            if (this.equipmentSelect.value === 'ESTABILIZADOR') {
                this.equipmentSelect.options[3].selected = 'selected';
            } 
        }

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

        if (this.qrcodeLink) {            
            for(let i = 0; i < this.qrcodeLink.length; i++) {                                
                this.qrcodeLink[i].onclick = () => {
                    this.qrcodeImage.src = `/assets/img/${this.qrcodeLink[i].id}.png`;
                    this.qrcodeImageLinkDownload.href = `/assets/img/${this.qrcodeLink[i].id}.png`
                }
            }
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
    
    },

    arraySelectOption() {
        const dataJson = {
            secretarias: [
                { nome: 'SEAD', setores: [ 'PAD', 'RH' ]},
                { nome: 'AMAJU', setores: [ 'AAA', 'AAA' ]},
            ]
        }
        for (var index in dataJson ) {
            console.log(dataJson[index])
        }

        // equipamentos data

        var arrays = data.map(Object.values);
        var equipamentos = arrays[0];
        var secretarias = arrays[1];
        var empresas = arrays[2];

        equipamentos.forEach(elem => {
            elem.forEach(equip => {
                const optionEquipamento = document.createElement("option");
                optionEquipamento.innerHTML = equip;
                optionEquipamento.value = equip;

                this.selectOptionEquipment.appendChild(optionEquipamento);
            });
        });

        empresas.forEach(elem => {
            elem.forEach(empresa => {
                const optionEmpresa = document.createElement("option");
                optionEmpresa.innerHTML = empresa;
                optionEmpresa.value = empresa;

                this.selectOptionEmpresa.appendChild(optionEmpresa);
            });
        });


    }
}
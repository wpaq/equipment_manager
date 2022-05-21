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

        this.data_verificacao = document.querySelector('#form6Example7');

        this.selectOptionEquipment = document.querySelector('.equipment-select');
        this.selectOptionEmpresa = document.querySelector('.empresa-select');
        this.selectOptionSecretaria = document.querySelector('.secretaria-select');
        this.selectOptionSetor = document.querySelector('.setor-select');

        this.tdEquipmentAlugado = document.querySelectorAll('.td-equipment-alugado');
    },

    actions() {
        if (this.tdEquipmentAlugado) {
            this.tdEquipmentAlugado.forEach(td => {
                if (td.innerHTML == 'false') {
                    td.innerHTML = 'NÃO'
                } else if (td.innerHTML == 'true') {
                    td.innerHTML = 'SIM'
                } 
            });
        }

        if (this.data_verificacao) {
            $(this.data_verificacao).mask("00/00/0000", {placeholder: "__/__/____"});
        }

        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        })

        $(document).ready( function () {
            $('#myTable').DataTable();
        } );

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
        if (this.selectOptionEquipment) {
            data.forEach(elem => {
                if (elem.secretarias) {
                    for (let i = 0; i < elem.secretarias.length; i++) {
                        // create option secretaria
                        const optionSecretaria = document.createElement("option");
                            optionSecretaria.innerHTML = elem.secretarias[i].nome;
                            optionSecretaria.value = elem.secretarias[i].nome;
                            
                        this.selectOptionSecretaria.appendChild(optionSecretaria);

                        if (this.selectOptionSecretaria.value === elem.secretarias[i].nome) {
                            i++
                            this.selectOptionSecretaria.options[i].selected = 'selected';
                            i--

                            const optionEmpty = this.selectOptionSetor[0];
                                $(this.selectOptionSetor).empty();
                                this.selectOptionSetor.appendChild(optionEmpty);
            
                                for (let j in elem.secretarias[i].setores) {
                                    // create options with setores value
                                    const optionSetor = document.createElement("option");
                                    optionSetor.innerHTML = elem.secretarias[i].setores[j];
                                    optionSetor.value = elem.secretarias[i].setores[j];
            
                                    this.selectOptionSetor.appendChild(optionSetor);

                                    if (this.selectOptionSetor.value === elem.secretarias[i].setores[j]) {
                                        j++
                                        this.selectOptionSetor.options[j].selected = 'selected';
                                        j--
                                    }
                                }    
                        }                        
            
                        // select option secretaria onchange                        
                        this.selectOptionSecretaria.addEventListener('change', () => {

                            if (this.selectOptionSecretaria.value === elem.secretarias[i].nome) { 
                                
                                // clear options select and append option with value database
                                const optionEmpty = this.selectOptionSetor[0];
                                $(this.selectOptionSetor).empty();
                                this.selectOptionSetor.appendChild(optionEmpty);
            
                                for (let j in elem.secretarias[i].setores) {
                                    // create options with setores value
                                    const optionSetor = document.createElement("option");
                                    optionSetor.innerHTML = elem.secretarias[i].setores[j];
                                    optionSetor.value = elem.secretarias[i].setores[j];
            
                                    this.selectOptionSetor.appendChild(optionSetor);
                                }                        
                            }
                        });
                    }    
                }

                if (elem.equipamentos) {
                    for (let i in elem.equipamentos) {
                        const optionEquipamento = document.createElement("option");
                            optionEquipamento.innerHTML = elem.equipamentos[i];
                            optionEquipamento.value = elem.equipamentos[i];
            
                        this.selectOptionEquipment.appendChild(optionEquipamento);

                        if (this.selectOptionEquipment.value === elem.equipamentos[i]) {
                            i++;
                            this.selectOptionEquipment.options[i].selected = 'selected';
                        }
                    }
                }

                if (elem.empresas) {
                    for (let i in elem.empresas) {
                        const optionEmpresa = document.createElement("option");
                        optionEmpresa.innerHTML = elem.empresas[i];
                        optionEmpresa.value = elem.empresas[i];
        
                        this.selectOptionEmpresa.appendChild(optionEmpresa);

                        if (this.selectOptionEmpresa.value === elem.empresas[i]) {
                            i++;
                            this.selectOptionEmpresa.options[i].selected = 'selected';
                        }
                    }
                }
            });
            // End forEach data
        }        
    },
}
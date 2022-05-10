import Equipment from '../models/Equipment';
import equipmentConstants from '../constants/equipmentConstants';

import { GetAllQRCodeImages_Service } from '../services/GetAllQRCodeImages_Service';
import { GetAllEquipments_Service } from '../services/GetAllEquipments_Service';
import { SearchEquipment_Service } from '../services/SearchEquipment_Service';
import { CreateEquipment_Service } from '../services/CreateEquipment_Service';
import { UpdateEquipment_Service } from '../services/UpdateEquipment_Service';
import { DeleteEquipment_Service } from '../services/DeleteEquipment_Service';

class EquipmentController {
    async show (req, res) {
        try {
            const limiter = req.query.limit;
            const query_search = req.query.search;

            const querys = []
            querys.push(req.query.search, req.query.equipamento)

            if (query_search) {
                const equipments = await new SearchEquipment_Service().execute(query_search); 

                return res.status(200).render('equipamentos', { 
                    equipments, 
                    title: 'Equipamentos' 
                });
            }

            const equipments = await new GetAllEquipments_Service().execute();
            await new GetAllQRCodeImages_Service().execute();      
    
            return res.status(200).render('equipamentos', { 
                equipments: equipments.rows, 
                equipments_qtd: equipments.count, 
                title: 'Equipamentos'
            });  
        } catch (err) {
            console.log(err)
            req.flash('errors', equipmentConstants.equipmentSearchError);
            req.session.save(() => res.redirect('/equipment/show'));
            return;   
        }
    }

    async index (req, res) {
        try {
            return res.status(200).render('equipment', {
                equipment: {},
                title: 'Adicionar Equipamento'
            });
        } catch (err) {
            req.flash('errors', equipmentConstants.equipmentStoreError);
            req.session.save(() => res.redirect('/equipment/index'));
            return;   
        }
    }

    async store(req, res) {
        try {
            const newEquipment = await new CreateEquipment_Service().execute(req.body);
            
            req.flash('success', equipmentConstants.equipmentStoreSuccess);
            req.session.save(() => res.status(200).redirect(`/equipment/index/${newEquipment}/?title='Editar Equipamento`));
            return;            
        } catch (err) {
            req.flash('errors', equipmentConstants.equipmentStoreError);
            req.session.save(() => res.redirect('/equipment/index'));
            return;  
        }
    };

    async update(req, res) {
        try {
            const updateEquipment = await new UpdateEquipment_Service().execute(req.body, req.params.id);

            if (!updateEquipment == equipmentConstants.equipmentNotFound) {
                req.flash('errors', equipmentConstants.equipmentNotFound);
                req.session.save(() => res.redirect(`/equipment/index/${req.params.id}`));
                return;
            };           
            
            req.flash('success', equipmentConstants.equipmentUpdateSuccess);
            req.session.save(() => res.redirect(`/equipment/index/${updateEquipment}`));
            return;            
        } catch (err) {
            req.flash('errors', equipmentConstants.equipmentUpdateError);
            req.session.save(() => res.redirect('/equipment/index'));
            return;  
        }
    };

    async delete(req, res) {
        try {
            const deleteEquipment = await new DeleteEquipment_Service().execute(req.params.id);

            if (deleteEquipment != equipmentConstants.equipmentDeleteSuccess) {
                req.flash('errors', equipmentConstants.equipmentDeleteError);
                req.session.save(() => res.status(400).redirect('/equipment/show'));
                return;
            }
            
            req.flash('success', equipmentConstants.equipmentDeleteSuccess);
            return req.session.save(() => res.status(200).redirect('/equipment/show'));
        } catch (err) {
            req.flash('errors', equipmentConstants.equipmentDeleteError);
            req.session.save(() => res.status(400).redirect('/equipment/show'));
            return; 
        }
    };

    async editIndex(req, res) {
        try {
            const equipment = await Equipment.findByPk(req.params.id);

            if (!equipment) {
                req.flash('errors', equipmentConstants.equipmentNotFound);
                req.session.save(() => res.redirect(`/equipment/index/${req.params.id}`));
                return; 
            };           
            
            return res.render('equipment', { 
                equipment,
                title: 'Editar Equipamento'
            });
        } catch (err) {
            req.flash('errors', equipmentConstants.equipmentUpdateError);
            req.session.save(() => res.redirect(`/equipment/index`));
            return; 
        }
    }
};

export default new EquipmentController();

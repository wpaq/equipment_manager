import Equipment from '../models/Equipment';
import equipmentConstants from '../constants/equipmentConstants';

import { GetAllQRCodeImages_Service } from '../services/GetAllQRCodeImages_Service';
import { SearchEquipment_Service } from '../services/SearchEquipment_Service';
import { CreateEquipment_Service } from '../services/CreateEquipment_Service';
import { UpdateEquipment_Service } from '../services/UpdateEquipment_Service';
import { DeleteEquipment_Service } from '../services/DeleteEquipment_Service';

class EquipmentController {
    async show (req, res) {
        try {
            const limiter = req.query.limit;
            const query_search = req.query.search;

            if (query_search) {
                const equipments = await new SearchEquipment_Service().execute(query_search); 

                return res.status(200).render('equipamentos', { equipments, title: 'Equipamentos' });
            }

            const { count, rows } = await Equipment.findAndCountAll({
              offset: 0,
              limit: limiter || 500,
              order: ['created_at']
            }); 
            

            const service = new GetAllQRCodeImages_Service();      
            await service.execute();  
    
            res.status(200).render('equipamentos', { equipments: rows, equipments_qtd: count , title: 'Equipamentos'});  
        } catch (err) {
            console.log(err)
        }
    }

    async index (req, res) {
        try {
            res.render('equipment', {
                equipment: {},
                title: 'Adicionar Equipamento'
            });
        } catch (err) {
            return req.session.save(() => res.status(404).render('404'));
        }
    }

    async store(req, res) {
        try {
            const service = new CreateEquipment_Service();
            const newEquipment = await service.execute(req.body);
            
            req.flash('success', equipmentConstants.equipmentSuccess);
            req.session.save(() => res.status(200).redirect(`/equipment/index/${newEquipment}/?title='Editar Equipamento`));
            return;            
        } catch (err) {
            return req.session.save(() => res.status(400).render('404'));
        }
    };

    async update(req, res) {
        try {
            const service = new UpdateEquipment_Service();
            const updateEquipment = await service.execute(req.body, req.params.id);

            if (!updateEquipment == equipmentConstants.equipmentNotFound) {
                req.flash('errors', equipmentConstants.equipmentNotFound);
                req.session.save(() => res.redirect(`/equipment/index/${req.params.id}`));
                return;
            };           
            
            req.flash('success', equipmentConstants.equipmentUpdateSuccess);
            req.session.save(() => res.redirect(`/equipment/index/${updateEquipment}`));
            return;            
        } catch (e) {
            return req.session.save(() => res.status(404).render('404'));
        }
    };

    async delete(req, res) {
        try {
            const service = new DeleteEquipment_Service();
            const deleteEquipment = await service.execute(req.params.id);

            if (deleteEquipment != equipmentConstants.equipmentDeleteSuccess) {
                req.flash('errors', equipmentConstants.equipmentDeleteError);
                req.session.save(() => res.render('404'));
                return;
            }
            
            req.flash('success', equipmentConstants.equipmentDeleteSuccess);
            return req.session.save(() => res.status(200).redirect('/'));
        } catch (e) {
            return req.session.save(() => res.status(404).render('404'));
        }
    };

    async editIndex(req, res) {
        try {
            const equipment = await Equipment.findByPk(req.params.id);

            if (!equipment) {
                return res.status(404).render('404');
            };           
            
            return res.render('equipment', { 
                equipment,
                title: 'Editar Equipamento'
            });
        } catch (e) {
            return req.session.save(() => res.status(404).render('404'));
        }
    }
};

export default new EquipmentController();

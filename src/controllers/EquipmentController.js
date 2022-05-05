import Equipment from '../models/Equipment';
import equipmentConstants from '../constants/equipmentConstants';
import { CreateEquipment_Service } from '../services/CreateEquipment_Service';

class EquipmentController {
    async index (req, res) {
        try {
            res.render('equipment', {
                equipment: {},
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
            req.session.save(() => res.status(200).redirect(`/equipment/index/${newEquipment}`));
            return;            
        } catch (err) {
            return req.session.save(() => res.status(400).render('404'));
        }
    };

    async editIndex(req, res) {
        try {
            const equipment = await Equipment.findByPk(req.params.id);

            if (!equipment) {
                return res.status(404).render('404');
            };           
            
            return res.render('equipment', { equipment });
        } catch (e) {
            return req.session.save(() => res.status(404).render('404'));
        }
    }

    async update(req, res) {
        try {
            const equipment = await Equipment.findByPk(req.params.id);
            await equipment.update(req.body);

            if (!equipment) {
                req.flash('errors', equipmentConstants.equipmentNotFound);
                req.session.save(() => res.redirect(`/equipment/index/${req.params.id}`));
                return;
            };           
            
            req.flash('success', equipmentConstants.equipmentUpdateSuccess);
            req.session.save(() => res.redirect(`/equipment/index/${req.params.id}`));
            return;            
        } catch (e) {
            return req.session.save(() => res.status(404).render('404'));
        }
    };

    async delete(req, res) {
        try {
            const equipment = await Equipment.findByPk(req.params.id);

            if (!equipment) {
                req.flash('errors', equipmentConstants.equipmentNotFound);
                req.session.save(() => res.render('404'));
                return;
            }
            
            await equipment.destroy();
            req.flash('success', equipmentConstants.equipmentDeleteSuccess);
            return req.session.save(() => res.status(200).redirect('/'));
        } catch (e) {
            return req.session.save(() => res.status(404).render('404'));
        }
    };
};

export default new EquipmentController();

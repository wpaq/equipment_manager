import Equipment from '../models/Equipment';
import QRCode from 'qrcode';
import fs from 'fs';
import { CreateQRCodeImageService } from '../services/CreateQRCodeImageService';

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
            // generate QRCodeImage Service
            const serviceQRCodeImage = new CreateQRCodeImageService();
            const foto = await serviceQRCodeImage.create(req.body)

            const { tombo, equipamento, empresa, local, responsavel, configuracao, data_verificacao } = req.body;

            // insert in database
            const newEquipment = await Equipment.create({ tombo, equipamento, empresa, local, responsavel, configuracao, data_verificacao, foto });

            req.flash('success', 'Equipamento criado com sucesso.');
            req.session.save(() => res.redirect(`/equipment/index/${newEquipment.id}`));
            return;            
        } catch (e) {
            return req.session.save(() => res.render('404'));
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
            console.log(req.body)

            if (!equipment) {
                req.flash('errors', 'Equipamento não existe.');
                req.session.save(() => res.redirect(`/equipment/index/${req.params.id}`));
                return;
            };           
            
            req.flash('success', 'Equipamento atualizado com sucesso.');
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
                req.flash('errors', 'Equipamento não existe.');
                req.session.save(() => res.render('404'));
                return;
            }
            
            await equipment.destroy();
            req.flash('success', 'Equipamento deletado com sucesso');
            return req.session.save(() => res.status(200).redirect('/'));
        } catch (e) {
            return req.session.save(() => res.status(404).render('404'));
        }
    };
};

export default new EquipmentController();

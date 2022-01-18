import Equipment from '../models/Equipment';

class EquipmentController {
    async show(req, res) {
        try {
            const equipment = await Equipment.findAll();

            res.render('equipment', {
                equipment: {}
            });
           
        } catch (e) {
            return req.session.save(() => res.render('404'));
        }
    }

    async store(req, res) {
        try {
            const newEquipment = await Equipment.create(req.body);

            return res.json(newEquipment);
        } catch (e) {
            return req.session.save(() => res.render('404'));
        }
    };

    async editIndex(req, res) {
        try {
            const equipment = await Equipment.findByPk(req.params.id);

            if (!equipment) {
                return res.status(401).render('404');
            };           
            
            res.render('equipment', { equipment });
        } catch (e) {
            return req.session.save(() => res.render('404'));
        }
    }

    async update(req, res) {
        try {
            const equipment = await Equipment.findByPk(req.params.id);
            await equipment.update(req.body);

            if (!equipment) {
                req.flash('errors', 'Equipamento não existe.');
                req.session.save(() => res.redirect(`/equipment/index/${req.params.id}`));
                return;
            };           
            
            req.flash('success', 'Equipamento atualizado com sucesso.');
            req.session.save(() => res.redirect(`/equipment/index/${req.params.id}`));
            return;            
        } catch (e) {
            return req.session.save(() => res.render('404'));
        }
    };

    async delete(req, res) {
        try {
            const equipment = await Equipment.findByPk(req.body.id);

            if (!equipment) {
                return res.status(400).json({
                    errors: 'Equipamento não existe'
                });
            }

            await equipment.destroy();
            return res.json(null);
        } catch (e) {
            return req.session.save(() => res.render('404'));
        }
    };
};

export default new EquipmentController();

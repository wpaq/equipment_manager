import Equipment from '../models/Equipment';

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
            const tombo = req.body.tombo;
            const equipment = await Equipment.findOne({ where: { tombo} })

            if (!equipment) {
                const newEquipment = await Equipment.create(req.body);

                req.flash('success', 'Equipamento adicionado com sucesso.');
                req.session.save(() => res.redirect(`/equipment/index/${newEquipment.id}`));
                return;            
            }

            req.flash('errors', 'Equipamento já existe!');
            req.session.save(() => res.redirect(`/equipment/index/`));
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

import Equipment from '../models/Equipment';

class EquipmentController {
    async index(req, res) {
        try {
            res.render('index', {
                equipment: {}
            });
        } catch (e) {
            req.session.save(function() {
                return res.status(401).render('404');
            });
            return;
        }
    }


    async show(req, res) {
        try {
            const equipment = await Equipment.findAll();

            return res.json(equipment);
        } catch (e) {
            return res.status(400).json({
                errors: e.errors.map((err) => err.message),
            });
        }
    }

    async store(req, res) {
        try {
            const newEquipment = await Equipment.create(req.body);

            return res.json(newEquipment);
        } catch (e) {
            return res.status(400).json({
                errors: e.errors.map((err) => err.message),
            });
        }
    };

    async update(req, res) {
        try {
            const equipment = await Equipment.findByPk(req.params.id);

            if (!equipment) {
                req.flash('errors', 'Equipamento não existe.');
                req.session.save(function() {
                    return res.status(401).render('404');
                });
                return;
            };

            await equipment.update(req.body);

            req.flash('errors', 'Equipamento editado com sucesso.');
            req.session.save(() => res.redirect(`/equipment/index/${equipment.equipamento._id}`));
            return;            
        } catch (e) {
            req.session.save(function() {
                return res.status(401).render('404');
            });
            return;
        }
    };

    async delete(req, res) {
        try {
            const equipment = await Equipment.findByPk(req.body.id);

            if (!equipment) {
                return res.status(400).json({
                    errors: 'Equipment does not exists'
                });
            }

            await equipment.destroy();
            return res.json(null);
        } catch (e) {
            return res.status(400).json({
                errors: e.errors.map((err) => err.message),
            });
        }
    };
};

export default new EquipmentController();

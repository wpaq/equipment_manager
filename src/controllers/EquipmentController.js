import Equipment from '../models/Equipment';

class EquipmentController {
    async show(req, res) {
        try {
            const equipment = await Equipment.findAll();

            return res.json(equipment);
        } catch (e) {
            console.log(e)
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
            const equipment = await Equipment.findByPk(req.body.id);

            if (!equipment) {
                return res.status(400).json({
                    errors: 'Equipment does not exists'
                });
            };

            const newData = await equipment.update(req.body);
            return res.json(equipment);
        } catch (e) {
            return res.status(400).json({
                errors: e.errors.map((err) => err.message),
            });
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

import Equipment from "../models/Equipment";

export class GetAllEquipments_Service {
    async execute(qtd_limit) {
        try {
            const { count, rows } = await Equipment.findAndCountAll({
                offset: 0,
                limit: qtd_limit,
                order: [
                    ['created_at', 'DESC']
                ]
            });

            return { count, rows };
        } catch (err) {
            return console.log(err)
        }
    }

}
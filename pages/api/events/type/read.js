import conn from '../../db';
import { apiHandler } from 'helpers/api';

const getData = async (typeEvent) => {
    const query = `select tyev.id, tyev.name_program from type_events tyev
        where tyev.name = $1`;
    const values = [typeEvent]
    return await conn.query(
        query,values
    );
}


const handler = async (req, res) => {
    const {typeEvent} = req.body;
    const result = await getData(typeEvent);
    return res.status(200).json({
        data: result.rows,
        success: true,
    });
};

export default apiHandler(handler);
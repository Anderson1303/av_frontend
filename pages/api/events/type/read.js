import conn from '../../db';
import { apiHandler } from 'helpers/api';

const getData = async () => {
    const query = `select tyev.id, tyev.name_program from type_events tyev`;
    return await conn.query(
        query
    );
}

const handler = async (req, res) => {
    const result = await getData();
    return res.status(200).json({
        data: result.rows,
        success: true,
    });
};

export default apiHandler(handler);
import conn from '../db';
import { apiHandler } from 'helpers/api';

const handler = async (req, res) => {
    const {id} = req.body;
    const query = 'DELETE FROM patient where id = $1'
    const values = [id]
    const result = await conn.query(
        query,
        values
    );
    return res.status(200).json(result)
};

export default apiHandler(handler);
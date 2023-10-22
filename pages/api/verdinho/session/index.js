import conn from '../../db';
import { apiHandler } from 'helpers/api';

const getData = async () => {
    const query = `select key,value from token where key = 'token_key_verdinho'`;
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
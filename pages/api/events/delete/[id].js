import conn from '../../db';
import { apiHandler } from 'helpers/api';

const deleteData = async (id) => {
    const query = `delete from events eve where eve.id = $1`;
    const values = [id]
    return await conn.query(
        query,values
    );
}

const handler = async (req, res) => {
    const { id } = req.query;
    const result = await deleteData(id);
    return res.status(200).json({
        data: result.rows,
        success: true,
    });
};

export default apiHandler(handler);
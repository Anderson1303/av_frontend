import conn from '../db';
import { apiHandler } from 'helpers/api';

const handler = async (req, res) => {
    const {name,cpf,phone} = req.body;
    const query = 'INSERT INTO patient(name,cpf,phone) VALUES($1,$2,$3) RETURNING id'
    const values = [name,cpf,phone]
    const result = await conn.query(
        query,
        values
    );
    return res.status(200).json(result)
};

export default apiHandler(handler);
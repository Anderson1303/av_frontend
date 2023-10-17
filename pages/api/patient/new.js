import conn from '../db';
import { apiHandler } from 'helpers/api';

const handler = async (req, res) => {
    const {name,cpf,phone,birthday} = req.body;
    const query = 'INSERT INTO patient(name,cpf,phone,birthday) VALUES($1,$2,$3,$4) RETURNING id'
    const values = [name,cpf,phone,`${birthday}`]
    const result = await conn.query(
        query,
        values
    );
    return res.status(200).json(result)
};

export default apiHandler(handler);
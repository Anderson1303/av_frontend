import conn from '../../db';
import { apiHandler } from 'helpers/api';

const handler = async (req, res) => {
    const {program,patient} = req.body;
    const query = 'INSERT INTO program_patient(name_program,id_patient) VALUES($1,$2)';
    const values = [program,patient];
    const result = await conn.query(
        query,
        values
    );
    return res.status(200).json(result)
};

export default apiHandler(handler);
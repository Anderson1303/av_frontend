import conn from '../db';
import { apiHandler } from 'helpers/api';

const handler = async (req, res) => {
    const {dstart,dend,resourceId,patient_id} = req.body;
    const query = 'INSERT INTO events(dstart,dend,id_patient,id_type_event) VALUES($1,$2,$3,$4) RETURNING id'
    const values = [dstart,dend,patient_id,resourceId]
    const result = await conn.query(
        query,
        values
    );
    return res.status(200).json(result)
};

export default apiHandler(handler);
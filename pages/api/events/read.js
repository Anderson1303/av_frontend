import conn from '../db';
import { apiHandler } from 'helpers/api';

const getData = async ({date,typeEvent}) => {
    const query = `select eve.id,pat.name title,dstart start,dend end,tyev.id resourceId from events eve
        join patient pat
            on eve.id_patient = pat.id
        join type_events tyev
            on tyev.id = eve.id_type_event
        where to_char(dstart,'yyyy-mm-dd') = $1
        and tyev.name = $2`;
    const values = [date,typeEvent]
    return await conn.query(
        query,values
    );
}


const handler = async (req, res) => {
    const {date,typeEvent} = req.body;
    const result = await getData({date,typeEvent});
    return res.status(200).json({
        data: result.rows,
        success: true,
    });
};

export default apiHandler(handler);
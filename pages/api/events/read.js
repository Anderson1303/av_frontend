import conn from '../db';
import { apiHandler } from 'helpers/api';

const getData = async ({date,typeEvent}) => {
    const query = `select eve.id,pat.name title,dstart as start,dend as end,tyev.id resourceId,
        (CASE WHEN (select 1 from notification_events where id_event = eve.id) = 1 THEN
        1
        ELSE 
        0
        END) enviada
        from events eve
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
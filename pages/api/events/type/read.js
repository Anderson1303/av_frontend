import conn from '../../db';
import { apiHandler } from 'helpers/api';

const getData = async () => {
    const query = `select tyev.id, tyev.name_program from type_events tyev`;
    return await conn.query(
        query
    );
}

const getDataFilter = async (typeEvent) => {
    const query = `select tyev.id, tyev.name_program from type_events tyev
        where tyev.name = $1`;
    const values = [typeEvent]
    return await conn.query(
        query,values
    );
}

const handler = async (req, res) => {
    var result = null;
    if(req.method=="POST"){
        const {typeEvent} = req.body;
        result = await getDataFilter(typeEvent);
    }else{
        result = await getData();
    }
    return res.status(200).json({
        data: result.rows,
        success: true,
    });
};

export default apiHandler(handler);
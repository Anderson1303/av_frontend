import conn from '../../db';
import { apiHandler } from 'helpers/api';

const countRow = async () => {
    const query = 'select count(1) from program_patient';
    const result = await conn.query(
        query
    );
    return result.rows[0].count;
}

const getData = async({page,itemsPerPage}) => {
    const query = `SELECT prpa.id, pat.name patient, prpa.name_program, prpa.id_patient FROM program_patient prpa
                        join patient pat
                            on pat.id = prpa.id_patient
                            ORDER BY id LIMIT $1 OFFSET $2`;
    const values = [itemsPerPage,itemsPerPage*(page-1)]
    return await conn.query(
        query,
        values
    );
}

const countRowFilter = async ({filter}) => {
    const patientIds = filter.filter(pat => pat.property == "patientId").map(pat => {
        return pat.value;
    })
    const programIds = filter.filter(pro => pro.property == "programId").map(pro => {
        return pro.value;
    })
    filter.filter(pro => pro.property == "id").map(pro => {
        const ok = pro.value.split('_');
        patientIds.push(ok[1]);
        programIds.push(ok[0]);
        return pro;
    })
    patientIds.push(0);
    programIds.push('tests');
    const query = `select count(1) from program_patient  prpa
        where prpa.id_patient = ANY($1::int[])
        or prpa.name_program = ANY($2::varchar[])`;
    const values = [patientIds,programIds];
    const result = await conn.query(
        query,values
    );
    return result.rows[0].count;
}

const getDataFilter = async({page,itemsPerPage,filter}) => {
    const patientIds = filter.filter(pat => pat.property == "patientId").map(pat => {
        return pat.value;
    })
    const programIds = filter.filter(pro => pro.property == "programId").map(pro => {
        return pro.value;
    })

    filter.filter(pro => pro.property == "id").map(pro => {
        const ok = pro.value.split('_');
        patientIds.push(ok[1]);
        programIds.push(ok[0]);
        return pro;
    })
    patientIds.push(0);
    console.log(patientIds,'pat')
    programIds.push('tests');
    const query = `SELECT prpa.id, pat.name patient, prpa.id_patient, prpa.name_program FROM program_patient prpa
                        join patient pat
                            on pat.id = prpa.id_patient
                        where prpa.id_patient = ANY($1::int[])
                        or prpa.name_program = ANY($2::varchar[])
                        ORDER BY prpa.id LIMIT $3 OFFSET $4`;
    const values = [patientIds,programIds,itemsPerPage,itemsPerPage*(page-1)];
    return await conn.query(
        query,
        values
    );
}

const handler = async (req, res) => {
    const {page,itemsPerPage,filter} = JSON.parse(req.query.gridParams);
    var result = null;
    var totalRows = 0;
    if(filter.length == 0){
        result = await getData({page,itemsPerPage});
        totalRows = await countRow();
    }else{
        result = await getDataFilter({page,itemsPerPage,filter});
        totalRows = await countRowFilter({page,itemsPerPage,filter});
    }
    return res.status(200).json({
        data: result.rows,
        success: true,
        itemsPerPage,
        page,
        totalItems: totalRows,
        pagination: {
            totalItems: totalRows,
            page
        }
    });
};

export default apiHandler(handler);
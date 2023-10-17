import conn from '../db';
import { apiHandler } from 'helpers/api';

const countRow = async () => {
    const query = 'select count(1) from patient';
    const result = await conn.query(
        query
    );
    return result.rows[0].count;
}

const getData = async (gridParams) => {
    const {page,itemsPerPage} = gridParams;
    const query = 'select * from patient ORDER BY id LIMIT $1 OFFSET $2';
    const values = [itemsPerPage,itemsPerPage*(page-1)]
    return await conn.query(
        query,values
    );
}

const countRowFilter = async ({filter}) => {
    const patientIds = filter.filter(pat => pat.property == "idPatient").map(pat => {
        return pat.value;
    })
    var filterName = '';
    const ok = filter.filter(pat => pat.property == "name").map(pat => {
        filterName = pat.value;
        return pat.value;
    });
    patientIds.push(0);
    const query = `select count(1) from patient pat where upper(pat.name) like upper($1) or pat.id = ANY($2::int[])`;
    const values = [`%${filterName}%`,patientIds];
    const result = await conn.query(
        query,values
    );
    return result.rows[0].count;
}

const getDataFilter = async({page,itemsPerPage,filter}) => {
    const patientIds = filter.filter(pat => pat.property == "patientId").map(pat => {
        return pat.value;
    })
    var filterName = '';
    filter.filter(pat => pat.property == "name").map(pat => {
        filterName = pat.value;
        return pat.value;
    });
    patientIds.push(0);
    var query = '';
    var values = [];
    if(filterName.length > 0){
        query = `SELECT * FROM patient pat where upper(pat.name) like upper($1) or pat.id = ANY($2::int[]) ORDER BY id LIMIT $3 OFFSET $4`;
        values = [`%${filterName}%`,patientIds,itemsPerPage,itemsPerPage*(page-1)];
    }else{
        query = `SELECT * FROM patient pat where pat.id = ANY($1::int[]) ORDER BY id LIMIT $2 OFFSET $3`;
        values = [patientIds,itemsPerPage,itemsPerPage*(page-1)];
    }
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
        result = await getData({page,itemsPerPage,filter});
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
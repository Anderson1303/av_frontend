import conn from '../db';
import { apiHandler } from 'helpers/api';

const countRow = async (gridParams) => {
    const {filter} = gridParams;
    const filterName = filter.length > 0 ? filter[0].value : '';
    const query = `select count(1) from program where upper(name) != 'ANIVERSARIO' AND upper(name) like upper($1)`;
    const values = [filterName]
    const result = await conn.query(
        query,values
    );
    return result.rows[0].count;
}

const getData = async (gridParams) => {
    const {page,itemsPerPage,filter} = gridParams;
    const filterName = filter.length > 0 ? filter[0].value : '';
    const query = `select distinct name, name id from program where upper(name) != 'ANIVERSARIO' AND upper(name) like upper($1) ORDER BY id LIMIT $2 OFFSET $3`;
    const values = [`%${filterName}%`,itemsPerPage,itemsPerPage*(page-1)]
    return await conn.query(
        query,values
    );
}

const handler = async (req, res) => {
    const {page,itemsPerPage,filter} = JSON.parse(req.query.gridParams);
    var result = await getData({page,itemsPerPage,filter});

    const totalRows = await countRow({page,itemsPerPage,filter});
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
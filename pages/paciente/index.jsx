import { DataGrid } from "../../components/DataGrid";
import NewPatient from "../../components/Modal/Patient/NewPatient";
import SearchPatient from "../../components/Modal/Patient/SearchPatient";
import { api } from "../../services/api";
import { useState } from "react";

const teste = () => {
  const [open, setOpen] = useState({
    new: false,
    detail: false,
    search: false,
    update: false
  });
  const [rowSelection, setRowSelection] = useState();
  const [filterSearch, setFilterSearch] = useState([]);
  const [filterParams, setFilterParams] = useState([]);
  const endpoint = "patient/read";
  const fields = [{ field: "id", headerName: "ID", width: 100 },{ field: "name", headerName: "Nome", width: 200 }, { field: "cpf", headerName: "CPF", width: 200 }];

  const handleCreate = () => {
    setOpen((prevState) => ({ ...prevState, new: true }));
  };

  const handleSearch = (selection) => {
    setRowSelection(selection);
    setOpen((prevState) => ({ ...prevState, search: true }));
  };

  const handleClose = () => {
    setOpen({ new: false, detail: false, search: false, update: false });
  };
  
  return (
    <>
      <DataGrid
        createId="#PARAMETERCREATE"
        updateId="#PARAMETERUPDATE"
        api={api}
        endpoint={endpoint}
        columns={fields}
        rowsMap={(data) => data.map((item) => item)}
        handleCreate={handleCreate}
        handleSearch={handleSearch}
        checkboxSelection={true}
        filterSearch={filterSearch}
        filterParams={filterParams}
        isSelectionModel={true}
        filterColunms
      />
      <NewPatient
        onClose={handleClose}
        open={open.new}
        queryInvalidate="patient/read"
        onChangeFilterParams={event => setFilterParams(event)}
      />
      <SearchPatient
        onClose={handleClose}
        filterSearch={filterSearch}
        open={open.search}
        queryInvalidate="patient/read"
        onChangeFilterParams={event => setFilterParams(event)}
      />
    </>
  );
};

export default teste;

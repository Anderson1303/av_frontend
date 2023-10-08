import { DataGrid } from "../../../components/DataGrid";
import NewPatientProgram from "../../../components/Modal/Patient/Program/NewProgramPatient";
import SearchPatientProgram from "../../../components/Modal/Patient/Program/SearchProgramPatient";
import { api } from "../../../services/api";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";

const Pat = () => {
  const [filterParams, setFilterParams] = useState([]);
  const [open, setOpen] = useState({
    new: false,
    detail: false,
    search: false
  });
  const [rowSelection, setRowSelection] = useState();
  const endpoint = "patient/program/read";
  const { enqueueSnackbar } = useSnackbar();
  const fields = [{ field: "id", headerName: "ID", hasBeenResized: true },
  { field: "patient", headerName: "Paciente", hasBeenResized: true }, 
  { field: "name_program", headerName: "Nome do Programa", hasBeenResized: true },
  { field: "id_patient", headerName: "ID do Paciente", hasBeenResized: true },];

  const handleCreate = () => {
    setOpen((prevState) => ({ ...prevState, new: true }));
  };

  const handleSearch = (selection) => {
    setRowSelection(selection);
    setOpen((prevState) => ({ ...prevState, search: true }));
  };

  const handleDelete = async (selection) => {
    setRowSelection(selection);
    
    setFilterParams([{property: 'id', operator: '=', value: selection[0]}])


    try {
      await api.post('/patient/program/delete',{id: selection[0]});
      onClose();
      onChangeFilterParams([{property: 'name', operator: '=', value: e.name}]);
      enqueueSnackbar(
        "Vínculo excluido com Sucesso",
        { variant: "success" }
      );
    } catch (error) {
      enqueueSnackbar(
        `Ocorreu um erro: Não foi possivel excluir o vínculo` ?? "Internal Server Error",
        { variant: "error" }
      );
    }
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
        handleDelete={handleDelete}
        filterParams={filterParams}
        checkboxSelection={true}
        isSelectionModel={true}
        filterColunms
      />
      <NewPatientProgram
        onClose={handleClose}
        open={open.new}
        queryInvalidate={endpoint}
        onChangeFilterParams={event => setFilterParams(event)}
      />
      <SearchPatientProgram
        onClose={handleClose}
        open={open.search}
        queryInvalidate={endpoint}
        onChangeFilterParams={event => setFilterParams(event)}
      />
    </>
  );
};

export default Pat;
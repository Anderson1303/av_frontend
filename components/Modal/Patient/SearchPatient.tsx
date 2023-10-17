import { useEffect, useState } from "react";
import { Modal } from "..";
import { IFilterParams } from "../../../interfaces/IGridParams";
import { TypeOption } from "../../../interfaces/IOption";
import { api } from "../../../services/api";
import { ComboBox } from "../../ComboBox";
import { ComboBoxMultiple } from "../../ComboBoxMultiple";
import { Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { ButtonSearch } from "../../Button/ButtonSearch";
import { useSet } from "../../../structureState/useStateSet";

type SearchPatientProgramProps = {
    open: boolean;
    onClose: () => void;
    queryInvalidate: string;
    onChangeFilterParams: (event: IFilterParams[]) => void;
    filterSearch: IFilterParams[];
  }

const SearchPatient = ({open,onClose,onChangeFilterParams,filterSearch}: SearchPatientProgramProps) => {

    const { register,handleSubmit } = useForm();
    const dataSetPatient = useSet<string>();
    const endpointPatient = `/patient/read`;

    const dataMap = (data: any) => {
        return data.map((m: { [key: string]: any }) => ({
          value: m['id'],
          label: m['name'],
          type: m['type']
        }))
      }
    
    const labelMap = (option: TypeOption) => `${option.value} - ${option.label}`

    const onSubmit = () => {
        var filters = [];

        dataSetPatient.toArray().map(patientId => {
            filters.push({property: 'patientId', operator: '=', value: patientId});
        })
        onChangeFilterParams(filters);
        onClose();
    }

    const onSubmitClear = () => {
        dataSetPatient.current.clear();
        onChangeFilterParams([]);
        onClose();
    }

    return <Modal open={open} onClose={onClose} maxHeight={600}>
                <form onSubmit = {handleSubmit(onSubmit)}>
                    <Grid item xs={12} sm={6} sx={{mt: 2}}>
                        <ComboBoxMultiple inputProps={{label: 'Paciente', name: 'name'}} 
                            dataInit={[]}
                            dataSet={dataSetPatient}
                            multiple={true}
                            api={api} 
                            endpoint={endpointPatient}
                            dataMap={dataMap}  
                            labelMap={labelMap} />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Grid item xs={12} sm={6}>
                            <ButtonSearch onClick={handleSubmit(onSubmit)} sx={{ml: 25, mt: 2}}>Pesquisar</ButtonSearch>
                            <ButtonSearch onClick={handleSubmit(onSubmitClear)} sx={{ml: 25, mt: 2}}>Limpar</ButtonSearch>
                        </Grid>
                    </Grid>
                </form>
            </Modal>
}

export default SearchPatient;
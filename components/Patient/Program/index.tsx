import { Box, Grid, InputLabel } from "@mui/material"
import { ButtonAdd } from "../../Button/ButtonAdd";
import { useForm } from "react-hook-form";
import { api } from "../../../services/api";
import React, { useState } from "react";
import { ComboBox } from "../../ComboBox";
import { TypeOption } from "../../../interfaces/IOption";
import { enqueueSnackbar } from "notistack";

const NewPatientProgram = ({onClose,onChangeFilterParams}) => {

  const { register,handleSubmit } = useForm();
  const [program , setProgram] = useState(0);
  const [patient , setPatient] = useState(0);
  const endpointPatient = `/patient/read`;
  const endpointPatientProgram = `/program/read`;

  const newPatientProgram = async (param) => {
    await api.post('patient/program/new',param);
  }

  const onSubmit = async (e) => {
    try {
      await newPatientProgram({program,patient});
      onClose();
      enqueueSnackbar(
        "Vinculo realizado com Sucesso",
        { variant: "success" }
      );
      onChangeFilterParams([{property: 'id', operator: '=', value: `${program}_${patient}`}]);
    } catch (error) {
      enqueueSnackbar(
        `Ocorreu um erro: Verifique se o paciente ja está vinculado a esse Programa` ?? "Internal Server Error",
        { variant: "error" }
      );
    }
  };

  const dataMap = (data: any) => {
    return data.map((m: { [key: string]: any }) => ({
      value: m['id'],
      label: m['name'],
      type: m['type']
    }))
  }

  const labelMap = (option: TypeOption) => `${option.value} - ${option.label}`

    return  <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { ml: 5, mt: 2, width: 450},
      }}
      noValidate
      autoComplete="off"
  >
    <InputLabel sx={{ml: 5, mt: 2}}>Vinculo de Programa e Paciente</InputLabel>
    <form onSubmit = {handleSubmit(onSubmit)}>
      <Grid item xs={12} sm={6} sx={{mt: 2}}>
        <ComboBox inputProps={{label: 'Paciente', name: 'name_patient'}}
          getData={(val : any) => {setPatient(val.split(' - ')[0])}}  
          multiple={false} 
          api={api} 
          endpoint={endpointPatient}
          register={register}
          dataMap={dataMap}
          labelMap={labelMap} />
      </Grid>
      <Grid item xs={12} sm={6} sx={{mt: 3}}>
        <ComboBox inputProps={{label: 'Programa', name: 'name_program'}} 
          getData={(val : any) => {setProgram(val.split(' - ')[0])}} 
          multiple={false} 
          api={api} 
          endpoint={endpointPatientProgram}
          register={register}
          dataMap={dataMap}  
          labelMap={labelMap} />
      </Grid>
      
      <Grid item xs={12} sm={6}>
        <ButtonAdd onClick={handleSubmit(onSubmit)} sx={{ml: 25, mt: 2}}>Salvar</ButtonAdd>
      </Grid>
      </form>

  </Box>
}

export default NewPatientProgram;
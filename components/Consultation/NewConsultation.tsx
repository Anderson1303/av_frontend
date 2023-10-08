import { Box, Grid, InputLabel, TextField } from "@mui/material";
import { ButtonAdd } from "../Button/ButtonAdd";
import { useForm } from "react-hook-form";
import { api } from "../../services/api";
import { enqueueSnackbar } from "notistack";
import TextInput from "../TextInput";
import { ComboBoxMultiple } from "../ComboBoxMultiple";
import { TypeOption } from "../../interfaces/IOption";
import { useSet } from "../../structureState/useStateSet";
import { useEffect, useState } from "react";
import { ButtonSearch } from "../Button/ButtonSearch";
import moment from "moment";

export const NewConsultation = ({ onClose, onChangeFilterParams, params }) => {

  const { register,handleSubmit } = useForm();
  const dataSetPatient = useSet<string>();
  const endpointPatient = `/patient/read`;
  const [isSubmiting, setIsSubmiting] = useState(false);

  useEffect(() => {
    dataSetPatient.current.clear();
  },[]);

  const newConsultation = async () => {
    const dstart = moment(params.event.start).format('YYYY-MM-DD HH:mm');
    const dend = moment(params.event.end).format('YYYY-MM-DD HH:mm');
    const {resourceId} = params.event;
    const typeEvent = params.typeEvent;
    const patient_id = dataSetPatient.toArray()[0];
    const results = await api.post('events/new',{dstart,dend,resourceId,patient_id,typeEvent});
    const {data} = results;
    return data.rows.length > 0 ? data.rows[0].id : 0;
  }

  const getEvent = (name: string) => {
    if(name == 'consultation')
      return 'Consulta';
    if(name == 'birthday')
      return 'Aniversário';
    return ''
  }

  const dataMap = (data: any) => {
      return data.map((m: { [key: string]: any }) => ({
        value: m['id'],
        label: m['name'],
        type: m['type']
      }))
    }
  
  const labelMap = (option: TypeOption) => `${option.value} - ${option.label}`

  const onSubmit = async () => {
    if(dataSetPatient.current.size == 0){
      setIsSubmiting(true);
      return;
    }
    const {onConfirm} = params;
    const id = await newConsultation();
    onConfirm(id,'name teste');
    //...
    setIsSubmiting(true);
    onClose();
  }

  return <Box
    component="form"
    sx={{
      '& .MuiTextField-root': { ml: 5, mt: 2, width: 450 },
    }}
    noValidate
    autoComplete="off"
  >
    <InputLabel sx={{ ml: 5, mt: 2 }}>Cadastro de <b>{getEvent(params.event.resourceId)}</b></InputLabel>
    <form onSubmit = {handleSubmit(onSubmit)}>
      <Grid item xs={12} sm={6} sx={{mt: 2}}>
          <ComboBoxMultiple inputProps={{label: 'Paciente', name: 'name', required: true}} 
              dataInit={[]}
              dataSet={dataSetPatient}
              multiple={false}
              api={api} 
              endpoint={endpointPatient}
              dataMap={dataMap}
              labelMap={labelMap} />
          {dataSetPatient.current.size == 0 && isSubmiting && <span style={{color: 'red', fontSize: 11}}>Selecione no mínimo um Paciente</span>}
      </Grid>

      <Grid item xs={12} sm={6} sx={{mt: 2}}>
        <div>Consulta das {moment(params.event.start).format('HH:mm')} ás {moment(params.event.end).format('HH:mm')}</div>
      </Grid>

      <Grid item xs={12} sm={6}>
          <Grid item xs={12} sm={6}>
              <ButtonSearch style={{left: 0}} onClick={handleSubmit(onSubmit)} sx={{ml: 25, mt: 2}}>Salvar</ButtonSearch>
          </Grid>
      </Grid>
  </form>

  </Box>;
};

export default NewConsultation;
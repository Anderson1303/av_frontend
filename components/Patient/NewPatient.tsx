import { Box, Grid, InputLabel, TextField } from "@mui/material";
import { ButtonAdd } from "../Button/ButtonAdd";
import InputMask from "react-input-mask";
import { useForm } from "react-hook-form";
import { api } from "../../services/api";
import { enqueueSnackbar } from "notistack";
import TextInput from "../TextInput";

export const NewPatient = ({ onClose, onChangeFilterParams }) => {

  const { register, handleSubmit } = useForm();

  const newPatient = async (patient) => {
    return await api.post('patient/new', patient);
  };

  const onSubmit = async (e) => {
    try {
      const patient = await newPatient(e);
      console.log(patient.data,'lolll');
      const {rowCount, rows} = patient.data;
      onClose();
      if(rowCount == 1){
        onChangeFilterParams([{property: 'patientId', operator: '=', value: rows[0].id }]);
      }
      enqueueSnackbar(
        "Paciente cadastrado com Sucesso",
        { variant: "success" }
      );
    } catch (error) {
      enqueueSnackbar(
        `Ocorreu um erro: Verifique se o paciente ja está cadastrado` ?? "Internal Server Error",
        { variant: "error" }
      );
    }
  };

  return <Box
    component="form"
    sx={{
      '& .MuiTextField-root': { ml: 5, mt: 2, width: 450 },
    }}
    noValidate
    autoComplete="off"
  >
    <InputLabel sx={{ ml: 5, mt: 2 }}>Cadastro de Paciente</InputLabel>
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid item xs={12} sm={6}>
        <TextField
          id="outlined-error"
          label="Nome"
          name="name"
          required={true}
          {...register('name', { required: true })}
          defaultValue="" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextInput label={'Número de WhatsApp'} name='phone' register={register} mask={'(__) ____-____'} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextInput label={'CPF'} name='cpf' register={register} mask={'___.___.___-__'} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          name="birthday"
          type="date"
          required={true}
          {...register('birthday', { required: true })} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <ButtonAdd onClick={handleSubmit(onSubmit)} sx={{ ml: 25, mt: 2 }}>Salvar</ButtonAdd>
      </Grid>
    </form>

  </Box>;
};

export default NewPatient;
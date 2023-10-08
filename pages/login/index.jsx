import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {FormTextField} from '../../components/Forms/FormTextField';
import { userService } from 'services';
import { Button, Box } from '@mui/material';
import * as Yup from 'yup';

const Login = () => {
    const router = useRouter();

    useEffect(() => {
        if (userService.userValue) {
            router.push('/paciente');
        }
    }, []);

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('o Usuário é obrigatório'),
        password: Yup.string().required('a Senha é obrigatório')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, setError, formState, control } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit({ username, password }) {
        return userService.login(username, password)
            .then(() => {
                const returnUrl = router.query.returnUrl || '/paciente';
                router.push(returnUrl);
            })
            .catch(error => {
                setError('apiError', { message: error.message || error });
            });
    }

    return (
        <div className="col-md-6 offset-md-3 mt-5">
            <div className="card">
                <Box xs={12}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box sx={{pl: 100,pt: 50}}>
                            <Box sx={{pt: 2}} className="form-group">
                                <label>Usuário: </label> <br/>
                                <FormTextField inputProps={{name: 'username'}} register={register} control={control} name='username'{...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`}/>
                            </Box>
                            <Box sx={{pt: 2}}  className="form-group">
                                <label>Senha: </label> <br/>
                                <FormTextField inputProps={{name: 'password'}} register={register} control={control} name='password' {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`}/>
                            </Box>
                            <Box sx={{pt: 2, pl: 10}}  className="form-group">
                                <Button type='submit' disabled={formState.isSubmitting} className="btn btn-primary">{formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                    Entrar
                                </Button>
                            </Box>
                            {errors.apiError &&
                                <div className="alert alert-danger mt-3 mb-0">{errors.apiError?.message}</div>
                            }
                        </Box>
                    </form>
                </Box>
            </div>
        </div>
    );
}

export default Login;
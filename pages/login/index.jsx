import React, { Component } from 'react';
import { render } from 'react-dom';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userService } from 'services';
import { Button, Box } from '@mui/material';
import * as Yup from 'yup';
import { enqueueSnackbar } from "notistack";
import 'semantic-ui-css/semantic.min.css'

const App = () => {

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
                enqueueSnackbar(
                    `${error}`,
                    { variant: "error" }
                );
                setError('apiError', { message: error.message || error });
            });
    }

    return <div className="auth-background ui center aligned middle aligned grid">
        <div class="ui card column auth-form">
  <div class="content">
    <div class="header left aligned">Login</div>
    <div class="description">
       <form onSubmit={handleSubmit(onSubmit)} class="ui form">
       <div class="field">
            <Box className="form-group ui right corner labeled input">
                <div class="ui label label right corner"><i aria-hidden="true" class="user icon"></i></div>
                <input type="text" placeholder="Usuário" name='username' {...register('username')}/>
            </Box>
            <Box sx={{mt:1}} className="form-group ui right corner labeled input">
                <div class="ui label label right corner"><i aria-hidden="true" class="asterisk icon"></i></div>
                <input type="password" placeholder="Senha" name='password' {...register('password')}/>            
            </Box>
        </div>
            <Box className="form-group ui right corner labeled input">
                <Button type='submit' disabled={formState.isSubmitting} className="btn btn-primary">{formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                Entrar
                </Button>
            </Box>
    </form>
    </div>
  </div>
</div>
      </div>
}

export default App;
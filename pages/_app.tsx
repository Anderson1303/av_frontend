import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { CacheProvider, EmotionCache } from '@emotion/react';
import CloseIcon from "@mui/icons-material/Close";
import { CssBaseline, IconButton, ThemeProvider, Zoom } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AppProps } from 'next/app';
import { closeSnackbar, SnackbarProvider } from 'notistack';
import createEmotionCache from '../services/createEmotionCache';
import { queryClient } from '../services/queryClient';
import { theme } from '../styles/theme';

import 'styles/globals.css';
import { userService } from '../services';
import {NextUIProvider} from "@nextui-org/react";
import Nav from '../components/Nav';
import { api } from '../services/api';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp({ Component, emotionCache = clientSideEmotionCache, pageProps }: MyAppProps) {    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);
    const [users, setUsers] = useState(null);
    const [eventsType, setEventsType] = useState([]);

    useEffect(() => {
        // run auth check on initial load
        authCheck(router.asPath);

        // set authorized to false to hide page content while changing routes
        const hideContent = () => setAuthorized(false);
        router.events.on('routeChangeStart', hideContent);

        // run auth check on route change
        router.events.on('routeChangeComplete', authCheck)
        refreshEvents();
       
        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        }
    }, [router.isReady]);
    

    function authCheck(url) {
        // redirect to login page if accessing a private page and not logged in 
        const publicPaths = ['/login'];
        const path = url.split('?')[0];
        if (!userService.userValue && !publicPaths.includes(path)) {
            setAuthorized(false);
            router.push({
                pathname: '/login',
                query: { returnUrl: router.asPath,  }
            });
        } else {
            setAuthorized(true);
        }
    }

    const typeEvents = async () => {
        const results = api.get('events/type/read');
        return (await results).data.data;
    }

    const refreshEvents = async () => {
        const data = await typeEvents();
        setEventsType(data);
    }

    return (
            <QueryClientProvider client={queryClient}>
                <CacheProvider value={emotionCache}>
                    <ThemeProvider theme={theme}>
                    <NextUIProvider>
                        <Nav eventsType={eventsType}/>
                    </NextUIProvider>
                    <SnackbarProvider
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        preventDuplicate
                        disableWindowBlurListener
                        TransitionComponent={Zoom}
                        action={event => (
                        <IconButton size="small" onClick={() => closeSnackbar(event)}>
                            <CloseIcon fontSize="small" sx={{ color: theme => theme.palette.grey[100] }} />
                        </IconButton>
                        )}
                    >
                        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                        <CssBaseline />
                        <Component {...pageProps} />
                        <ReactQueryDevtools />
                    </SnackbarProvider>
                    </ThemeProvider>
                </CacheProvider>
            </QueryClientProvider>
    );
}

export default MyApp;
import axios, { AxiosError, AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next/types";
import { authHeader} from '../helpers/fetch-wrapper';

type RequestConfig = Omit<AxiosRequestConfig, 'headers'> & { headers: AxiosRequestHeaders }

export function setupAPI(
  baseURL: string,
  ctx?: GetServerSidePropsContext,
  req?: NextApiRequest,
  res?: NextApiResponse,
) {

  
  const api = axios.create({
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Authorization': authHeader('/api').Authorization,
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': 'GET,DELETE,PATCH,POST,PUT'
      },
    baseURL: baseURL ?? process.env.BASE_URL
  });

  api.interceptors.request.use(
    function (req) {
      return req;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  return api;
}


export const apiSSR = (
  ctx?: GetServerSidePropsContext,
  req?: NextApiRequest,
  res?: NextApiResponse
) => {
  return setupAPI(process.env.BASE_URL ?? "", ctx, req, res)
}

export const api = setupAPI('/api');
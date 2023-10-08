import axios, { AxiosError, AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next/types";
import { authHeader} from '../helpers/fetch-wrapper';
import {userService} from '../services/user.service';

type RequestConfig = Omit<AxiosRequestConfig, 'headers'> & { headers: AxiosRequestHeaders }

var unauthoraizedCount = 0;

export function setupAPI(
  baseURL: string,
  ctx?: GetServerSidePropsContext,
  req?: NextApiRequest,
  res?: NextApiResponse,
) {

  
  const api = axios.create({
    headers: authHeader('/api'),
    baseURL: baseURL ?? process.env.BASE_URL
  });

  api.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    unauthoraizedCount++;
      if(error.response.status == 401 && unauthoraizedCount == 2){
        userService.logout();
      }
    return Promise.reject(error);
  });

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
import { AxiosRequestConfig } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { apiSSR, setupAPI } from "../services/api";

type typeApi = 'POST' | 'PUT' | 'GET' | 'DELETE';

export async function configApi(
  req: NextApiRequest,
  res: NextApiResponse,
  type: typeApi,
  endpoint: string,
  option?: {
    config?: AxiosRequestConfig<any> | undefined,
    baseUrl?: string,
    body?: object,
  }
) {
  try {
    const api = !!option?.baseUrl
    ? setupAPI(option?.baseUrl, undefined, req, res)
    : apiSSR(undefined, req, res);

    switch (type) {
      case 'POST':
        const post = await api.post(endpoint, option?.body ?? req.body, option?.config);
        return res.status(post.status).json(post.data);

      case 'PUT':
        const put = await api.put(endpoint, option?.body ?? req.body, option?.config);
        return res.status(put.status).json(put.data);

      case 'GET':
        const get = await api.get(endpoint, option?.config);
        return res.status(get.status).json(get.data);

      case 'DELETE':
        const del = await api.delete(endpoint, option?.config);
        return res.status(del.status).json(del.data);

      default:
        return res.status(405).end('Method not allowed');
    }
  } catch (error: any) {
    return res.status(error.response?.status ?? 500)
      .json({
        error: {
          status: error.response?.status ?? 500,
          message: error.response?.statusText ?? 'Internal Server Error'
        }
      });
  }
}
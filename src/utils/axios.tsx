import axiosDefault , { AxiosRequestConfig }  from 'axios';
import qs from 'qs';

import {
    serializeToCamelCase,
    serializeToSnakeCase,
} from './serializers';

let userToken: string|any = null;

const config : AxiosRequestConfig  = {
    headers: {
        'Content-Type': 'application/json',
    },
    transformResponse: [
        (data : any ) : any  => {
            // Parse json, if json is incorrect return data without parsing it
            // That's because error thrown by json parser doesn't contain status code which is needed in the interceptor
            try {
                return data ? serializeToCamelCase(JSON.parse(data)) : data;
            } catch {
                return data;
            }
        },
    ],
    transformRequest: [
        (data : any ) : any  => {
            return data ? JSON.stringify(serializeToSnakeCase(data)) : data;
        },
    ],
    paramsSerializer: (params : any ) =>
        qs.stringify(serializeToSnakeCase(params)),
};

const baseURL = process.env.REACT_APP_API_URL as string ;

const axios = axiosDefault.create({
    ...config,
    baseURL,
});

axios.interceptors.request.use(
    (config)=>{
        if(config.headers && userToken !== null){
            config.headers['Authorization'] = `Bearer ${userToken}`;
            
            return config;
        }
    }, (error)=> error,
)

export const setUserToken = (token:any):any=>{
    userToken = token;
}

export { axios };
 export type { AxiosResponse } from 'axios'; 

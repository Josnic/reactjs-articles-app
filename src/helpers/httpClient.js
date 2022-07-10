import axios from 'axios';
import { useSelector } from 'react-redux';

const API = axios.create({
    baseURL: process.env.REACT_APP_API_GATEWAY_URL,
    timeout: 4000,
    headers: {'accept': 'application/json'}
})

axios.interceptors.request.use(request => {

    const authState = useSelector((state) => state);

    if (authState.isAuthenticated && authState.token !== ""){
        request.headers.common.Authorization = `Bearer ${authState.token}`;
    }
    return request;
});

const errorHandler = (error) => {
    if (error.response){
        return {
            type: "response",
            error: error.response
        }
    }else if (error.request){
        return {
            type: "request",
            error: error.request
        }
    }else{
        return {
            type: "unknown",
            error: error.message
        }
    }
}

export default {
    post: async (path, payload) => {
        try{
            return await API.post(path, payload);
        }catch(e){
            return {
                data: errorHandler(e),
                error: true
            }
        }
        
    },
    get: async (path) => {
        try{
            return await API.get(path);
        }catch(e){
            return {
                data: errorHandler(e),
                error: true
            }
        }
    }
}
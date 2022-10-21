import { axiosInstance } from "./AxiosInterceptor"

class WebServices{

    getAllPosts(): Promise<any>
    {
        return axiosInstance.get('/posts');
    }

    getSpecificPosts(id:number):Promise<any>
    {
        return axiosInstance.get(`/posts/${id}`);
    }

    
}

export default new WebServices()
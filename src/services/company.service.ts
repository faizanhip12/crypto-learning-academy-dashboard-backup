import requests from 'src/services/httpService';
import axios, { AxiosResponse, AxiosRequestHeaders } from 'axios'

const Services = {
  // getAll(): Promise<AxiosResponse> {
  //   return requests.get('/client');
  // },
  // getById(id: string): Promise<AxiosResponse> {
  //   return requests.get(`/client/${id}`);
  // },
  add(body: any, headers: AxiosRequestHeaders): Promise<AxiosResponse> {
    // return axios.post('https://qac-plus.herokuapp.com/api/v1/company', body, {
    return axios.post('http://localhost:5000/api/v1/company', body, {
      headers
    });
  },
  // update(id: string, body: any): Promise<AxiosResponse> {
  //   return requests.put(`/client/${id}`, body);
  // },
  // delete(id: string): Promise<AxiosResponse> {
  //   return requests.delete(`/client/${id}`);
  // },
};

export default Services;

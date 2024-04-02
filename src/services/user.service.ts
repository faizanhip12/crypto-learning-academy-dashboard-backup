import { AxiosResponse } from 'axios'

import requests from 'src/services/httpService';
import { GetParams } from 'src/services/service'

const Services = {
  getAll({ query }: GetParams): Promise<AxiosResponse> {
    return requests.get(`/auth/users?${query}`);
  },
  getById(id: string): Promise<AxiosResponse> {
    return requests.get(`/auth/users/${id}`);
  },
  add(body: any): Promise<AxiosResponse> {
    return requests.post('/auth/users', body);
  },
  update(id: string, body: any): Promise<AxiosResponse> {
    return requests.put(`/auth/users/${id}`, body);
  },
  delete(id: string): Promise<AxiosResponse> {
    return requests.delete(`/auth/users/${id}`);
  },
};

export default Services;

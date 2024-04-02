import axios, { AxiosResponse } from 'axios'
import requests from './httpService'

const Services = {
  file(body: any): Promise<AxiosResponse<any, any>> {
    return requests.post(`file`, body)
  },
  fileUploadOnCloudinary(formData: any): Promise<AxiosResponse<any, any>> {
    return axios({
      url: `${requests.getUri()}/file`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: formData
    })
  }
}

export default Services

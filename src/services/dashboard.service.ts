import requests from 'src/services/httpService'
import { AxiosResponse } from 'axios'

const Services = {
  getAllMonths(): Promise<AxiosResponse> {
    return requests.get(`/auth/student?filter=month`)
  },
  getAllSalesWeekly(): Promise<AxiosResponse> {
    return requests.get(`/invoice/admin/weekly`)
  },
  getAllSalesMonthly(): Promise<AxiosResponse> {
    return requests.get(`/invoice/admin/monthly`)
  },
  getAllGraphicalRepresentation(): Promise<AxiosResponse> {
    return requests.get(`/auth/subsribe/yearly`)
  },
  getAllWeeks(): Promise<AxiosResponse> {
    return requests.get(`/auth/student`)
  },
  getAllTopInstructors(): Promise<AxiosResponse> {
    return requests.get(`/auth/top-teachers`)
  },
  getAllEnrollmentInWeeks(): Promise<AxiosResponse> {
    return requests.get(`auth/subsribe/weekly`)
  },
  getAllEnrollmentInMonths(): Promise<AxiosResponse> {
    return requests.get(`auth/subsribe/monthly`)
  },
  getAllDashboardsData(): Promise<AxiosResponse> {
    return requests.get(`auth/dashboard`)
  },
  getById(id: string): Promise<AxiosResponse> {
    return requests.get(`auth/users/${id}`)
  },
  getStudent(id: string): Promise<AxiosResponse> {
    return requests.get(`auth/users/${id}`)
  },
  add(body: any): Promise<AxiosResponse> {
    return requests.post('auth/user', body)
  },
  update(id: string, body: any): Promise<AxiosResponse> {
    return requests.put(`auth/users/${id}`, body)
  },
  delete(id: string): Promise<AxiosResponse> {
    return requests.delete(`auth/users/${id}`)
  }
}

export default Services

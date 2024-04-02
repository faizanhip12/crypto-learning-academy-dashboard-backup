export interface ITeacher {
  [key: string]: any
  first_name?: string
  last_name?: string
  country?: string
  email_status?: string
  phone?: number | string
  user: {
    first_name?: string
    last_name?: string
    profile_picture: string
  }
  subscription?: {
    title?: string
    price?: number
  }
  status?: string
}

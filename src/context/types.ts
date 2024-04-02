import { IChannels } from 'src/types/apps/channels'
import { IUser } from 'src/types/apps/user'

export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  email: string
  password: string
}

export type ChannelParams = {
  id: number
}

export type ResetPasswordParams = {
  password: string
}

export type RegisterParams = {
  email: string
  username: string
  password: string
  role: 'TEACHER' | 'STUDENT'
}

export type UserDataType = {
  id: string | number
  gender?: string
  role: { id: string; code: "STUDENT" | "TEACHER" | "SUPER_ADMIN" }
  email: string
  fullName: string
  first_name?: string
  last_name?: string
  username: string
  password: string
  avatar?: string | null
  user?: any
  profile_picture: string | null | any
  activeChannel: {
    channel: IChannels
  }
  logedAt: Date | undefined
  invoices?: []
  isSubscribed?: boolean
}

export type AuthValuesType = {
  loading: boolean
  setLoading: (value: boolean) => void
  logout: () => void
  isInitialized: boolean
  user: UserDataType | null
  setUser: (value: UserDataType | null) => void
  setIsInitialized: (value: boolean) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
  handleSwitchChannel: (params: number | any, errorCallback?: ErrCallbackType) => void
  register: (params: RegisterParams, query?: any, errorCallback?: ErrCallbackType) => void
  createAccount: (body: ISignupFormValues, errorCallback?: ErrCallbackType) => void
  profileUpdate: (id: string, body: IUser, errorCallback?: ErrCallbackType) => void
  changeCredentials: (body: IUser, errorCallback?: ErrCallbackType) => void
  createCompany: (body: ICompanyFormValues, errorCallback?: ErrCallbackType) => void
  forgotPassword: (body: ICompanyFormValues) => void
  resetPassword: (body: ResetPasswordParams, token: string, errorCallback?: ErrCallbackType) => void
  // Signup related
  activeStep: number
  steps: { title: string; subtitle: string }[]
  handleBack: () => void
  handleNext: () => void
  handleReset: () => void

  // API status
  status: 'idle' | 'pending' | 'success' | 'error'
}

export type PusherValuesType = {
  message: any
  setMessage?: any
}

export type ChannelIdType = {
  channelId: any
  setChannelId?: any
}

export interface ISignupFormValues {
  first_name: string
  last_name: string
  email: string
  password: string
  confirm_password?: string
  // gender: string;
  API_ERROR?: {}
}

export interface ICompanyFormValues {
  name: string
  email: string
  address: string
  API_ERROR?: {}
}

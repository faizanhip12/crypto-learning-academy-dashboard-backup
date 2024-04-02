export interface IReview {
  [key: string]: any
  user: {
    first_name?: string
    last_name?: string
    profile_picture: string
    id?: string
  }
  playlist?: {
    channel?: {
      name?: string
      slug?: string
    }
    name?: string
  }
  reviews?: any
  description?: string
  profile_picture: string
}

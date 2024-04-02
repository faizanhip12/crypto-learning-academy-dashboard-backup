export interface CommunityAPI {
  user: {
    profile_picture: string
    first_name?: string
    last_name?: string
    email?: string
  }
  feeds?: {
    user?: {
      profile_picture?: string
      id?: string
      first_name?: string
      last_name?: string
    }
    userId?: string
    id?: string
    createdAt?: string
    content?: string
    image?: string
    isLiked?: boolean
    likes_count?: any
  }
}

export interface ICommunityFeed extends CommunityAPI {
  [key: string]: any
}

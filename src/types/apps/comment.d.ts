export interface CommentAPI {
  user: {
    profile_picture: string
    first_name?: string
    last_name?: string
    email?: string
  }
  comment?: string
  userId?: string
  isLiked?: boolean
  likes_count?: any
  showReply?: any
  replies: any
}

export interface IComment extends CommentAPI {
  [key: string]: any
}

export interface PlaylistApi {
  isEnrolled: boolean
  channelId?: string
  thumbnail?: string
  name?: any
  id?: string
  videos?: [] | any
}

export interface IPlaylist extends PlaylistApi {
  [key: string]: any
}

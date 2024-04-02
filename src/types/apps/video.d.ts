import { IChannels } from './channels'

export interface IVideo {
  [key: string]: any
  name: any
  title: string
  channel: IChannels
  channelId: string
  thumbnail_url?: string
  startAt?: any
  id?: string
  status?: 'UPLOADED' | 'WAITING_FOR_LIVE' | 'IS_LIVED'
  file?: {
    public_source_url?: string
  }
}

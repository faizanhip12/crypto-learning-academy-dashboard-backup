import { ReactNode, createContext, useEffect, useState } from 'react'
import Pusher from 'pusher-js'
import { PusherValuesType, ChannelIdType } from './types'

const defaultProvider: PusherValuesType = {
  message: null,
  setMessage: () => null
}

export const PusherContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

export const PusherProvider = ({ children }: Props) => {
  const [message, setMessage] = useState<PusherValuesType['message']>('idle')
  const [channelId, setChannelId] = useState<ChannelIdType['channelId']>('')

  // console.log(channelId)
  const pusher = new Pusher('80cd3aa7f3d3d0f9b278', {
    cluster: 'mt1',
    // @ts-ignore
    useTLS: true
    // add any other options here, such as encrypted: true
  })
  useEffect(() => {
    const channel = pusher.subscribe('my-channel')
    channel.bind('my-event', (data: { message: any }) => {
      setMessage(data.message)
    })

    // cleanup function to unsubscribe from the channel
    return () => {
      channel.unbind_all()
      channel.unsubscribe()
    }
  }, [])

  const values = {
    message,
    setChannelId,
    pusher
  }

  return <PusherContext.Provider value={values}>{children}</PusherContext.Provider>
}

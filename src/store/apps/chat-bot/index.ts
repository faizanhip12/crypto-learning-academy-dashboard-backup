import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import chatbotServices, { createEventSource } from 'src/services/chat-bot.service'

interface IChat {
  id?: string
  message: string
  createdAt?: Date
  type: 'sender' | 'receiver'
}

interface InitialState {
  entities: IChat[]
  loading: boolean
  entity: {
    message: string
    createdAt: Date
  } | null
}

// Api Error
const ApiError = (error: any, rejectWithValue: (reasaon: string) => void) => {
  toast.error(error?.response ? error.response.data.message : 'Something Went Wrong')
  return rejectWithValue(error.response.data.message || 'Something Went Wrong')
}

export const getAllMessagesList = createAsyncThunk('fetch-messages', async (_: any, { rejectWithValue }) => {
  try {
    const response = await chatbotServices.getAll()
    return response.data
  } catch (error) {
    return ApiError(error, rejectWithValue)
  }
})

export const chatBotSlice = createSlice({
  name: 'chatBotSlice',
  initialState: {
    entities: [],
    entity: null,
    loading: false
  } as InitialState,
  reducers: {
    addEntity: (state, action) => {
      state.entities.push({ ...action.payload, createdAt: new Date() })
    },
    setEntity(state, action) {
      const { type, message } = action.payload

      if (type === 'APPEND_MESSAGE') {
        if (state.entity) {
          state.entity.message = `${state.entity.message} ${message}`
        } else {
          state.entity = {
            message: message,
            createdAt: new Date()
          }
        }
      } else if (type === 'FINISH_MESSAGE') {
        state.entities.push({
          message: state.entity!.message,
          type: 'receiver',
          createdAt: state.entity!.createdAt
        })
        state.entity = null
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(getAllMessagesList.fulfilled, (state, action) => {
      const { data } = action.payload
      state.entities = data.messages || []
    })
  }
})

const { addEntity, setLoading, setEntity } = chatBotSlice.actions

export const sendPrompt = createAsyncThunk(
  'send-prompt',
  async ({ prompt, userId }: { prompt: any; userId: string }, { dispatch }) => {
    try {
      dispatch(addEntity({ type: 'sender', message: prompt }))
      dispatch(setEntity({ message: '', type: 'APPEND_MESSAGE' }))

      createEventSource({
        url: `ask?prompt=${prompt}&userId=${userId}`,
        onMessage: (event, request) => {
          let { data } = event
          data = JSON.parse(data)
          const { content } = data
          const message = content.content ? content.content : ''

          if (data.finish_reason) {
            request.close()
            dispatch(setEntity({ message, type: 'FINISH_MESSAGE' }))
          } else {
            dispatch(setEntity({ message, type: 'APPEND_MESSAGE' }))
          }
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
)

export { addEntity, setLoading }

export default chatBotSlice.reducer

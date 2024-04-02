// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

// ** Employee Service Imports
import { VideoService, playlistService } from 'src/services'

// ** Types Imports
import { IVideo } from 'src/types/apps/video'
import { videoSDKService } from 'src/services'

export interface DataParams {
  query?: string | any
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
  rejectWithValue: any
}

interface InitialState {
  entities: IVideo[] | []
  allVideosOfCurrentChannel: IVideo[] | []
  entity: IVideo | {} | any
  videoForLikes: IVideo | {} | any
  trackVideo: any
  total: number
  params: DataParams
  status: 'pending' | 'error' | 'success' | 'idle'
}

// Api Error
const ApiError = (error: any, dispatch: any, rejectWithValue: (reasaon: string) => void) => {
  dispatch(Slice.actions.handleStatus('error'))
  toast.error(error?.response ? error.response.data.message : 'Something Went Wrong')
  return rejectWithValue(error.response.data.message || 'Something Went Wrong')
}

export const QueryAction = createAsyncThunk('video/query', async (query: string, { dispatch }: Redux) => {
  dispatch(Slice.actions.handleQuery(query))
  return query
})

export const fetchOneAction = createAsyncThunk(
  'video/fetchOne',
  async ({ id, playlistId }: any, { dispatch, rejectWithValue }) => {
    try {
      dispatch(Slice.actions.handleStatus('pending'))
      const response = await VideoService.getById(id, playlistId)
      dispatch(Slice.actions.handleStatus('success'))
      return response.data
    } catch (error) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

export const createLiveVideoEventAction = createAsyncThunk(
  'video/createLiveVideoEvent',
  async (data: any, { dispatch, rejectWithValue }) => {
    try {
      dispatch(Slice.actions.handleStatus('pending'))
      const response = await VideoService.createLiveVideoEvent(data)
      dispatch(Slice.actions.handleStatus('success'))
      toast.success('Created Successfully')
      return response.data
    } catch (error) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

export const addLikesOnVideo = createAsyncThunk(
  'video/addLikesOnVideo',
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await VideoService.getLikeStatus(id)
      return response.data
    } catch (error) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

export const addSaveFlagOnVideo = createAsyncThunk(
  'video/addSaveFlagOnVideo',
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await VideoService.getSaveStatus(id)
      return response.data
    } catch (error) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

export const startVideoStreamingAction = createAsyncThunk(
  'video/startVideoStreaming',
  async ({ id, playlistId }: { id: string, playlistId: string }, { dispatch, rejectWithValue }: Redux) => {
    try {
      dispatch(Slice.actions.handleStatus('pending'))
      const { room } = await videoSDKService.createMeeting()
      const body = { status: 'IS_LIVED', roomId: room.roomId } // { status: "WAITING_FOR_LIVE", roomId: "" } // { status: "IS_LIVED", roomId: room.roomId }
      const response = await VideoService.updateVideo(id, body)
      dispatch(fetchOneAction({ id, playlistId }))
      dispatch(Slice.actions.handleStatus('success'))
      return response.data
    } catch (error) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

export const fetchOneActionByPlaylistId = createAsyncThunk(
  'playlistVideo/fetchOne',
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(Slice.actions.handleStatus('pending'))
      const response = await VideoService.getByPlaylistId(id)
      dispatch(Slice.actions.handleStatus('success'))
      return response.data
    } catch (error) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

export const fetchAllVideosOfCurrentChannel = createAsyncThunk(
  'channels/fetchAllVideosOfCurrentChannel',
  async (params: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(Slice.actions.handleStatus('pending'))
      const response = await VideoService.getAllByPlaylistId(params)
      dispatch(Slice.actions.handleStatus('success'))
      return response.data
    } catch (error: any) {
      return ApiError(error, dispatch, rejectWithValue)
      // dispatch(Slice.actions.handleStatus('error'))
      // return rejectWithValue(error.response.data.message || 'Something Went Wrong')
    }
  }
)

export const fetchAllAction: AsyncThunk<any, DataParams, {}> = createAsyncThunk(
  'video/fetchAll',
  async (params: DataParams, { dispatch, rejectWithValue }: Redux) => {
    try {
      dispatch(Slice.actions.handleStatus('pending'))
      const { query } = params
      const response = await VideoService.getAllByChannel(query)
      dispatch(Slice.actions.handleStatus('success'))
      return response.data
    } catch (error) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

export const fetchAllLikedVideosAction = createAsyncThunk(
  'video/fetchAllLikedVideos',
  async (params: DataParams, { dispatch, rejectWithValue }: Redux) => {
    try {
      dispatch(Slice.actions.handleStatus('pending'))
      const response = await VideoService.getAllLikedVideos()
      dispatch(Slice.actions.handleStatus('success'))
      return response.data
    } catch (error) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

export const fetchAllSavedVideosAction = createAsyncThunk(
  'video/fetchAllSavedVideos',
  async (params: DataParams, { getState, dispatch, rejectWithValue }: Redux) => {
    try {
      dispatch(Slice.actions.handleStatus('pending'))
      const response = await VideoService.getAllSavedVideos()
      dispatch(Slice.actions.handleStatus('success'))
      return response.data
    } catch (error) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

export const fetchAllByPlaylist = createAsyncThunk(
  'video/fetchAllByPlaylistId',
  async (params: DataParams, { getState, dispatch, rejectWithValue }: Redux) => {
    try {
      dispatch(Slice.actions.handleStatus('pending'))
      const { query } = params
      const response = await VideoService.getAllByPlaylistId(query)
      dispatch(Slice.actions.handleStatus('success'))
      return response.data
    } catch (error) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

export const addAction = createAsyncThunk(
  'video/add',
  async (data: { [key: string]: number | string }, { getState, dispatch, rejectWithValue }: Redux) => {
    try {
      dispatch(Slice.actions.handleStatus('pending'))
      const response = await VideoService.add(data)
      const query = getState().video.params.query
      dispatch(fetchAllAction({ query }))
      toast.success('Added succesfully!')
      dispatch(Slice.actions.handleStatus('success'))
      return response.data
    } catch (error: any) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

export const updateAction = createAsyncThunk(
  'video/update',
  async ({ id, data }: { id: string; data: IVideo }, { getState, dispatch, rejectWithValue }: Redux) => {
    try {
      dispatch(Slice.actions.handleStatus('pending'))
      const response = await VideoService.update(id, data)
      const query = getState().video.params.query
      dispatch(fetchAllAction({ query }))
      toast.success('updated succesfully!')
      dispatch(Slice.actions.handleStatus('success'))
      return response.data
    } catch (error: any) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

export const deleteAction = createAsyncThunk(
  'video/delete',
  async (id: string, { dispatch, rejectWithValue }: Redux) => {
    try {
      dispatch(Slice.actions.handleStatus('pending'))
      const response = await VideoService.delete(id)
      toast.success('deleted succesfully!')
      dispatch(Slice.actions.handleStatus('success'))
      return response.data
    } catch (error: any) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

export const Slice = createSlice({
  name: 'video',
  initialState: {
    entities: [],
    allVideosOfCurrentChannel: [],
    entity: {},
    videoForLikes: {},
    total: 0,
    trackVideo: 0,
    params: {},
    status: 'idle'
  } as InitialState,
  reducers: {
    handleStatus: (state, action) => {
      state.status = action.payload
    },
    handleQuery: (state, action) => {
      state.params.query = action.payload
    },
    handleTrackingVideo: (state, action) => {
      state.trackVideo = action.payload
    },
    emptyVideo: state => {
      return { ...state, entity: {} }
    },
    emptyVideosOfCurrentChannel: state => {
      state.allVideosOfCurrentChannel = []
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchAllAction.fulfilled, (state, action) => {
      const { data } = action.payload
      state.entities = data?.videos || []
      state.total = data.videos?.length || 0
    })
    builder.addCase(fetchAllVideosOfCurrentChannel?.fulfilled, (state, action) => {
      const { data } = action.payload
      state.allVideosOfCurrentChannel = data.videos || []
    })
    builder.addCase(fetchAllByPlaylist.fulfilled, (state, action) => {
      const { data } = action.payload
      state.entities = data?.videos || []
      state.total = data.videos?.length || 0
    })
    builder.addCase(fetchAllLikedVideosAction.fulfilled, (state, action) => {
      const { data } = action.payload
      state.entities = data?.entities || []
      state.total = data.entities?.length || 0
    })
    builder.addCase(fetchAllSavedVideosAction.fulfilled, (state, action) => {
      const { data } = action.payload
      state.entities = data?.entities || []
      state.total = data.entities?.length || 0
    })

    builder.addCase(fetchOneAction.fulfilled, (state, action) => {
      const { data } = action.payload
      state.videoForLikes = data.video || {}
      state.entity = data.video || {}
    })
    builder.addCase(addLikesOnVideo.fulfilled, (state, action) => {
      const { data } = action.payload
      state.videoForLikes = data?.video || {}
    })
    builder.addCase(addSaveFlagOnVideo.fulfilled, (state, action) => {
      const { data } = action.payload
      state.videoForLikes = data?.video || {}
    })
    builder.addCase(fetchOneActionByPlaylistId.fulfilled, (state, action) => {
      const { data } = action.payload
      state.entity = data.entity || {}
    })
    builder.addCase(deleteAction.fulfilled, (state, action) => {
      const { data } = action.payload
      state.entities = state?.entities?.filter(item => item?.id !== data?.entity?.id)
    })
  }
})

export const { emptyVideo, emptyVideosOfCurrentChannel } = Slice.actions
export default Slice.reducer

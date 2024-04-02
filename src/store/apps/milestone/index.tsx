import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import { milestoneService } from 'src/services'
import { IMilestone } from 'src/types/apps/milestone'

export interface DataParams {
  query?: string
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
  rejectWithValue: any
}

interface InitialState {
  entities: IMilestone[] | []
  entity: IMilestone | null
  params: DataParams
  status: 'pending' | 'error' | 'success' | 'idle'
}

// Api Error
const ApiError = (error: any, dispatch: any, rejectWithValue: (reasaon: string) => void) => {
  dispatch(Slice.actions.handleStatus('error'))
  toast.error(error?.response ? error.response.data.message : 'Something Went Wrong')
  return rejectWithValue(error.response.data.message || 'Something Went Wrong')
}

export const QueryAction = createAsyncThunk('milestones/query', async (query: string, { dispatch }: Redux) => {
  dispatch(Slice.actions.handleQuery(query))
  return query
})

export const fetchOneAction = createAsyncThunk(
  'milestones/fetchOne',
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(Slice.actions.handleStatus('pending'))
      const response = await milestoneService.getById(id)
      dispatch(Slice.actions.handleStatus('success'))
      return response.data
    } catch (error) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

export const fetchAllAction = createAsyncThunk(
  'milestones/fetchAll',
  async (params: DataParams, { dispatch, rejectWithValue }: Redux) => {
    try {
      dispatch(Slice.actions.handleStatus('pending'))
      const { query } = params
      const response = await milestoneService.getAll()
      dispatch(Slice.actions.handleStatus('success'))
      return response.data
    } catch (error) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

export const addAction = createAsyncThunk(
  'milestones/add',
  async (data: IMilestone, { getState, dispatch, rejectWithValue }: Redux) => {
    try {
      dispatch(Slice.actions.handleStatus('pending'))
      const response = await milestoneService.add(data)
      const query = getState().points.params.query
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
  'milestones/update',
  async ({ id, data }: { id: string; data: IMilestone }, { getState, dispatch, rejectWithValue }: Redux) => {
    try {
      dispatch(Slice.actions.handleStatus('pending'))
      const response = await milestoneService.update(id, data)
      const query = getState().points.params.query
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
  'milestones/delete',
  async (id: string, { getState, dispatch, rejectWithValue }: Redux) => {
    try {
      dispatch(Slice.actions.handleStatus('pending'))
      const response = await milestoneService.delete(id)
      const query = getState().points.params.query
      dispatch(fetchAllAction({ query }))
      toast.success('deleted succesfully!')
      dispatch(Slice.actions.handleStatus('success'))
      return response.data
    } catch (error: any) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

export const Slice = createSlice({
  name: 'milestones',
  initialState: {
    entities: [],
    entity: {},
    params: {}
  } as InitialState,
  reducers: {
    handleStatus: (state, action) => {
      state.status = action.payload
    },
    handleQuery: (state, action) => {
      state.params.query = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchAllAction.fulfilled, (state, action) => {
      const { data } = action.payload
      state.entities = data.entities || []
    })
    builder.addCase(fetchOneAction.fulfilled, (state, action) => {
      const { data } = action.payload
      state.entity = data.entity || null
    })
  }
})

export default Slice.reducer

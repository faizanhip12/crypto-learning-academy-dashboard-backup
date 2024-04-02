// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

// ** Employee Service Imports
import { StudentService } from 'src/services'

// ** Types Imports
import { IStudents } from 'src/types/apps/student'
import StudentsTable from 'src/@core/components/apps/students/components/Table'

export interface DataParams {
  query?: string
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
  rejectWithValue: any
}

interface InitialState {
  entities: IStudents[] | []
  points: IStudents[] | []
  entity: IStudents | {} | any
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

export const QueryAction = createAsyncThunk('students/query', async (query: string, { dispatch }: Redux) => {
  dispatch(Slice.actions.handleQuery(query))
  return query
})

export const fetchOneAction = createAsyncThunk(
  'students/fetchOne',
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(Slice.actions.handleStatus('pending'))
      const response = await StudentService.getById(id)
      dispatch(Slice.actions.handleStatus('success'))
      return response.data
    } catch (error) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

export const fetchAllAction = createAsyncThunk(
  'students/fetchAll',
  async (params: DataParams, { dispatch, rejectWithValue }: Redux) => {
    try {
      dispatch(Slice.actions.handleStatus('pending'))
      const { query } = params
      const response = await StudentService.getAll({ query })
      dispatch(Slice.actions.handleStatus('success'))
      return response.data
    } catch (error) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

export const fetchAllActionPoints = createAsyncThunk(
  'students/points',
  async (params: DataParams, { dispatch, rejectWithValue }: Redux) => {
    try {
      dispatch(Slice.actions.handleStatus('pending'))
      const { query } = params
      const response = await StudentService.getAllPoints({ query })
      dispatch(Slice.actions.handleStatus('success'))
      return response.data
    } catch (error) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

export const addAction = createAsyncThunk(
  'students/add',
  async (data: { [key: string]: number | string }, { getState, dispatch, rejectWithValue }: Redux) => {
    try {
      dispatch(Slice.actions.handleStatus('pending'))
      const response = await StudentService.add(data)
      const query = getState().students.params.query
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
  'students/update',
  async ({ id, data }: { id: string; data: IStudents }, { getState, dispatch, rejectWithValue }: Redux) => {
    try {
      dispatch(Slice.actions.handleStatus('pending'))
      const response = await StudentService.update(id, data)
      const query = getState().students.params.query
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
  'students/delete',
  async (id: string, { getState, dispatch, rejectWithValue }: Redux) => {
    try {
      dispatch(Slice.actions.handleStatus('pending'))
      const response = await StudentService.delete(id)
      const query = getState().students.params.query
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
  name: 'students',
  initialState: {
    entities: [],
    points: [],
    entity: {},
    total: 0,
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

      state.entities = data.users || []
      state.total = data.users?.length || 0
    })
    builder.addCase(fetchAllActionPoints.fulfilled, (state, action) => {
      const { data } = action.payload
      state.points = data?.points || []
      state.total = data?.points?.length || 0
    })
    builder.addCase(fetchOneAction.fulfilled, (state, action) => {
      const { data } = action.payload
      state.entity = data.user || {}
    })
  }
})

export default Slice.reducer

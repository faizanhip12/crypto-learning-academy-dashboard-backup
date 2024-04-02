// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

// ** Employee Service Imports
import { dashboardService } from 'src/services'

// ** Types Imports
import { IDashboard } from 'src/types/apps/dashboard'

export interface DataParams {
  query?: string
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
  rejectWithValue: any
}

interface InitialState {
  studentEntity: IDashboard
  teacherEntity: IDashboard
  adminEntity: IDashboard
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

export const QueryAction = createAsyncThunk('dashboard/query', async (query: string, { getState, dispatch }: Redux) => {
  dispatch(Slice.actions.handleQuery(query))
  return query
})

export const studentFetchOneAction = createAsyncThunk(
  'dashboard/studentfetchOne',
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(Slice.actions.handleStatus('pending'))
      const response = await dashboardService.getAllDashboardsData()
      dispatch(Slice.actions.handleStatus('success'))
      return response.data
    } catch (error) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

export const TeacherFetchOneAction = createAsyncThunk(
  'dashboard/teacherfetchOne',
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(Slice.actions.handleStatus('pending'))
      const response = await dashboardService.getAllDashboardsData()
      dispatch(Slice.actions.handleStatus('success'))
      return response.data
    } catch (error) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

export const AdminFetchOneAction = createAsyncThunk(
  'dashboard/adminfetchOne',
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(Slice.actions.handleStatus('pending'))
      const response = await dashboardService.getAllDashboardsData()
      dispatch(Slice.actions.handleStatus('success'))
      return response.data
    } catch (error) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

export const Slice = createSlice({
  name: 'dashboard',
  initialState: {
    studentEntity: {},
    adminEntity: {},
    teacherEntity: {},
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
    builder.addCase(studentFetchOneAction.fulfilled, (state, action) => {
      const { data } = action.payload
      state.studentEntity = data.data || {}
    })
    builder.addCase(TeacherFetchOneAction.fulfilled, (state, action) => {
      const { data } = action.payload
      state.teacherEntity = data.data || {}
    })
    builder.addCase(AdminFetchOneAction.fulfilled, (state, action) => {
      const { data } = action.payload
      state.adminEntity = data.data || {}
    })
  }
})

export default Slice.reducer

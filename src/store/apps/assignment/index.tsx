// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

// ** Employee Service Imports
import { assignmentService, certificateService } from 'src/services'

// ** Types Imports
import { IAssignment } from 'src/types/apps/assignment'
import { AppDispatch } from 'src/store'
import { CertificateParams } from 'src/services/certificate.service'

export interface DataParams {
  query?: string
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

interface InitialState {
  entities: IAssignment[] | []
  entity:
    | IAssignment
    | {
        title?: string
        id?: string
        assignment?: IAssignment
        assignmentResult?: [] | any
        questions?: []
      }
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

export const QueryAction = createAsyncThunk('assignment/query', async (query: string, { getState, dispatch }) => {
  dispatch(Slice.actions.handleQuery(query))
  return query
})

export const fetchOneAction = createAsyncThunk(
  'assignment/fetchOne',
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(Slice.actions.handleStatus('pending'))
      const response = await assignmentService.getById(id)
      dispatch(Slice.actions.handleStatus('success'))
      return response.data
    } catch (error: any) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

export const fetchAllAction = createAsyncThunk(
  'assignment/fetchAll',
  async (params: DataParams, { getState, dispatch, rejectWithValue }) => {
    try {
      dispatch(Slice.actions.handleStatus('pending'))
      const response = await assignmentService.getAll(params)
      dispatch(Slice.actions.handleStatus('success'))
      return response.data
    } catch (error: any) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

export const fetchSingleStudentAssignmentAction = createAsyncThunk(
  'assignment/fetchSingleStudentAssignmentAction',
  async ({ id, courseId }: { id: string; courseId: string }, { getState, dispatch, rejectWithValue }) => {
    try {
      dispatch(Slice.actions.handleStatus('pending'))
      const response = await assignmentService.getSingleStudentAssignment(id, courseId)
      dispatch(Slice.actions.handleStatus('success'))
      return response.data
    } catch (error: any) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

export const addAction = createAsyncThunk(
  'assignment/add',
  async (data: { data: IAssignment }, { getState, dispatch, rejectWithValue }) => {
    try {
      dispatch(Slice.actions.handleStatus('pending'))
      const response = await assignmentService.add(data)
      // toast.success('Submitted successfully!')
      dispatch(Slice.actions.handleStatus('success'))
      return response.data
    } catch (error: any) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

export const addStudentCertificate = createAsyncThunk(
  'certificate/add',
  async (data: { data: CertificateParams }, { getState, dispatch, rejectWithValue }) => {
    try {
      dispatch(Slice.actions.handleStatus('pending'))
      const response = await certificateService.create(data.data)
      dispatch(Slice.actions.handleStatus('success'))
      return response.data
    } catch (error: any) {
      toast.error(error?.response ? error.response.data.message : 'Something Went Wrong')
      dispatch(Slice.actions.handleStatus('success'))
    }
  }
)

export const updateAction = createAsyncThunk(
  'assignment/update',
  async ({ id, data }: { id: string; data: IAssignment }, { getState, dispatch, rejectWithValue }) => {
    try {
      dispatch(Slice.actions.handleStatus('pending'))
      const response = await assignmentService.update(id, data)
      //@ts-ignore
      const query = getState().assignment.params.query
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
  'assignment/delete',
  async (id: string, { getState, dispatch, rejectWithValue }) => {
    try {
      dispatch(Slice.actions.handleStatus('pending'))
      const response = await assignmentService.delete(id)
      // @ts-ignore
      const query = getState().assignment.params.query
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
  name: 'assignment',
  initialState: {
    entities: [],
    entity: {},
    total: 0,
    params: {},
    status: 'idle'
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
      state.entities = data.folder || []
      state.total = data.folder?.length || 0
    })
    builder.addCase(fetchOneAction.fulfilled, (state, action) => {
      const { data } = action.payload
      state.entity = data?.assignment || {}
    })
    builder.addCase(fetchSingleStudentAssignmentAction.fulfilled, (state, action) => {
      const { data } = action.payload
      state.entity = data.course || {}
      state.entities = data.entities || []
    })
  }
})

export default Slice.reducer

// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

// ** Employee Service Imports
import { workspaceService } from 'src/services'

// ** Types Imports
import { IWorkspace } from 'src/types/apps/workspace'

export interface DataParams {
  query?: string
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
  rejectWithValue: any
}

interface InitialState {
  entities: IWorkspace[] | []
  entity:
    | IWorkspace
    | {
        folders?: []
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

export const QueryAction = createAsyncThunk('workspace/query', async (query: string, { getState, dispatch }: Redux) => {
  dispatch(Slice.actions.handleQuery(query))
  return query
})

export const fetchOneAction = createAsyncThunk(
  'workspace/fetchOne',
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(Slice.actions.handleStatus('pending'))
      const response = await workspaceService.getById(id)
      dispatch(Slice.actions.handleStatus('success'))
      return response.data
    } catch (error) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

export const fetchAllAction = createAsyncThunk(
  'workspace/fetchAll',
  async (params: DataParams, { dispatch, rejectWithValue }: Redux) => {
    try {
      dispatch(Slice.actions.handleStatus('pending'))
      const response = await workspaceService.getAll(params)
      dispatch(Slice.actions.handleStatus('success'))
      return response.data
    } catch (error) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

export const addAction = createAsyncThunk(
  'workspace/add',
  async ({ id, formData }: { id: string; formData: IWorkspace }, { dispatch, rejectWithValue }: Redux) => {
    try {
      dispatch(Slice.actions.handleStatus('pending'))
      const response = await workspaceService.addWokspaceFiles(id, formData)
      toast.success('Added succesfully!')
      dispatch(Slice.actions.handleStatus('success'))
      return response.data
    } catch (error: any) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

export const addFolderAction = createAsyncThunk(
  'workspace/addFolder',
  async ({ id, body }: { id: string; body: IWorkspace }, { rejectWithValue, dispatch }: Redux) => {
    try {
      dispatch(Slice.actions.handleStatus('pending'))
      const response = await workspaceService.addWokspaceFolders(id, body)
      toast.success('Added succesfully!')
      dispatch(Slice.actions.handleStatus('success'))
      return response.data
    } catch (error: any) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

export const updateAction = createAsyncThunk(
  'workspace/update',
  async ({ id, data }: { id: string; data: IWorkspace }, { getState, dispatch, rejectWithValue }: Redux) => {
    try {
      dispatch(Slice.actions.handleStatus('pending'))
      const response = await workspaceService.update(id, data)
      const query = getState().workspace.params.query
      dispatch(fetchAllAction({ query }))
      toast.success('updated succesfully!')
      dispatch(Slice.actions.handleStatus('success'))
      return response.data
    } catch (error: any) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

export const updateActionForFolderName = createAsyncThunk(
  'workspace/updateFolderName',
  async ({ id, data }: { id: string; data: any }, { getState, dispatch, rejectWithValue }: Redux) => {
    try {
      dispatch(Slice.actions.handleStatus('pending'))
      const response = await workspaceService.updateFolderName(id, data)
      toast.success('updated succesfully!')
      dispatch(Slice.actions.handleStatus('success'))
      return response.data
    } catch (error: any) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

export const deleteAction = createAsyncThunk(
  'workspace/delete',
  async (id: string, { getState, dispatch, rejectWithValue }: Redux) => {
    try {
      dispatch(Slice.actions.handleStatus('pending'))
      const response = await workspaceService.delete(id)
      const query = getState().workspace.params.query
      dispatch(fetchAllAction({ query }))
      toast.success('deleted succesfully!')
      dispatch(Slice.actions.handleStatus('success'))
      return response.data
    } catch (error: any) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

export const deleteActionForFolders = createAsyncThunk(
  'workspace/deleteFolders',
  async (id: string, { getState, dispatch, rejectWithValue }: Redux) => {
    try {
      dispatch(Slice.actions.handleStatus('pending'))
      const response = await workspaceService.deleteFolder(id)
      toast.success('deleted succesfully!')
      dispatch(Slice.actions.handleStatus('success'))
      return response.data
    } catch (error: any) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

export const deleteActionForFiles = createAsyncThunk(
  'workspace/deleteForFile',
  async (id: string, { getState, dispatch, rejectWithValue }: Redux) => {
    try {
      dispatch(Slice.actions.handleStatus('pending'))
      const response = await workspaceService.deleteFile(id)
      // const query = getState().workspace.params.query
      // dispatch(fetchOneAction(query))
      toast.success('deleted succesfully!')
      dispatch(Slice.actions.handleStatus('success'))
      return response.data
    } catch (error: any) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

export const Slice = createSlice({
  name: 'workspace',
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
      state.entity = data.workSpace || {}
    })
  }
})

export default Slice.reducer

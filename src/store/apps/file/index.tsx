// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

// ** Types Imports
import { IFile } from 'src/types/apps/file'

interface InitialState {
  file: IFile | {}
  status: 'pending' | 'error' | 'success' | 'idle'
}

export const Slice = createSlice({
  name: 'file',
  initialState: {
    file: {},
    status: 'idle'
  } as InitialState,
  reducers: {
    handleStatus: (state, action) => {
      state.status = action.payload
    },
    handleSetFile: (state, action) => {
      state.file = action.payload
    },
    handleRemoveFile: (state, action) => {
      state.file = {}
    }
  }
})

export default Slice.reducer

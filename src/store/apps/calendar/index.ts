// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import toast from 'react-hot-toast'

import eventService from 'src/services/event.service'
import { AppDispatch } from 'src/store'

// ** Types
import { CalendarFiltersType, AddEventType, EventType } from 'src/types/apps/calendarTypes'

// Api Error
const ApiError = (error: any, dispatch: any, rejectWithValue: (reasaon: string) => void) => {
  dispatch(appCalendarSlice.actions.handleStatus('error'))
  toast.error(error?.response ? error.response.data.message : 'Something Went Wrong')
  return rejectWithValue(error.response.data.message || 'Something Went Wrong')
}

// ** Fetch Events
export const fetchEvents = createAsyncThunk(
  'appCalendar/fetchEvents',
  async (calendars: CalendarFiltersType[], { dispatch, rejectWithValue }) => {
    try {
      dispatch(appCalendarSlice.actions.handleStatus('pending'))
      const response = await eventService.getAll()
      dispatch(appCalendarSlice.actions.handleStatus('success'))
      return response.data
    } catch (error) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

// ** Fetch Events By Playlist Id
export const fetchEventsByPlaylistId = createAsyncThunk(
  'appCalendar/fetchEventsByPlayListId',
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(appCalendarSlice.actions.handleStatus('pending'))
      const response = await eventService.getAllById(id)
      dispatch(appCalendarSlice.actions.handleStatus('success'))
      return response.data
    } catch (error) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

// ** Add Event
export const addEvent = createAsyncThunk(
  'appCalendar/addEvent',
  async (data: AddEventType | any, { dispatch, rejectWithValue }) => {
    try {
      dispatch(appCalendarSlice.actions.handleStatus('pending'))
      const response = await eventService.add(data)
      dispatch(fetchEvents([]))
      toast.success('Added Successfully')
      dispatch(appCalendarSlice.actions.handleStatus('success'))
      return response?.data
    } catch (error) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

// ** Add Course Event
export const addCourseEvent = createAsyncThunk(
  'appCalendar/addCourseEvent',
  async (data: AddEventType | any, { dispatch, rejectWithValue }) => {
    try {
      dispatch(appCalendarSlice.actions.handleStatus('pending'))
      const response = await eventService.add(data)
      dispatch(fetchEventsByPlaylistId(data?.playlistId))
      toast.success('Added Successfully')
      dispatch(appCalendarSlice.actions.handleStatus('success'))
      return response?.data
    } catch (error) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

// ** Update Event
export const updateEvent: any = createAsyncThunk(
  'appCalendar/updateEvent',
  async (
    body: {
      id: any
      body: any
    },
    { dispatch, rejectWithValue }
  ) => {
    let eventId = body?.id
    delete body.id
    try {
      dispatch(appCalendarSlice.actions.handleStatus('pending'))
      const response = await eventService.update(eventId, body as any)
      dispatch(fetchEvents([]))
      toast.success('Updated Successfully')
      dispatch(appCalendarSlice.actions.handleStatus('success'))
      return response?.data
    } catch (error) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

// ** Update Course Event
export const updateCourseEvent: any = createAsyncThunk(
  'appCalendar/updateCourseEvent',
  async (
    body: {
      courseId: string
      modifiedEvent: any
      id: any
      body: any
    },
    { dispatch, rejectWithValue }
  ) => {
    let eventId = body?.modifiedEvent?.id
    // delete body.modifiedEvent?.id
    try {
      body.modifiedEvent.playlistId = body.courseId
      delete body.modifiedEvent.id
      dispatch(appCalendarSlice.actions.handleStatus('pending'))
      const response = await eventService.update(eventId, body?.modifiedEvent as any)
      dispatch(fetchEventsByPlaylistId(body?.courseId as string))
      toast.success('Updated Successfully')
      dispatch(appCalendarSlice.actions.handleStatus('success'))
      return response?.data
    } catch (error) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

// ** Delete Event
export const deleteEvent: any = createAsyncThunk(
  'appCalendar/deleteEvent',
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(appCalendarSlice.actions.handleStatus('pending'))
      const response = await eventService.delete(id)
      dispatch(fetchEvents([]))
      toast.success('Deleted Successfully')
      dispatch(appCalendarSlice.actions.handleStatus('success'))
      return response.data
    } catch (error) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

// ** Delete Course Event
export const deleteCourseEvent: any = createAsyncThunk(
  'appCalendar/deleteCourseEvent',
  // @ts-ignore
  async (data: { eventId: string; playlistId: string }, { dispatch, rejectWithValue }) => {
    try {
      // console.log(data)
      // console.log('first in actions', data)
      dispatch(appCalendarSlice.actions.handleStatus('pending'))
      const response = await eventService.delete(data?.eventId)
      dispatch(fetchEventsByPlaylistId(data?.playlistId))
      toast.success('Deleted Successfully')
      dispatch(appCalendarSlice.actions.handleStatus('success'))
      return response.data
    } catch (error) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

export const appCalendarSlice = createSlice({
  name: 'appCalendar',
  initialState: {
    events: [],
    selectedEvent: null,
    status: 'idle',
    selectedCalendars: ['Personal', 'Business', 'Family', 'Holiday', 'ETC']
  },
  reducers: {
    handleSelectEvent: (state, action) => {
      state.selectedEvent = action.payload
    },
    handleStatus: (state, action) => {
      state.status = action.payload
    },
    handleCalendarsUpdate: (state, action) => {
      const filterIndex = state.selectedCalendars.findIndex(i => i === action.payload)
      if (state.selectedCalendars.includes(action.payload)) {
        state.selectedCalendars.splice(filterIndex, 1)
      } else {
        state.selectedCalendars.push(action.payload)
      }
      if (state.selectedCalendars.length === 0) {
        state.events.length = 0
      }
    },
    handleAllCalendars: (state, action) => {
      const value = action.payload
      if (value === true) {
        state.selectedCalendars = ['Personal', 'Business', 'Family', 'Holiday', 'ETC']
      } else {
        state.selectedCalendars = []
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      state.events = action.payload
    })
    builder.addCase(fetchEventsByPlaylistId.fulfilled, (state, action) => {
      state.events = action.payload
    })
  }
})
export const { handleSelectEvent, handleCalendarsUpdate, handleAllCalendars } = appCalendarSlice.actions

export default appCalendarSlice.reducer

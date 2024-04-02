import { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useDispatch, useSelector } from 'react-redux'
import { useSettings } from 'src/@core/hooks/useSettings'
import { RootState, AppDispatch } from 'src/store'
import { CalendarColors, CalendarFiltersType } from 'src/types/apps/calendarTypes'
import Calendar from 'src/pages/calendar/Calendar'
import CalendarWrapper from 'src/@core/styles/libs/fullcalendar'
import AddEventSidebar from 'src/pages/calendar/AddEventSidebar'
import {
  addEvent,
  fetchEvents,
  deleteEvent,
  updateCourseEvent,
  updateEvent,
  handleSelectEvent,
  addCourseEvent,
  fetchEventsByPlaylistId,
  deleteCourseEvent
} from 'src/store/apps/calendar'
import 'react-datepicker/dist/react-datepicker.css'
import { Button } from '@mui/material'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { useRouter } from 'next/router'

// ** CalendarColors
const calendarsColor: CalendarColors = {
  Personal: 'error',
  Business: 'primary',
  Family: 'warning',
  Holiday: 'success',
  ETC: 'info'
}

const Page = () => {
  // ** States
  const [calendarApi, setCalendarApi] = useState<null | any>(null)
  const [eventEdit, setEventEdit] = useState<any>(false)
  const [leftSidebarOpen, setLeftSidebarOpen] = useState<boolean>(false)
  const [addEventSidebarOpen, setAddEventSidebarOpen] = useState<boolean>(false)
  const [fullEvent, setFullEvent] = useState({})

  // ** Hooks
  const { settings } = useSettings()
  const dispatch = useDispatch<AppDispatch>()
  const store: any = useSelector((state: RootState) => state?.calendar)
  const ability = useContext(AbilityContext)

  // ** Vars
  const addEventSidebarWidth = 400
  const { skin, direction } = settings
  const mdAbove = useMediaQuery(({ breakpoints: { up } }: Theme) => up('md'))

  const { pathname, query } = useRouter()
  // console.log(query)

  useEffect(() => {
    if (pathname === '/course/[id]/event') {
      dispatch(fetchEventsByPlaylistId(query?.id as string))
    } else if (pathname === '/calendar') {
      dispatch(fetchEvents(store.selectedCalendars as CalendarFiltersType[]))
    }
  }, [dispatch, store.selectedCalendars])

  const handleLeftSidebarToggle = () => setLeftSidebarOpen(!leftSidebarOpen)

  const handleAddEventSidebarToggle = () => setAddEventSidebarOpen(!addEventSidebarOpen)

  const handleSidebarToggleSidebar = () => {
    handleAddEventSidebarToggle()
    dispatch(handleSelectEvent(null))
  }

  return (
    <>
      <CalendarWrapper
        className='app-calendar'
        sx={{
          boxShadow: skin === 'bordered' ? 0 : 6,
          ...(skin === 'bordered' && { border: ({ palette: { divider } }) => `1px solid ${divider}` })
        }}
      >
        <Box
          sx={{
            pt: 2.25,
            flexGrow: 1,
            borderRadius: 1,
            boxShadow: 'none',
            ...(mdAbove ? { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } : {})
          }}
        >
          {ability.can('itsHaveAccess', 'add-event-button') && (
            <Box display={'flex'} mb={5}>
              <Button variant='contained' onClick={handleSidebarToggleSidebar} sx={{ marginLeft: 'auto' }}>
                Add Event
              </Button>
            </Box>
          )}
          <Calendar
            fullEvent={fullEvent}
            setFullEvent={setFullEvent}
            eventEdit={eventEdit}
            setEventEdit={setEventEdit}
            store={store?.events?.data?.events}
            dispatch={dispatch}
            direction={direction}
            updateEvent={updateEvent}
            calendarApi={calendarApi}
            calendarsColor={calendarsColor}
            setCalendarApi={setCalendarApi}
            handleSelectEvent={handleSelectEvent}
            handleLeftSidebarToggle={handleLeftSidebarToggle}
            handleAddEventSidebarToggle={handleAddEventSidebarToggle}
          />
        </Box>
        <AddEventSidebar
          addCourseEvent={addCourseEvent}
          deleteCourseEvent={deleteCourseEvent}
          updateCourseEvent={updateCourseEvent}
          fullEvent={fullEvent}
          setFullEvent={setFullEvent}
          eventEdit={eventEdit}
          setEventEdit={setEventEdit}
          store={store}
          dispatch={dispatch}
          addEvent={addEvent}
          updateEvent={updateEvent}
          deleteEvent={deleteEvent}
          calendarApi={calendarApi}
          drawerWidth={addEventSidebarWidth}
          handleSelectEvent={handleSelectEvent}
          addEventSidebarOpen={addEventSidebarOpen}
          handleAddEventSidebarToggle={handleAddEventSidebarToggle}
        />
      </CalendarWrapper>
    </>
  )
}

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'calendar-page'
}

export default Page

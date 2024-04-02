import React, { useEffect, useState, useRef } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Typography, Link, Grid, Container, Breadcrumbs, Button, Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
// @material-ui/lab components
// @material-ui/icons components
import { Home, NavigateBefore, NavigateNext, Check } from '@mui/icons-material'
import EventDialog from './EventDialog'
import { useDispatch } from 'react-redux'
import { StoreCheck } from 'mdi-material-ui'
import { useAuth } from 'src/hooks/useAuth'
import { ModalType } from 'src/types'
import StudentsEvent from './StudentsEvent'
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'

// import { useStyles } from "./Style";

export const useStyles = makeStyles((theme: any) => ({
  root: {
    //display: 'flex',
    //flexWrap: 'wrap',
    //justifyContent: 'space-around',
    overflow: 'hidden'
    //font-family: 'Roboto', sans-serif;
  },
  calendarCtr: {
    backgroundColor: '#11cdef',
    height: '10rem'
  },
  calendar: {
    //display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: '',
    //backgroundColor: 'none',
    width: '90vw',
    margin: 'auto',
    marginTop: '-4rem',
    backgroundColor: '#FFF',
    paddingTop: '4rem',
    borderRadius: '.5rem',
    color: '#8898aa'
  },
  ctrButton: {
    margin: '.2rem',
    color: '#8898aa',
    backgroundColor: '#FFF',
    padding: '.2rem',
    borderRadius: '.5rem'
  },
  gridList: {
    //width: 500,
    //height: 450,
  }
}))

export const CalendarView = ({
  fullEvent,
  setFullEvent,
  eventEdit,
  setEventEdit,
  eventsArray,
  handleAddEventSidebarToggle,
  handleSelectEvent,
  store
}: any) => {
  var today = new Date()
  var y = today.getFullYear()
  var m = today.getMonth()
  var d = today.getDate()

  const calanderRef: any = useRef()

  const [events, setEvents] = useState([])
  const [event, setEvent] = React.useState({})
  const [isEditModal, setIsEditModal] = React.useState(false)
  const [startDate, setStartDate] = React.useState('')
  const [endDate, setEndDate] = React.useState('')
  const [allDay, setAllDay] = React.useState(false)
  const [eventModal, setEventModal] = React.useState(false)
  const [radios, setRadios] = React.useState('')
  const [eventDescription, setEventDescription] = React.useState('')
  const [currentDate, setCurrentDate] = React.useState(null)
  const { user } = useAuth()

  useEffect(() => {
    setEvents(eventsArray)
  }, [])

  const { handleModal, handleDrawer } = useToggleDrawer()

  const addNewEvent = () => {
    let newEvents: any = {
      id: events.length + 1,
      title: fullEvent,
      start: startDate,
      end: endDate,
      allDay: allDay,
      className: radios,
      description: eventDescription
    }
    setEvents([...events, newEvents] as any)
    setEventModal(false)
    setStartDate('')
    setEndDate('')
    setRadios('bg-info')
    setFullEvent('')
    setEventDescription('')
  }

  const editEvent = (event: any) => {
    let newEvents = store?.map((ev: any) => {
      if (ev.id.toString() === event.id) {
        event.remove()
        let saveNewEvent = {
          ...ev,
          title: fullEvent,
          className: radios,
          description: eventDescription
        }
        return saveNewEvent
      } else {
        return ev
      }
    })
    setEvents(newEvents)
    setStartDate('')
    setEndDate('')
    setIsEditModal(false)
    setRadios('bg-info')
    setFullEvent('')
    setEventDescription('')
    setEventModal(false)
  }

  const handleEventClick = (info: any) => {
    handleSidebarToggleSidebar()
    setEventEdit(true)
    setFullEvent(info?.event)
  }

  const handleDateSelect = (info: any) => {}

  const renderEventContent = () => {}

  const handleDateClick = () => {}

  const handleEvents = () => {}

  const changeView = (newView: any) => {
    let calendar = calanderRef.current.getApi()
    calendar.changeView(newView)
    setCurrentDate(calendar.view.title)
  }

  const dispatch = useDispatch()

  const handleSidebarToggleSidebar = () => {
    handleAddEventSidebarToggle()
    dispatch(handleSelectEvent(null))
  }

  const handleStudentsEvent = ({ event }: any) => {
    handleShowEvent(event?._def?.publicId as string)
    setFullEvent(event)
  }

  const handleShowEvent = (id: string) => {
    id && handleDrawer(id)
    handleModal(id, ModalType.STUDENT_S_EVENT)
  }

  return (
    <>
      <div>
        <div>
          <Container maxWidth={false} component={Box}>
            <Grid container component={'div'} alignItems={'center'} paddingTop={'0.5rem'} paddingBottom={'0.5rem'}>
              <Grid item xs={12} lg={6}>
                <Typography variant='h4' className={''}>
                  {currentDate}
                </Typography>
                <Breadcrumbs separator='-' aria-label='breadcrumb'>
                  <Link color='inherit' href='/' onClick={(e: any) => e.preventDefault()}>
                    <Box component={Home} width='1.25rem!important' height='1.25rem!important' position='relative' />
                  </Link>
                  <Link color='inherit' href='/getting-started/installation/' onClick={(e: any) => e.preventDefault()}>
                    Calendar
                  </Link>
                  <Typography component='span' className={''}>
                    {currentDate}
                  </Typography>
                </Breadcrumbs>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Button
                  variant='contained'
                  size='small'
                  onClick={() => {
                    let calendar: any = calanderRef?.current.getApi()
                    calendar.prev()
                  }}
                  sx={{ marginRight: '10px' }}
                >
                  <NavigateBefore />
                </Button>
                <Button
                  variant='contained'
                  size='small'
                  onClick={() => {
                    let calendar: any = calanderRef.current.getApi()
                    calendar.next()
                  }}
                  sx={{ marginRight: '10px' }}
                >
                  <NavigateNext />
                </Button>
                <Button
                  variant='contained'
                  size='small'
                  onClick={() => {
                    let calendar: any = calanderRef.current.getApi()
                    calendar.today()
                  }}
                  sx={{ marginRight: '10px' }}
                >
                  Today
                </Button>
                <Button
                  variant='contained'
                  size='small'
                  onClick={() => changeView('dayGridMonth')}
                  sx={{ marginRight: '10px' }}
                >
                  Month
                </Button>
                <Button
                  variant='contained'
                  size='small'
                  onClick={() => changeView('dayGridWeek')}
                  sx={{ marginRight: '10px' }}
                >
                  Week
                </Button>
                <Button
                  variant='contained'
                  size='small'
                  onClick={() => changeView('dayGridDay')}
                  sx={{ marginRight: '10px' }}
                >
                  Day
                </Button>
              </Grid>
            </Grid>
          </Container>
        </div>

        <div>
          <FullCalendar
            ref={calanderRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            dayMaxEvents={5}
            weekends={true}
            initialView='dayGridMonth'
            events={store}
            eventClick={user?.role?.code === 'STUDENT' ? handleStudentsEvent : (handleEventClick as any)}
            eventAdd={function () {
              console.log('Event Added')
            }}
            eventChange={function () {
              console.log('Event Changed')
            }}
            eventRemove={function () {
              console.log('Event Removed')
            }}
          />
        </div>
      </div>
      <StudentsEvent title='Event Description' type={ModalType.STUDENT_S_EVENT} fullEvent={fullEvent} />
    </>
  )
}

export default CalendarView

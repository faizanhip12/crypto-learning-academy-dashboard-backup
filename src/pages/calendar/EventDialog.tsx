// @material-ui/core components
import React, { useEffect, useState } from 'react'

import {
  Typography,
  TextField,
  Link,
  IconButton,
  Grid,
  FormLabel,
  FormGroup,
  FilledInput,
  DialogContent,
  DialogActions,
  Dialog,
  Container,
  CardHeader,
  CardContent,
  Card,
  Breadcrumbs,
  Button,
  Box
} from '@mui/material'
import { Check } from '@mui/icons-material'
// import Box from "@material-ui/core/Box";
// import Button from "@material-ui/core/Button";
// import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
// import FilledInput from "@material-ui/core/FilledInput";
// import FormGroup from "@material-ui/core/FormGroup";
// import FormLabel from "@material-ui/core/FormLabel";
// import IconButton from "@material-ui/core/IconButton";
// import Slide from '@material-ui/core/Slide'
// // @material-ui/lab components
// // @material-ui/icons components
// import Check from "@material-ui/icons/Check";
// import "./Calendar.css";
// import { TextField } from "@material-ui/core";

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction='down' ref={ref} {...props} />
// })

// const useStyles = makeStyles((theme: any) => ({
//   root: {
//     '& .MuiTextField-root': {
//       margin: theme.spacing(1),
//       width: '25ch',
//       marginLeft: '10px',
//       marginTop: '10px',
//       marginRight: '0px',
//       marginBottom: '0px'
//     },
//     '& .MuiFormLabel-root': {
//       margin: '10px 0px'
//     },
//     '& .MuiDialog-root': {
//       width: '300px'
//     }
//   }
// }))

const EventDialog = (props: any) => {
  const {
    eventModal,
    setEventModal,
    event,
    fullEvent,
    setFullEvent,
    radios,
    setRadios,
    eventDescription,
    setEventDescription,
    addNewEvent,
    editEvent,
    isEditModal,
    setModalAdd
  } = props

  //   const classes = useStyles()

  return (
    <Dialog
      //   className={classes.root}
      open={eventModal}
      //   TransitionComponent={Transition}
      keepMounted
      onClose={() => setEventModal(false)}
      aria-labelledby='alert-dialog-slide-title'
      aria-describedby='alert-dialog-slide-description'
    >
      <DialogContent>
        {isEditModal ? <h3>Edit Event</h3> : <h3>Add New Event</h3>}
        {/* Title Section Group*/}
        <FormGroup>
          <TextField
            required
            label='Event title'
            variant='outlined'
            placeholder='Event Title'
            type='text'
            value={fullEvent}
            onChange={e => setFullEvent(e.target.value)}
          />
        </FormGroup>
        {/* Event Color Section Group*/}
        <FormGroup>
          <FormLabel>Status</FormLabel>
          <Box>
            <Box display='inline-block' marginRight='.5rem'>
              <IconButton className={'bg-info'} onClick={() => setRadios('bg-info')}>
                {radios === 'bg-info' && <Box width='.6rem!important' height='.6rem!important' component={Check} />}
              </IconButton>
            </Box>
            <Box display='inline-block' marginRight='.5rem'>
              <IconButton className={'bg-warning'} onClick={() => setRadios('bg-warning')}>
                {radios === 'bg-warning' && <Box width='.6rem!important' height='.6rem!important' component={Check} />}
              </IconButton>
            </Box>
            <Box display='inline-block' marginRight='.5rem'>
              <IconButton className={'bg-danger'} onClick={() => setRadios('bg-danger')}>
                {radios === 'bg-danger' && <Box width='.6rem!important' height='.6rem!important' component={Check} />}
              </IconButton>
            </Box>
            <Box display='inline-block' marginRight='.5rem'>
              <IconButton className={'bg-success'} onClick={() => setRadios('bg-success')}>
                {radios === 'bg-success' && <Box width='.6rem!important' height='.6rem!important' component={Check} />}
              </IconButton>
            </Box>
            <Box display='inline-block' marginRight='.5rem'>
              <IconButton color='default' className={'bg-default'} onClick={() => setRadios('bg-default')}>
                {radios === 'bg-default' && <Box width='.6rem!important' height='.6rem!important' component={Check} />}
              </IconButton>
            </Box>
            <Box display='inline-block' marginRight='.5rem'>
              <IconButton color='primary' className={'bg-primary'} onClick={() => setRadios('bg-primary')}>
                {radios === 'bg-primary' && <Box width='.6rem!important' height='.6rem!important' component={Check} />}
              </IconButton>
            </Box>
          </Box>
        </FormGroup>
        {/* Event Description Section Group*/}
        <FormGroup>
          <TextField
            placeholder='Event Desctiption'
            label='Event Desctiption'
            type='text'
            variant='outlined'
            multiline
            rows='4'
            value={eventDescription}
            onChange={e => setEventDescription(e.target.value)}
          />
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Box width='100%' display='flex' justifyContent='space-around'>
          <Box>
            {isEditModal ? (
              <Button color='error' variant='contained' onClick={() => editEvent(event)}>
                Edit
              </Button>
            ) : (
              <Button color='primary' variant='contained' onClick={() => addNewEvent}>
                Add
              </Button>
            )}
          </Box>
          <Button onClick={() => setEventModal(false)} color='primary'>
            Close
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  )
}

export default EventDialog

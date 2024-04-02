'use client'
import React, { FormEvent, useContext, useEffect, useMemo, useRef, useState } from 'react'
import Hls from 'hls.js'
import { authToken, createMeeting } from './API'
import ReactPlayer from 'react-player'
import { MeetingProvider, MeetingConsumer, useMeeting, useParticipant, Constants } from '@videosdk.live/react-sdk'
import { Box, Button, Card, Grid, Skeleton, TextField, Typography } from '@mui/material'
import { useAuth } from 'src/hooks/useAuth'
import MicIcon from '@mui/icons-material/Mic'
import MicOffIcon from '@mui/icons-material/MicOff'
import VideocamIcon from '@mui/icons-material/Videocam'
import VideocamOffIcon from '@mui/icons-material/VideocamOff'
import HlsOffIcon from '@mui/icons-material/HlsOff'
import HlsOnIcon from '@mui/icons-material/Hls'
import CallEndIcon from '@mui/icons-material/CallEnd'
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'
import Drawer from 'src/@core/components/apps/liveVideoSdk/Drawer'
import CreateMeetingBtn from './CreateMeetingBtn'
import toast from 'react-hot-toast'
import { IVideo } from 'src/types/apps/video'
import { AuthContext } from 'src/context/AuthContext'
import LoadingButton from '@mui/lab/LoadingButton'
import { useRouter } from 'next/router'
import { VideoService } from 'src/services'
import { useVideo } from 'src/@core/hooks/apps/useVideo'

const JoinScreen = ({ getMeetingAndToken, setMode }: any) => {
  const [meetingId, setMeetingId] = useState(null)
  const onClick = async (mode: any) => {
    setMode(mode)
    await getMeetingAndToken(meetingId)
  }
  return (
    <>
      <TextField
        type='text'
        placeholder='Enter Meeting Id'
        onChange={(e: any) => {
          setMeetingId(e.target.value)
        }}
      />
      <Button variant='outlined' onClick={() => onClick('VIEWER')}>
        Join as Viewer
      </Button>
    </>
  )
}

// export function JoinScreen({ getMeetingAndToken, setMode }: any) {

//   const { serviceId, isDrawerOpen, handleDrawer } = useToggleDrawer()

//   const [meetingId, setMeetingId] = useState(null)
//   //Set the mode of joining participant and set the meeting id or generate new one
// const onClick = async (mode: any) => {
//   setMode(mode)
//   await getMeetingAndToken(meetingId)
// }
//   return (
//     <Grid container >
//       <Card sx={{ width: '100%' }} >
//         <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end' }}>
//           <Button variant='contained' sx={{ marginBottom: 5 }} onClick={() => handleDrawer(null)}>
//             Schedule Live Video
//           </Button>
//         </Box>
//       </Card>
//       {/* <CreateMeetingBtn onClick={() => onClick("CONFERENCE")} /> */}
//       <Button variant='contained' onClick={() => onClick("CONFERENCE")}>
//         Create Meeting
//       </Button>
//       {/* <Box component={'br'} />
//       <Typography variant='h5'>{'OR'}</Typography>
//       <Box component={'br'} />
// <TextField
//   type='text'
//   placeholder='Enter Meeting Id'
//   onChange={e => {
//     setMeetingId(e.target.value)
//   }}
// />
//       <Box component={'br'} />
//       <Button variant='outlined' onClick={() => onClick('CONFERENCE')}>
//         Join as Host
//       </Button>
//       <Box component={'br'} />
//       <Button variant='outlined' onClick={() => onClick('VIEWER')}>
//         Join as Viewer
//       </Button> */}
//       <Drawer open={isDrawerOpen} serviceId={serviceId} toggle={() => handleDrawer(null)} />
//     </Grid>
//   )
// }

const ParticipantView: React.FC<{ participantId: string }> = ({ participantId }) => {
  const micRef = useRef<HTMLAudioElement | null>(null)
  const { webcamStream, micStream, webcamOn, micOn, isLocal } = useParticipant(participantId)

  const videoStream = useMemo(() => {
    if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream()
      mediaStream.addTrack(webcamStream.track)
      return mediaStream
    }
  }, [webcamStream, webcamOn])

  //Playing the audio in the <audio>
  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream()
        mediaStream.addTrack(micStream.track)
        micRef.current.srcObject = mediaStream
        micRef.current.play().catch(error => toast.error('videoElem.current.play() failed'))
      } else {
        micRef.current.srcObject = null
      }
    }
  }, [micStream, micOn])

  return (
    <div
      className='VideoBox'
      style={{
        flex: '0 0 80%',
        maxWidth: '100%',
        marginTop: '10px'
      }}
    >
      <Box component={'div'}>
        {/* <Typography variant='h6' mt={5}>
          Participant: {displayName} | Webcam: {webcamOn ? 'ON' : 'OFF'} | Mic: {micOn ? 'ON' : 'OFF'}
        </Typography> */}
        <audio ref={micRef} autoPlay playsInline muted={isLocal} />
        {webcamOn && (
          <ReactPlayer
            playsinline
            pip={false}
            light={false}
            controls={false}
            muted={true}
            playing={true}
            url={videoStream}
            width={'100%'}
            height={'100%'}
            style={{
              marginTop: 10,
              objectFit: 'cover',
              objectPosition: 'center',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: 'rgba(255, 255, 255, 0.1) 0px 30px 30px'
            }}
            onError={err => {
              toast.error('Something went wrong with Player')
            }}
          />
        )}
      </Box>
    </div>
  )
}

function SpeakerView(roomId: any) {
  const { participants } = useMeeting()

  const speakers = useMemo(() => {
    const speakerParticipants = [...participants.values()].filter(participant => {
      return participant.mode == Constants.modes.CONFERENCE
    })
    return speakerParticipants
  }, [participants])

  return (
    <Box
      component={'div'}
      display={'flex'}
      justifyContent={'center'}
      flexDirection={'row'}
      textAlign={'center'}
      flexWrap={'wrap'}
    >
      {speakers.map(participant => (
        <ParticipantView participantId={participant.id} key={participant.id} />
      ))}
      <Controls roomId={roomId} />
    </Box>
  )
}

function Controls({ roomId }: { roomId: any }) {
  const { leave, toggleMic, toggleWebcam, startHls, stopHls, hlsState } = useMeeting()
  const [isMicOn, setIsMicOn] = useState(false)
  const [isCamOn, setIsCamOn] = useState(false)
  const {
    getVideoBySlug,
    store: { status }
  } = useVideo(null)

  const handleMic = () => {
    // Call the toggleMic function provided by the library
    toggleMic()
    // Update the microphone state
    setIsMicOn(!isMicOn)
  }

  const handleCam = () => {
    toggleWebcam()
    setIsCamOn(!isCamOn)
  }

  const handleHLS = () => {
    if (hlsState === 'HLS_PLAYABLE' || hlsState === 'HLS_STOPPED') {
      startHls({
        layout: {
          type: 'SPOTLIGHT',
          priority: 'PIN',
          gridSize: 20
        },
        theme: 'LIGHT',
        mode: 'video-and-audio',
        quality: 'high',
        orientation: 'landscape'
      })
    } else {
      stopHls()
    }
  }

  useEffect(() => {
    startHls({
      layout: {
        type: 'SPOTLIGHT',
        priority: 'PIN',
        gridSize: 20
      },
      theme: 'LIGHT',
      mode: 'video-and-audio',
      quality: 'high',
      orientation: 'landscape'
    })
    return () => {
      handleVideoEnd()
    }
  }, [])

  const {
    query: { slug, id }
  } = useRouter()

  const body = { status: 'END', roomId: roomId?.roomId }

  const handleVideoEnd = async () => {
    const { data } = await VideoService.updateVideo(slug as string, body)
    if (data?.statusCode === '10000') {
      getVideoBySlug(slug as string, id as string)
      leave()
    }
  }

  return (
    <Box
      component={'div'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      flex={'0 0 100%'}
      marginTop={5}
      position={'relative'}
    >
      <Button
        onClick={handleMic}
        variant='outlined'
        style={{ color: 'white', borderRadius: '50px', height: '60px', width: '60px' }}
      >
        {isMicOn ? <MicOffIcon /> : <MicIcon />}
      </Button>
      &emsp;|&emsp;
      <LoadingButton
        color='error'
        variant='contained'
        // onClick={() => leave()}
        onClick={() => handleVideoEnd()}
        sx={{ borderRadius: '50px', height: '60px', width: '60px' }}
      >
        <CallEndIcon sx={{ color: 'white' }} />
      </LoadingButton>
      &emsp;|&emsp;
      <Button
        onClick={handleCam}
        variant='outlined'
        style={{ color: 'white', borderRadius: '50px', height: '60px', width: '60px' }}
      >
        {isCamOn ? <VideocamOffIcon /> : <VideocamIcon />}
      </Button>
      {/* &emsp;|&emsp; */}
      {/* We will start the HLS in SPOTLIGHT mode and PIN as */}
      {/* priority so only speakers are visible in the HLS stream */}
      {/* <Button
        variant='outlined'
        sx={{ borderRadius: '50px', height: '60px', width: '60px' }}
        disabled={hlsState === 'HLS_STARTING' || hlsState === 'HLS_STOPPING'}
        onClick={() => handleHLS()}
      >
        {hlsState === 'HLS_PLAYABLE' || hlsState === 'HLS_STOPPED' ? <HlsOffIcon /> : <HlsOnIcon />}
      </Button> */}
      {/* &emsp;|&emsp;
      <Button onClick={() => stopHls()} variant='outlined'>
        Stop HLS
      </Button> */}
    </Box>
  )
}

function ViewerView() {
  // States to store downstream url and current HLS state
  const playerRef: any = useRef(null)
  //Getting the hlsUrls
  const { hlsUrls, hlsState } = useMeeting()

  //Playing the HLS stream when the downstreamUrl is present and it is playable
  useEffect(() => {
    if (hlsUrls.downstreamUrl && hlsState == 'HLS_PLAYABLE') {
      if (Hls.isSupported()) {
        const hls = new Hls({
          capLevelToPlayerSize: true,
          maxLoadingDelay: 4,
          minAutoBitrate: 0,
          autoStartLoad: true,
          defaultAudioCodec: 'mp4a.40.2'
        })

        let player: any = document.querySelector('#hlsPlayer')

        hls.loadSource(hlsUrls.downstreamUrl)
        hls.attachMedia(player)
      } else {
        if (typeof playerRef.current?.play === 'function') {
          playerRef.current.src = hlsUrls.downstreamUrl
          playerRef.current.play()
        }
      }
    }
  }, [hlsUrls, hlsState, playerRef.current])

  return (
    <div>
      <Typography>Viewer</Typography>
      {/* Showing message if HLS is not started or is stopped by HOST */}
      {hlsState != 'HLS_PLAYABLE' ? (
        <div>
          <p>HLS has not started yet or is stopped</p>
        </div>
      ) : (
        hlsState == 'HLS_PLAYABLE' && (
          <div>
            <video
              ref={playerRef}
              id='hlsPlayer'
              autoPlay={true}
              controls
              style={{ width: '100%', height: '100%' }}
              playsInline
              muted={true}
              // @ts-ignore
              playing
              onError={err => {}}
            ></video>
          </div>
        )
      )}
    </div>
  )
}

const Container: React.FC<{ roomId: string; onMeetingLeave: () => void }> = ({ roomId, onMeetingLeave }) => {
  const [joined, setJoined] = useState<'JOINED' | 'JOINING' | 'NOT_JOIN'>('NOT_JOIN')

  //Get the method which will be used to join the meeting.
  const { join } = useMeeting()

  const mMeeting = useMeeting({
    //callback for when meeting is joined successfully
    onMeetingJoined: () => {
      setJoined('JOINED')
    },
    //callback for when meeting is left
    onMeetingLeft: () => {
      onMeetingLeave()
    },
    //callback for when there is error in meeting
    onError: error => {
      alert(error.message)
    }
  })

  const joinMeeting = () => {
    setJoined('JOINING')
    join()
  }

  // useEffect(() => {
  //   joinMeeting()

  //   return () => {}
  // }, [])

  return (
    <Box component={'div'} display={'flex'} flexDirection={'column'} alignItems={'center'}>
      {joined && joined == 'JOINED' ? (
        mMeeting?.localParticipant?.mode == Constants?.modes?.CONFERENCE ? (
          <SpeakerView roomId={roomId} />
        ) : mMeeting?.localParticipant?.mode == Constants?.modes?.VIEWER ? (
          <ViewerView />
        ) : null
      ) : joined && joined == 'JOINING' ? (
        <Grid container>
          <Typography variant='h4'>Joining the meeting... ({roomId})</Typography>
          <Skeleton width={'100%'} height={400} />
        </Grid>
      ) : (
        <Button sx={{ mt: 5 }} onClick={joinMeeting} variant='outlined'>
          Join
        </Button>
      )}
    </Box>
  )
}

const LiveVideoSDK: React.FC<{ roomId: string; video: IVideo }> = ({ roomId, video }) => {
  const { user } = useAuth()

  //State to handle the mode of the participant i.e. CONFERNCE or VIEWER
  const [mode, setMode] = useState<'CONFERENCE' | 'VIEWER' | null>(null)

  const onMeetingLeave = () => {
    toast.error('Leaving in progress')
  }

  useEffect(() => {
    if (user && user.activeChannel && user.activeChannel.channel && user.activeChannel.channel.id === video.channelId) {
      setMode('CONFERENCE')
    } else {
      setMode('VIEWER')
    }
  }, [video, user])

  return (
    <>
      {user && roomId && mode ? (
        <MeetingProvider
          config={{
            meetingId: roomId,
            micEnabled: true,
            webcamEnabled: true,
            name: video.title,
            mode: mode
          }}
          token={authToken}
        >
          <MeetingConsumer>{() => <Container roomId={roomId} onMeetingLeave={onMeetingLeave} />}</MeetingConsumer>
        </MeetingProvider>
      ) : null}
    </>
  )

  // return authToken && meetingId ? (
  //   <MeetingProvider
  //     config={{
  //       meetingId: roomId,
  //       micEnabled: true,
  //       webcamEnabled: true,
  //       name: 'Live Streaming',
  //       mode: mode
  //     }}
  //     token={authToken}
  //   >
  //     <MeetingConsumer>{() => <Container roomId={roomId} onMeetingLeave={onMeetingLeave} />}</MeetingConsumer>
  //   </MeetingProvider>
  // ) : (
  //   <JoinScreen getMeetingAndToken={getMeetingAndToken} setMode={setMode} />
  // )
}

export default LiveVideoSDK

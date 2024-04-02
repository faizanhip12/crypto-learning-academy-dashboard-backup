// ** MUI
import { Button, Grid, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'

// ** icons
import DeleteIcon from '@mui/icons-material/DeleteOutline'
import VideoView from 'src/@core/components/apps/courses/components/VideoView'

// ** hooks
import { InputField } from 'src/@core/components/form'
import Imask from 'src/@core/components/form/Imask'
import { useCourses } from 'src/@core/hooks/apps/useCourses'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useState, useEffect, useRef } from 'react'
import { scrollBarStyle } from 'src/@core/constants/styles'
import { convertToDuration, getSecondsFromDuration, makeVTTSingle } from 'src/@core/utils/videoModule'

const Subtitle = () => {
  const { file } = useCourses(null)

  const { control, setError, setValue, getValues, watch, formState } = useFormContext()

  const subtitles_handler = useFieldArray({
    control: control,
    name: 'subtitles'
  })

  const videoRef = useRef<any>(null)

  const [error, setErr] = useState([])
  const alreadyPushed: { id?: number; start: string; end: string; text: string }[] = []

  // Callback version of watch.  It's your responsibility to unsubscribe when done.
  useEffect(() => {
    if (getValues().subtitles.length) validator()
  }, [JSON.stringify(getValues().subtitles)])

  const handleAddMore = () => {
    if (getValues().subtitles.length) {
      let previousEnd = getValues().subtitles[getValues().subtitles.length - 1].end

      const seconds = getSecondsFromDuration(previousEnd)
      const startDuration = convertToDuration(seconds + 1)
      const endDuration = convertToDuration(seconds + 2)

      subtitles_handler.append({ text: '', start: startDuration, end: endDuration })
    } else {
      subtitles_handler.append({ text: '', start: '00:00', end: '00:00' })
    }
  }

  const handleDelete = (index: number) => {
    try {
      subtitles_handler.remove(index)
      alreadyPushed.splice(index, 1)
      const trackDom = videoRef.current.querySelector(`#track${index}`)
      if (trackDom) {
        trackDom.remove()
      }
    } catch (error) {
      console.log(error, 'error')
    }

    //remove from error array
    const err = [...error]
    err.splice(index, 1)
    setErr(err)
  }

  const validator = () => {
    let newarr = getValues().subtitles.map((item: any) => {
      return {
        ...item,
        start: parseFloat(item.start.replace(':', '.')),
        end: parseFloat(item.end.replace(':', '.'))
      }
    })

    newarr.forEach((item: any, index: any) => {
      let start = newarr[index + 1]?.start
      let end = item.end
      if (start < end && index !== 0) {
        if (start !== 0) {
          newarr[index + 1].error = true
        }
      }
    })
    setErr(newarr)
  }

  const createAndAppendTrack = (focusedField: any, index: number, totalSeconds: number) => {
    const makeVTOne = makeVTTSingle([focusedField])

    const track = document.createElement('track')
    track.kind = 'captions'
    track.label = 'English'
    track.srclang = 'en'
    track.id = 'track' + index.toString()
    track.src = URL.createObjectURL(makeVTOne)

    videoRef.current.addEventListener('loadedmetadata', (evt: any) => {
      const track = videoRef.current.textTracks[0]
      ;(track as any).mode = 'showing'
      ;(videoRef.current.textTracks[0] as any).mode = 'showing' // thanks Firefox
    })

    // videoRef.current.addEventListener('loadedmetadata', (evt: any) => {
    //   track.mode = 'showing'
    //   videoRef.current.textTracks[0].mode = 'showing' // thanks Firefox
    // })

    videoRef.current.append(track)

    if (videoRef.current.textTracks[0].mode !== 'showing') {
      videoRef.current.textTracks[0].mode = 'showing'
    }

    videoRef.current.currentTime = totalSeconds

    videoRef.current.play()
  }

  const onFocusFrame = (index: number) => {
    const focusedField = getValues().subtitles[index]
    const totalSeconds = getSecondsFromDuration(focusedField.start)

    videoRef.current.pause()

    focusedField.id = index

    // console.log("focusedField", focusedField)
    // console.log("alreadyPushed", alreadyPushed)

    const eleIndex = alreadyPushed.findIndex(ele => ele.id === index)
    const eleExist = alreadyPushed.findIndex(
      ele =>
        ele.id === index &&
        ele.text == focusedField.text &&
        ele.start == focusedField.start &&
        ele.end == focusedField.end
    )

    // console.log(eleIndex, "eleIndex")
    // console.log(eleExist, "eleExist")

    //User has entered new value on same index
    if (eleExist == -1 && eleIndex !== -1) {
      // console.log("index exist and element dont exist")

      alreadyPushed.splice(eleIndex, 1)
      // videoRef.current.removeChild(videoRef.current.children[eleIndex])

      const trackDom = videoRef.current.querySelector(`#track${index}`)
      if (trackDom) {
        trackDom.remove()
      }

      alreadyPushed.push(focusedField)

      createAndAppendTrack(focusedField, index, totalSeconds)
    }

    //Index and Item Already Exists
    if (eleExist !== -1 && eleIndex !== -1) return

    //Item Dont Exist
    if (eleExist == -1 && eleIndex == -1) {
      // console.log("index and element dont exist")

      const trackDom = videoRef.current.querySelector(`#track${index}`)
      if (trackDom) {
        trackDom.remove()
      }

      if (!focusedField.text) return

      alreadyPushed.push(focusedField)

      createAndAppendTrack(focusedField, index, totalSeconds)
    }
  }

  return (
    <>
      <Grid item xs={12}>
        <Typography variant='h6' fontSize={'19px'}>
          Get a sneak peek at the subtitles as they appear in real-time with our live preview feature!
        </Typography>
      </Grid>
      <Grid container item xs={12} width='100%' sx={{ padding: 10 }}>
        <Grid item xs={6}>
          <VideoView videoRef={videoRef} width='100%' video={file.file} />
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            paddingRight: 18,
            paddingLeft: 5,
            overflowY: 'auto',
            height: '350px',
            ...scrollBarStyle
          }}
        >
          {subtitles_handler.fields.map((field, index) => (
            <Grid container item xs={12} key={field.id} spacing={2} sx={{ padding: 1 }}>
              <Grid item xs={10}>
                <InputField
                  type='text-area'
                  onBlur={() => onFocusFrame(index)}
                  rows={4}
                  name={`subtitles.${index}.text`}
                  control={control}
                />
              </Grid>
              <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <IconButton size='large' onClick={() => handleDelete(index)}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
              <Grid item xs={1}>
                <Imask
                  // @ts-ignore
                  error={error[index]?.error}
                  sx={{ width: 80 }}
                  onChange={e => setValue(`subtitles.${index}.start`, e)}
                  value={getValues().subtitles[index].start}
                />
                <Imask
                  // @ts-ignore
                  error={error[index]?.error}
                  sx={{ width: 80 }}
                  onChange={e => setValue(`subtitles.${index}.end`, e)}
                  value={getValues().subtitles[index].end}
                />
              </Grid>
            </Grid>
          ))}
        </Grid>

        <Grid container item sx={{ padding: 10, display: 'flex', justifyContent: 'flex-end' }}>
          <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              disabled={error.find(
                (x: { id?: number; start: string; end: string; text: string; error: boolean }) => x.error
              )}
              onClick={handleAddMore}
            >
              Add Subtitle
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default Subtitle

// ** React Imports
import { FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material'
import { Fragment } from 'react'
import { InputField, RadioField } from 'src/@core/components/form'
import VideoView from '../VideoView'
import { useCourses } from 'src/@core/hooks/apps/useCourses'
import { useFormContext } from 'react-hook-form'
import { Box } from '@mui/system'

const Visibility = ({ step }: { step: number }) => {
  const { file } = useCourses(null)
  const { control } = useFormContext()

  return (
    <Fragment key={step}>
      <Grid container style={{ display: 'flex', justifyContent: 'center' }} spacing={10}>
        <Grid item xs={12}>
          <Box display={'flex'} flexDirection={'column'} alignItems={'start'}>
            <Box>
              <Typography variant='h6'>Visibility</Typography>
            </Box>
            <Box width={'100%'}>
              <Typography component='p' textAlign={'left'}>
                Choose when to publish and who can see your video
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={7}>
          <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems={'start'}
            sx={{ padding: 5 }}
            style={{ border: '1px solid #6A6A6A', borderRadius: 10, width: 500 }}
          >
            <Box>
              <FormControl>
                {/* <FormLabel id='demo-radio-buttons-group-label'>Gender</FormLabel> */}
                <RadioGroup
                  aria-labelledby='demo-radio-buttons-group-label'
                  defaultValue='PUBLIC'
                  name='radio-buttons-group'
                >
                  <FormControlLabel value='PUBLIC' control={<Radio />} label='Public' />
                  <Typography textAlign={'left'} marginLeft={'10%'} component={'p'} width={'100%'} fontSize={'12px'}>
                    Everyone can watch your video
                  </Typography>
                  {/* <FormControlLabel value='male' control={<Radio />} label='Male' />
                  <FormControlLabel value='other' control={<Radio />} label='Other' /> */}
                </RadioGroup>
              </FormControl>
              {/* <FormControl>
                <RadioGroup
                  aria-labelledby='demo-radio-buttons-group-label'
                  defaultValue='Save or publish'
                  defaultChecked
                  name='radio-buttons-group'
                >
                  <Box display={'flex'} flexDirection={'column'} width={'100%'}>
                    <FormControlLabel value='Save or publish' control={<Radio />} label='Save or publish' />
                    <Typography textAlign={'left'} marginLeft={'10%'} component={'p'} width={'100%'} fontSize={'12px'}>
                      Make your video public, unlisted or private
                    </Typography>
                  </Box>
                </RadioGroup>
                <RadioGroup
                  aria-labelledby='demo-radio-buttons-group-label'
                  name='radio-buttons-group'
                  style={{ marginLeft: '10%' }}
                >
                  <Box display={'flex'} flexDirection={'column'} width={'100%'}>
                    <FormControlLabel value='Private' control={<Radio />} label='Private' />
                    <Typography textAlign={'left'} marginLeft={'10%'} component={'p'} width={'100%'} fontSize={'12px'}>
                      Only you and people who you choose can watch your video
                    </Typography>
                  </Box>
                  <Box display={'flex'} flexDirection={'column'} width={'100%'}>
                    <FormControlLabel value='Public' control={<Radio />} label='Public' />
                    <Typography textAlign={'left'} marginLeft={'10%'} component={'p'} width={'100%'} fontSize={'12px'}>
                      Everyone can watch your video
                    </Typography>
                  </Box>
                </RadioGroup>
              </FormControl> */}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={5}>
          <VideoView video={file.file} />
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default Visibility

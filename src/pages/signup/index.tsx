// ** React Imports
import { useState, ReactNode } from 'react'

// ** MUI Components
import Grid from '@mui/material/Grid'
import MuiLink from '@mui/material/Link'
import LoadingButton from '@mui/lab/LoadingButton'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled } from '@mui/material/styles'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'
import { InputField, Select } from 'src/@core/components/form'
import { RegisterParams } from 'src/context/types'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Third Party Imports
import toast from 'react-hot-toast'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

// ** Contexts
import Image from 'next/image'
import Link from 'next/link'
import { EyeOffOutline, EyeOutline } from 'mdi-material-ui'
import { useRouter } from 'next/router'

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const FlexBox = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  // height: '100vh',
  display: 'flex',
  justifyContent: 'space-between',
  [theme.breakpoints.down('md')]: {
    display: 'block'
  }
}))

const LeftWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '50%',
  alignItems: 'center',
  // height: '95vh',
  flex: '0 0 48%',
  maxWidth: '48%',
  borderRadius: '20px',
  textAlign: 'center',
  margin: 'auto',

  [theme.breakpoints.down('md')]: {
    display: 'none'
  },
  [theme.breakpoints.down('xs')]: {
    display: 'none'
  }
}))

const schema = yup.object().shape({
  first_name: yup
    .string()
    .min(3, 'First Name must be at least 3 characters')
    .max(50, 'First Name must be at most 50 characters')
    .required('First Name is a required field'),
  last_name: yup
    .string()
    .min(3, 'Last Name must be at least 3 characters')
    .max(50, 'Last Name must be at most 50 characters')
    .required('Last Name must be at most 50 characters'),
  email: yup.string().email('Invalid email address').required('Email is a required field'),
  password: yup
    .string()
    .min(5, 'Password must be at least 5 characters')
    .max(25, 'Password must be at most 25 characters')
    .required('Password is a required field')
})

interface FormData {
  first_name: string
  last_name: string
  email: string
  password: string
  role: 'TEACHER' | 'STUDENT'
}

const defaultValues = {
  first_name: '',
  last_name: '',
  password: '',
  email: '',
  role: 'TEACHER'
}

const Signup = () => {
  const auth = useAuth()
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const {
    query: { key }
  } = useRouter()

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: RegisterParams) => {
    auth.register(data, key || null, error => {
      setError('password', {
        type: 'manual',
        message: error?.message || 'Invalid credentials!'
      })
      toast.error(error?.message || 'Invalid credentials!')
    })
  }

  return (
    <>
      <FlexBox>
        {/* <Grid container alignItems={'center'} sx={{ height: '80vh' }}>
        <Grid item md={6} xs={12} textAlign='center'> */}
        <LeftWrapper>
          <Image src={'/images/cards/SignupImage.png'} alt='SignupImage' width={300} height={300} />
        </LeftWrapper>
        {/* </Grid> */}
        <Grid item md={6} xs={12}>
          <Box sx={{ mb: 5 }}>
            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
              <Grid container justifyContent={'space-between'}>
                <Grid item md={6} xs={12} pr={2}>
                  <FormControl fullWidth sx={{ mb: 4, mr: 1 }}>
                    <InputField
                      name='first_name'
                      label='First Name'
                      placeholder='First Name'
                      control={control}
                      sx={{ marginRight: '15px' }}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth sx={{ mb: 5 }}>
                    <InputField name='last_name' label='Last Name' placeholder='Last Name' control={control} />
                  </FormControl>
                </Grid>
              </Grid>
              <FormControl fullWidth sx={{ mb: 5 }}>
                <InputField name='email' label='email' placeholder='Enter Email' control={control} />
              </FormControl>
              <FormControl fullWidth sx={{ mb: 5 }}>
                <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
                  Password
                </InputLabel>
                <Controller
                  name='password'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <OutlinedInput
                      value={value}
                      onBlur={onBlur}
                      label='Password'
                      onChange={onChange}
                      id='auth-login-v2-password'
                      error={Boolean(errors.password)}
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onMouseDown={e => e.preventDefault()}
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOutline /> : <EyeOffOutline />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  )}
                />
                {errors.password && (
                  <FormHelperText sx={{ color: 'error.main' }} id=''>
                    {errors.password.message}
                  </FormHelperText>
                )}
              </FormControl>
              <Box sx={{ mb: 5 }}>
                <Select name='role' control={control} label='Select Role'>
                  <MenuItem value='STUDENT'>Student</MenuItem>
                  <MenuItem value='TEACHER'>Teacher</MenuItem>
                </Select>
              </Box>
              <Box
                sx={{ mb: 2, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
              >
                {/* <FormControlLabel label='Remember Me' control={<Checkbox color='success' />} sx={{ color: '#fff' }} /> */}
                <Link passHref href='/forgot-password'>
                  <Typography component={MuiLink} variant='body2' color={'#fff'}>
                    Forgot Password?
                  </Typography>
                </Link>
              </Box>
              <LoadingButton
                fullWidth
                sx={{ my: 2 }}
                loading={auth.status === 'pending'}
                disabled={auth.status === 'pending'}
                loadingPosition='end'
                size='large'
                variant='contained'
                color='primary'
                type='submit'
              >
                {auth.status === 'pending' ? 'Signing Up' : 'SignUp'}
              </LoadingButton>

              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                <Typography sx={{ mr: 3 }} color='#fff'>
                  Don't have an account?
                </Typography>
                <Typography>
                  <Link passHref href='/login'>
                    <Typography component={MuiLink} color='#fff' fontWeight={'bold'}>
                      Log In
                    </Typography>
                  </Link>
                </Typography>
              </Box>
            </form>
          </Box>
        </Grid>
        {/* </Grid> */}
      </FlexBox>
    </>
  )
}

Signup.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

Signup.guestGuard = true

export default Signup

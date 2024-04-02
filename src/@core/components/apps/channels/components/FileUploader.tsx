import { Fragment, useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import ListItem from '@mui/material/ListItem'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography, { TypographyProps } from '@mui/material/Typography'
import { useController, UseControllerProps } from 'react-hook-form'
import Close from 'mdi-material-ui/Close'
import FileDocumentOutline from 'mdi-material-ui/FileDocumentOutline'
import toast from 'react-hot-toast'
import { useDropzone, DropzoneOptions } from 'react-dropzone'
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'
import { useChannels } from 'src/@core/hooks/apps/useChannels'
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'
import { useDispatch } from 'react-redux'
import { Slice } from 'src/store/apps/video'
import { fileService } from 'src/services'
import { useTheme } from '@mui/material/styles'

interface FileProp {
  name: string
  type: string
  size: number
}

// Styled component for the upload image inside the dropzone area
const Img = styled('img')(
  ({
    theme: {
      breakpoints: { up, down },
      spacing
    }
  }) => ({
    [up('md')]: {
      marginRight: spacing(10)
    },
    [down('md')]: {
      marginBottom: spacing(4)
    },
    [down('sm')]: {
      width: 250
    }
  })
)

// Styled component for the heading inside the dropzone area
const HeadingTypography = styled(Typography)<TypographyProps>(
  ({
    theme: {
      spacing,
      palette: {
        customColors: { white }
      },
      breakpoints: { down }
    }
  }) => ({
    marginBottom: spacing(5),
    [down('sm')]: {
      marginBottom: spacing(4)
    },
    color: white
  })
)

// ** types
interface IFileUploader extends DropzoneOptions, UseControllerProps {
  name: string
  control: UseControllerProps['control'] | any
}

const FileUploaderRestrictions = ({
  maxFiles = 1,
  maxSize = 2000000,
  accept = { 'image/*': ['.png', '.jpg', '.jpeg', '.gif'] },
  control,
  ...props
}: IFileUploader) => {
  // ** Hooks
  const {
    field: { onChange, onBlur, name, value, ref },
    fieldState: { invalid, isTouched, isDirty, error },
    formState: { touchedFields, dirtyFields }
  } = useController({
    ...props,
    control
  })

  // ** State
  const [files, setFiles] = useState<File[]>([])
  const [status, setStatus] = useState<'idle' | 'pending' | 'succes' | 'error'>('idle')
  const { isDrawerOpen } = useToggleDrawer()
  const dispatch = useDispatch()

  // ** Hooks
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles,
    maxSize,
    accept,
    onDrop: (acceptedFiles: File[]) => {
      setFiles(acceptedFiles.map((file: File) => Object.assign(file)))
    },
    onDropRejected: () => {
      toast.error(`You can only upload ${maxFiles} files & maximum size of ${maxSize} MB.`, {
        duration: 2000
      })
    }
  })

  const {
    palette: {
      customColors: { white }
    }
  } = useTheme()
  useEffect(() => {
    handleRemoveAllFiles()
  }, [!isDrawerOpen])

  const { store: channelStore } = useChannels(null)

  useEffect(() => {
    handleRemoveAllFiles()
  }, [channelStore.status === 'success'])

  const handleRemoveAllFiles = () => {
    setFiles([])
  }

  // useEffect(() => {
  //   setFiles([])
  //   handleRemoveAllFiles()
  // }, [store.status === 'pending'])

  const renderFilePreview = (file: FileProp) => {
    if (file.type.startsWith('image')) {
      return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file as any)} />
    } else {
      return <FileDocumentOutline />
    }
  }

  const handleRemoveFile = (file: FileProp) => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter((i: FileProp) => i.name !== file.name)
    setFiles([...filtered])
  }

  const fileList = files.map((file: FileProp) => (
    <ListItem key={file.name}>
      <div className='file-details'>
        <div className='file-preview'>{renderFilePreview(file)}</div>
        <div>
          <Typography className='file-name' color={white}>
            {file.name}
          </Typography>
          <Typography className='file-size' variant='body2' color={white}>
            {Math.round(file.size / 100) / 10 > 1000
              ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
              : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
          </Typography>
        </div>
      </div>
      <IconButton onClick={() => handleRemoveFile(file)}>
        <Close fontSize='small' />
      </IconButton>
    </ListItem>
  ))

  // useEffect(
  //   () => () => {
  //     Make sure to revoke the data uris to avoid memory leaks
  //     files.forEach((file) => URL.revokeObjectURL(file.preview));
  //   },
  //   [files]
  // );

  const handleUpload = () => {
    setStatus('pending')
    dispatch(Slice.actions.handleStatus('pending'))
    if (files) {
      files.forEach(file => {
        const formData = new FormData()
        formData.append('file', file)
        fileService
          .fileUploadOnCloudinary(formData)
          .then(res => {
            // console.log(res)
            if (maxFiles === 1) {
              onChange(`${res?.data?.data?.file?.public_source_url}`)
            } else {
              onChange([...value, `${res?.data?.data?.file?.public_source_url}`])
            }
            toast.success('uploaded!')
          })
          .catch(err => toast.error('upload failed!'))
          .finally(() => setStatus('idle'))
      })
    }
  }

  return (
    <DropzoneWrapper>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <Box sx={{ display: 'flex', flexDirection: ['column', 'column', 'row'], alignItems: 'center' }}>
          <Img width={300} alt='Upload img' src='/images/misc/upload.png' />
          <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: ['center', 'center', 'inherit'] }}>
            <HeadingTypography variant='h5'>Drop files here or click to upload.</HeadingTypography>
            <Typography color={white}>Allowed {accept[Object.keys(accept)[0]].map(acc => '*' + acc + ', ')}</Typography>
            {/* <Typography color={white}>
              Max {maxFiles} files and max size of {maxSize} MB
            </Typography> */}
          </Box>
        </Box>
      </div>
      {files.length ? (
        <Fragment>
          <List>{fileList}</List>
          <div className='buttons'>
            <Button color='error' variant='outlined' onClick={handleRemoveAllFiles}>
              Remove
            </Button>
            <LoadingButton
              loading={status === 'pending'}
              disabled={status === 'pending'}
              loadingPosition='end'
              size='large'
              variant='contained'
              type='button'
              color='primary'
              onClick={handleUpload}
            >
              Upload Files
            </LoadingButton>
          </div>
        </Fragment>
      ) : null}
    </DropzoneWrapper>
  )
}

export default FileUploaderRestrictions

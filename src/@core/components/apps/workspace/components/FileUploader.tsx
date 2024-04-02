// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import ListItem from '@mui/material/ListItem'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography, { TypographyProps } from '@mui/material/Typography'
import Card from '@mui/material/Card'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import FileDocumentOutline from 'mdi-material-ui/FileDocumentOutline'

// ** Third Party Components
import toast from 'react-hot-toast'
import { useDropzone, DropzoneOptions } from 'react-dropzone'
import { Slice } from 'src/store/apps/file'

// ** Styled Component
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'
import { fileService } from 'src/services'
import { useDispatch } from 'react-redux'
import { useWorkspace } from 'src/@core/hooks/apps/useWorkspace'
import { useRouter } from 'next/router'

interface FileProp {
  name: string
  type: string
  size: number
}

// Styled component for the upload image inside the dropzone area
const Img = styled('img')(({ theme }) => ({
  // [theme.breakpoints.up('md')]: {
  //   marginRight: theme.spacing(10)
  // },
  // [theme.breakpoints.down('md')]: {
  //   marginBottom: theme.spacing(4)
  // },
  // [theme.breakpoints.down('sm')]: {
  //   width: 250
  // }
}))

// Styled component for the heading inside the dropzone area
const HeadingTypography = styled(Typography)<TypographyProps>(({ theme }) => ({
  marginBottom: theme.spacing(5),
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(4)
  }
}))

// ** types
interface IFileUploader extends DropzoneOptions {
  name: string
  id: string
  // onUpload: (file: any) => void
}

const FileUploader = ({
  maxFiles = 1,
  maxSize = 2000000,
  accept = {
    'video/*': [
      '.png',
      '.jpg',
      '.jpeg',
      '.gif',
      '.mp4',
      '.mp3',
      '.pdf',
      '.doc',
      '.docx',
      '.xls',
      '.xlsx',
      '.ppt',
      '.pptx',
      '.zip',
      '.rar',
      '.exe'
    ]
  },
  // onUpload,
  id,
  ...props
}: IFileUploader) => {
  // ** State
  const [files, setFiles] = useState<File[]>([])
  const [status, setStatus] = useState<'idle' | 'pending' | 'succes' | 'error'>('idle')
  const dispatch = useDispatch()
  const { addWorkspaceFiles, getAllWorkspacesFolder, getWorkspace } = useWorkspace(null)

  useEffect(() => {
    return () => {
      setFiles([])
    }
  }, [])

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
    query: { id: paramId }
  } = useRouter()

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
        {/* <div className='file-preview'>{renderFilePreview(file)}</div> */}
        <div>
          <Typography className='file-name'>{file.name}</Typography>
          <Typography className='file-size' variant='body2'>
            {Math.round(file.size / 100) / 10 > 1000
              ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
              : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
          </Typography>
        </div>
      </div>
      <IconButton
        onClick={e => {
          e.stopPropagation()
          handleRemoveFile(file)
        }}
      >
        <Close fontSize='small' />
      </IconButton>
    </ListItem>
  ))

  const handleRemoveAllFiles = () => {
    setFiles([])
  }

  // useEffect(
  //   () => () => {
  //     Make sure to revoke the data uris to avoid memory leaks
  //     files.forEach((file) => URL.revokeObjectURL(file.preview));
  //   },
  //   [files]
  // );

  const handleUpload = async () => {
    setStatus('pending')
    dispatch(Slice.actions.handleStatus('pending'))
    if (files) {
      files.forEach(file => {
        const formData = new FormData()
        formData.append('file', file)
        fileService
          .fileUploadOnCloudinary(formData)
          .then(async res => {
            let body = {
              formData,
              id: id
            }
            const { statusCode } = await addWorkspaceFiles(body)
            if (statusCode === '10000') {
              getWorkspace(paramId as string)
              // getAllWorkspacesFolder(paramId as string)
            }

            // dispatch(Slice.actions.handleSetFile(res?.data?.data))
            // onUpload(res?.data?.data)
            toast.success('uploaded!')
          })
          .catch(err => toast.error('upload failed!'))
          .finally(() => {
            setStatus('idle')
            dispatch(Slice.actions.handleStatus('idle'))
          })
      })
    }
  }

  return (
    <DropzoneWrapper style={{ width: '350px', margin: '10px 10px' }}>
      <Card>
        {/* <div {...getRootProps({ className: 'dropzone' })}> */}
        <input {...getInputProps()} />
        <Box
          sx={{
            display: 'block',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor: 'transparent',
            textAlign: 'center'
          }}
        >
          <div {...getRootProps({ className: 'dropzone' })}>
            {files[0] === undefined ? (
              <Img width='140px' height='140px' alt='Upload img' src={'/images/misc/upload.png'} />
            ) : (
              <>
                {files.map((file, index) => {
                  return (
                    <Fragment key={index}>
                      <Img width='140px' height='140px' alt='Upload img' src={URL.createObjectURL(file)} />
                      <List>{fileList}</List>
                    </Fragment>
                  )
                })}
              </>
            )}
          </div>
          {files.length ? (
            <Box mt={5} mb={3}>
              {/* <List>{fileList}</List> */}
              <div className='buttons' style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <Button
                  color='error'
                  variant='outlined'
                  onClick={e => {
                    handleRemoveAllFiles()
                  }}
                >
                  Remove
                </Button>
                <LoadingButton
                  loading={status === 'pending'}
                  disabled={status === 'pending'}
                  loadingPosition='end'
                  size='large'
                  variant='contained'
                  type='button'
                  onClick={handleUpload}
                  // sx={{
                  //   bgcolor: '#B4772C',
                  //   color: 'white'
                  // }}
                  color='primary'
                >
                  Upload Files
                </LoadingButton>
              </div>
            </Box>
          ) : null}
        </Box>
        {/* </div> */}
      </Card>
    </DropzoneWrapper>
  )
}

export default FileUploader

import * as React from 'react'
import Drawer from '@mui/material/Drawer'
import LoadingButton from '@mui/lab/LoadingButton'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import { useCourses } from 'src/@core/hooks/apps/useCourses'
import { FormProvider } from 'react-hook-form'
import Close from 'mdi-material-ui/Close'
import Step from './Step'
import toast from 'react-hot-toast'

interface SidebarAddUserType {
  open: boolean
  toggle: () => void
  serviceId: string | null
}

interface IFile {
  // Define other properties of the file object here
  file?: {
    file?: {
      id: string | any
      // Define other properties of the file here
    }
  }
  fileId?: string | any
  visibility?: string
  startAt?: string
}

const Header = styled(Box)<BoxProps>(({ theme: { spacing } }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: spacing(5, 10),
  justifyContent: 'space-between',
  borderBottom: 1
}))

interface VideoUpload {
  text?: string
  questions?: []
  name: string
  visibility: string
  fileId: string
  choices: []
  isCorect: string
  assignment?: {
    title?: string
    questions: any
  }
  point?: string
}

const StudentDrawer = (props: SidebarAddUserType) => {
  // ** Props
  const { open, toggle, serviceId } = props

  // ** Hooks
  const { form, addCourse, store, file } = useCourses(null)

  // const methods = useForm()

  const onSubmit = async (data: VideoUpload) => {
    const assignmentObject = {
      title: data?.text,
      questions: data?.questions?.map((item: VideoUpload) => {
        return {
          point: parseInt(item?.point as string),
          text: item?.name,
          choices: item?.choices?.map((choice: { text: string }, index: number) => {
            return {
              text: choice.text,
              isCorrect: parseInt(item.isCorect) === index
            }
          })
        }
      })
    }
    delete data.text
    delete data.questions
    data.assignment = assignmentObject
    if (!data.assignment.title) {
      return toast.error('Assignment Title Is Mandatory')
    } else if (data.assignment.questions.length === 0) {
      return toast.error('Questions Are Mandatory')
    } else {
      let invalidChoices = false
      data.assignment.questions.forEach((item: any) => {
        if (!item.choices || item.choices.length < 2) {
          invalidChoices = true
        } else {
          // Check for empty choice text
          const hasEmptyChoiceText = item.choices.some((choice: { text: string }) => choice.text.trim() === '')
          if (hasEmptyChoiceText) {
            invalidChoices = true
          }
        }
      })
      const isQuestionExists = data.assignment.questions?.map((item: any) => {
        if (item.text === '') {
          return false
        } else {
          return true
        }
      })
      // @ts-ignore
      const isValidAssignment = assignmentObject.questions.every((question: any) =>
        question.choices.some((choice: any) => choice.isCorrect)
      )
      if (invalidChoices) {
        return toast.error('Invalid choices or choices with empty text')
      } else if (!isValidAssignment) {
        return toast.error('At least one correct choice is required for each question')
      }
      if (
        isQuestionExists.some((item: any) => {
          if (item === false) {
            return toast.error('All Questions Are Mandatory')
          }
        })
      ) {
      } else {
        data.visibility = 'PUBLIC'
        data.fileId = (file as IFile).file?.file?.id
        const response = await addCourse(data)
        if (response) {
          form.reset()
        }
      }
    }
  }

  React.useEffect(() => {
    if (form.formState.errors.title?.message) {
      toast.error(form.formState.errors.title?.message)
    } else if (form.formState.errors.description?.message) {
      toast.error(form.formState.errors.description?.message)
    } else if (form.formState.errors.thumbnail_url?.message) {
      toast.error(form.formState.errors.thumbnail_url?.message)
    } else if (form.formState.errors.playlistId?.message) {
      toast.error(form.formState.errors.playlistId?.message)
    }
  }, [form.formState.errors])

  const handleClose = () => {
    form.reset()
    toggle()
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: '70%' }, marginX: 10 }}
    >
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Header>
            <Typography variant='h6'>{!serviceId ? 'Add Video' : 'Update Video'}</Typography>
            <Box>
              <LoadingButton
                sx={{ mr: 3 }}
                loading={store.status === 'pending'}
                disabled={store.status === 'pending'}
                loadingPosition='end'
                size='small'
                variant='contained'
                type='submit'
                color='primary'
              >
                Save
              </LoadingButton>
              <Close fontSize='medium' onClick={handleClose} sx={{ cursor: 'pointer' }} />
            </Box>
          </Header>
          <Step />
        </form>
      </FormProvider>
    </Drawer>
  )
}

export default StudentDrawer

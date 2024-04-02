import { Box, Button } from '@mui/material'
import { InputField } from 'src/@core/components/form'
import SendIcon from '@mui/icons-material/Send'
import { useReplies } from 'src/@core/hooks/apps/useReplies'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import CancelIcon from '@mui/icons-material/Cancel'
import toast from 'react-hot-toast'
import LoadingButton from '@mui/lab/LoadingButton'
import { useEffect } from 'react'

const Page = ({ comment, videoId, edit, setReplies, commentReplies, replyId, setshowReplies, setShowInput }: any) => {
  const { control, handleSubmit, reset, setValue } = useForm()

  const { addReply, updateReply, status } = useReplies(null)

  useEffect(() => {
    if (edit) {
      setValue('comment', comment?.comment)
    }
  }, [])

  const {
    query: { slug }
  } = useRouter()

  const onSubmit = async (body: any) => {
    if (!edit) {
      body.parentId = comment?.id
      body.videoId = slug
      const response = await addReply(body)
      if (response?.statusCode === '10000') {
        toast.success('Posted Successfully')
        setShowInput(false)
        reset()
      }
    } else {
      const response = await updateReply(replyId, body)
      if (response?.statusCode === '10000') {
        toast.success('Updated Successfully')
        const commentIndex = commentReplies?.findIndex((item: any) => item?.id === response?.data?.id)
        const updatedReplies = [...commentReplies]
        updatedReplies.splice(commentIndex, 1, response?.data)
        setReplies(updatedReplies)
        reset()
      }
    }
  }

  const onCancel = () => {
    const data = [...commentReplies]
    const response: any = data?.find(item => item?.id === comment?.id)
    const index = data?.indexOf(response)
    response.showEdit = false
    data?.splice(index, 1, response)
    setReplies(data)
  }

  return (
    <>
      <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'flex', width: '100%', mt: 4, ml: 10 }}>
          <InputField
            name='comment'
            placeholder='Reply'
            control={control}
            fullWidth
            style={{ marginLeft: 15 }}
            required
          />
          {edit ? (
            <Button
              sx={{ ml: 5, lineHeight: 2.85, mb: 0 }}
              type='button'
              variant='contained'
              onClick={() => onCancel()}
            >
              <CancelIcon />
            </Button>
          ) : null}
          <LoadingButton
            sx={{ ml: 5, mr: 5, lineHeight: 2.85, mb: 0 }}
            type='submit'
            variant='contained'
            loading={status === 'pending'}
            disabled={status === 'pending'}
            color='primary'
          >
            <SendIcon />
          </LoadingButton>
        </Box>
      </form>
    </>
  )
}

export default Page

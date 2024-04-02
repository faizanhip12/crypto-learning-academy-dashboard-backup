import React, { MouseEvent, useEffect, useState } from 'react'
import { Box, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material'
import Stack from '@mui/material/Stack'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useReplies } from 'src/@core/hooks/apps/useReplies'
import { useRouter } from 'next/router'
import RepliesSection from './RepliesSection'
import { DeleteOutline, DotsVertical, ImageEdit } from 'mdi-material-ui'
import { useAuth } from 'src/hooks/useAuth'
import { IReplies } from 'src/types/apps/reply'
import { useTheme } from '@mui/material/styles'
import { renderClient } from 'src/@core/components/common/renderClient'
import { numFormatter } from 'src/@core/components/numFormatter'

const Page = ({ replies, comments, setComments }: any) => {
  const { getAllRepliesByCommentId, replies: commentReplies, setReplies, likeReplies, deleteReply } = useReplies(null)

  const theme = useTheme()
  const [replyId, setReplyId] = useState('')

  const RowOptions = ({ replies }: { replies: any }) => {
    // ** State
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const rowOptionsOpen = Boolean(anchorEl)

    const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget)
    }
    const handleRowOptionsClose = () => {
      setAnchorEl(null)
    }

    const handleDelete = async () => {
      await deleteReply(replies?.id)
    }

    const handleUpdate = () => {
      showEdit(replies?.id)
      setReplyId(replies?.id)
    }

    return (
      <>
        <IconButton size='small' onClick={handleRowOptionsClick}>
          <DotsVertical />
        </IconButton>
        <Menu
          keepMounted
          anchorEl={anchorEl}
          open={rowOptionsOpen}
          onClose={handleRowOptionsClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          PaperProps={{ style: { minWidth: '8rem' } }}
        >
          <MenuItem onClick={handleUpdate}>
            <ImageEdit fontSize='small' sx={{ mr: 2 }} />
            Edit
          </MenuItem>
          <MenuItem onClick={handleDelete}>
            <DeleteOutline fontSize='small' sx={{ mr: 2 }} />
            Delete
          </MenuItem>
        </Menu>
      </>
    )
  }

  const {
    query: { slug }
  } = useRouter()

  useEffect(() => {
    getAllRepliesByCommentId(replies?.id)
  }, [slug])

  const showEdit = (id: string) => {
    const data = [...commentReplies]
    const response: any = data?.find((item: IReplies) => item?.id === id)
    const index = data?.indexOf(response as never)
    response.showReply = false
    response.showEdit = !response?.showEdit ? true : !response?.showEdit
    data?.splice(index, 1, response as never)
    setReplies(data)
  }

  const showReply = (id: string) => {
    const data = [...commentReplies]
    const response: any = data?.find((item: any) => item?.id === id)
    const index = data?.indexOf(response as never)
    response.showEdit = false
    response.showReply = !response?.showReply ? true : !response?.showReply
    data?.splice(index, 1, response as never)
    setReplies(data)
  }

  const likeCommentReplies = async (id: string) => {
    const response = await likeReplies(id)
    if (response?.statusCode === '10000') {
      getAllRepliesByCommentId(replies?.id)
    }
  }

  const { user } = useAuth()

  return (
    <>
      <Typography variant='body1' textAlign={'center'} ml={20} mt={3}>
        {commentReplies?.length > 1
          ? numFormatter(commentReplies?.length) + ' Replies'
          : numFormatter(commentReplies?.length) + ' Reply'}
      </Typography>
      {commentReplies?.map((item: any, index: number) => {
        return (
          <React.Fragment key={index}>
            <Stack
              direction='column'
              spacing={10}
              mt={3}
              ml={20}
              sx={{ justifyContent: 'space-between', alignItems: 'center', width: '100%' }}
            >
              <Box sx={{ display: 'flex', width: '100%' }}>
                <Tooltip
                  title={`${
                    user?.id === item?.userId ? 'You' : `${item?.user?.first_name + ' ' + item?.user?.last_name}`
                  }`}
                >
                  {renderClient(item?.user?.profile_picture, item?.user?.first_name + ' ' + item?.user?.last_name)}
                </Tooltip>
                <Stack direction={'column'} width='100%'>
                  <Box display={'flex'}>
                    <Typography component='p' color={theme.palette.customColors.grey}>
                      {item?.user?.first_name + ' ' + item?.user?.last_name || 'John Doe'}
                    </Typography>
                  </Box>
                  <Box
                    sx={{ border: 1, padding: 2, borderRadius: 1, mt: 2, mb: 2, height: '80px', overflowY: 'scroll' }}
                  >
                    <Typography component='p'>{item?.comment}</Typography>
                  </Box>
                  <Box display={'flex'}>
                    <Tooltip title={`Click to ${item?.isLiked ? 'unlike' : 'like'} this reply`}>
                      <FavoriteIcon
                        sx={item?.isLiked ? { color: 'red' } : { color: 'white' }}
                        style={{ height: 20, marginTop: 3, marginLeft: 0, cursor: 'pointer' }}
                        onClick={() => likeCommentReplies(item?.id)}
                      />
                    </Tooltip>
                    <Typography component='p'>{numFormatter(item?.likes_count) || '0'}</Typography>
                  </Box>
                </Stack>
                {user?.id === item?.userId ? (
                  <Box marginLeft={'auto'}>
                    <RowOptions replies={item} />
                  </Box>
                ) : null}
              </Box>
            </Stack>
            {item?.showReply ? <RepliesSection comment={item} videoId={slug} edit={false} /> : null}
            {item?.showEdit ? (
              <RepliesSection
                comment={item}
                videoId={slug}
                edit={true}
                setReplies={setReplies}
                commentReplies={commentReplies}
                replyId={replyId}
              />
            ) : null}
          </React.Fragment>
        )
      })}
    </>
  )
}

export default Page

import { Stack, Typography, Box, Card, CardContent, IconButton, Menu, MenuItem } from '@mui/material'
import { DotsVertical } from 'mdi-material-ui'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { usePlaylist } from 'src/@core/hooks/apps/usePlaylist'

const RowOptions = ({
  studentID,
  courseID,
  studentName
}: {
  studentID: string
  courseID: string
  studentName: string
}) => {
  // ** State
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const router = useRouter()

  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleClick = () => {
    router.push(`/course/${courseID}/student/${studentID}/assignments`)
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
        <MenuItem onClick={handleClick}>View Assignments</MenuItem>
      </Menu>
    </>
  )
}

const Page = () => {
  const { getAllPlaylistStudents, store } = usePlaylist(null)

  const {
    query: { id }
  } = useRouter()

  useEffect(() => {
    if (!id) return
    getAllPlaylistStudents(id as string)
  }, [])

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Stack>
          <Typography variant='h3'>Course Students</Typography>

          <Box sx={{ mt: 5 }} />

          <Stack direction='row' gap={5}>
            {store?.students?.[0]?.Enroll?.map((el: any, i: any) => (
              <Card sx={{ mt: 2, minWidth: 400 }} key={i}>
                <CardContent>
                  <Stack direction='row' justifyContent='space-between'>
                    <Box>
                      <Typography variant='h6'>
                        {el?.user?.first_name} {el?.user?.last_name}
                      </Typography>
                      <Typography variant='caption'>{el?.user?.email}</Typography>
                    </Box>
                    <Box marginLeft={'auto'}>
                      <RowOptions
                        studentID={el?.user?.id}
                        courseID={(id as string) || ''}
                        studentName={`${el?.user?.first_name} ${el?.user?.last_name}`}
                      />
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Stack>
      </Box>
    </>
  )
}

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'student-page'
}

export async function getServerSideProps() {
  // Return the fetched data as props
  return {
    props: {}
  }
}

export default Page

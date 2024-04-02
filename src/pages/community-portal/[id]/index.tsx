import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'
import { Box, Divider, Grid } from '@mui/material'
import { useCommunityFeed } from 'src/@core/hooks/apps/useCommunityFeed'
import { ICommunityFeed } from 'src/types/apps/community-feed'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { getInitials } from 'src/@core/utils/get-initials'
import { useRouter } from 'next/router'
import NoFeedFound from 'src/@core/components/apps/communityPortal/NoFeedFound'
import CommunityCard from 'src/@core/components/apps/communityPortal/Card'
import CommunityDrawer from 'src/@core/components/apps/communityPortal/Drawer'
import DeleteAlert from 'src/@core/components/common/deleteAlert'
import { ModalType } from 'src/types'
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'

// ** renders client column
export const renderClient = (row: ICommunityFeed) => {
  if (row && row?.user?.profile_picture) {
    return (
      <CustomAvatar
        src={row?.user?.profile_picture}
        sx={{ borderRadius: '100px', width: '200px', height: '200px', margin: 'auto', objectFit: 'cover', mt: 5 }}
      />
    )
  } else {
    return (
      <CustomAvatar
        skin='light-static'
        color={row.avatarColor || 'primary'}
        sx={{ borderRadius: '100px', width: '200px', height: '200px', margin: 'auto', objectFit: 'cover', mt: 5 }}
      >
        <Box fontSize={'100px'}>{getInitials(row?.user?.first_name + ' ' + row?.user?.last_name || 'UnKnown')}</Box>
      </CustomAvatar>
    )
  }
}

const Page = () => {
  // Hooks

  const {
    query: { id }
  } = useRouter()

  const { getCommunityFeedByUser, store, deleteCommunityFeed } = useCommunityFeed(null)

  const { serviceId, handleDrawer, isDrawerOpen } = useToggleDrawer()

  React.useEffect(() => {
    getCommunityFeedByUser(id as string)
  }, [id])

  const user = store?.entities[0]?.user

  let usersData: ICommunityFeed = store.entities[0]

  let userProfileData = [
    {
      label: 'First Name',
      userInformation: usersData?.user?.first_name
    },
    {
      label: 'Last Name',
      userInformation: usersData?.user?.last_name
    },
    {
      label: 'Email',
      userInformation: usersData?.user?.email
    }
  ]

  const handleDeletePost = () => {
    serviceId && deleteCommunityFeed(serviceId)
  }

  // const handleDeletePostComment = () => {
  //   serviceId && deleteComment(serviceId)
  // }

  return (
    <>
      {user && usersData ? (
        <Grid item xs={12} md={12} lg={12} sx={{ width: '100%', minWidth: '60%', maxWidth: '800px', margin: '0 auto' }}>
          <Box sx={{ flexGrow: 1, mb: 10 }}>
            <Grid container spacing={2}>
              <Grid item lg={4} md={6} xs={12} sm={12} sx={{ marginRight: '0px' }}>
                <Card sx={{ minHeight: 'auto' }}>
                  {renderClient(usersData)}
                  <CardContent>
                    <Typography variant='h6' textAlign={'center'}>
                      {usersData?.user?.first_name + ' ' + usersData?.user?.last_name}
                    </Typography>
                    <Divider />
                  </CardContent>
                </Card>
              </Grid>
              <Grid
                item
                lg={8}
                md={6}
                xs={12}
                sm={12}
                sx={{
                  maxHeight: 'auto',
                  overflowY: 'auto',
                  '&::-webkit-scrollbar': {
                    display: 'none'
                  }
                }}
              >
                <Card sx={{ padding: 5, height: '100%' }}>
                  <Box display={'flex'}>
                    <Typography variant='h6'>Personal Information</Typography>
                  </Box>
                  <Divider />
                  <CardContent sx={{ padding: 0 }}>
                    {userProfileData?.map((userInfo: any, index: number) => {
                      return (
                        <Box display={'flex'} mt={10} key={index}>
                          <Typography component='p' sx={{ flex: '0 0 30%' }}>
                            {userInfo.label}
                          </Typography>
                          <Typography component='p' fontWeight={'bold'} sx={{ flex: '0 0 60%' }}>
                            {userInfo.userInformation}
                          </Typography>
                        </Box>
                      )
                    })}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      ) : null}
      <Grid item xs={12} md={12} lg={12} sx={{ width: '100%', minWidth: '60%', maxWidth: '800px', margin: '0 auto' }}>
        {store.status === 'success' ? (
          !store.entities.length ? (
            <NoFeedFound />
          ) : (
            store?.entities?.map((feeds: any) => {
              return <CommunityCard feeds={feeds} />
            })
          )
        ) : (
          <Box display={'flex'} justifyContent={'center'}>
            <Skeleton variant='rectangular' sx={{ height: '30vh', width: 800 }} />
          </Box>
        )}
      </Grid>
      <CommunityDrawer open={isDrawerOpen} serviceId={serviceId} toggle={() => handleDrawer(null)} />
      <DeleteAlert title='Feed' type={ModalType.COMMUNITYFEED} onAgree={() => handleDeletePost()} />
      {/* <DeleteAlert title='Comment' type={ModalType.FEEDCOMMENT} onAgree={() => handleDeletePostComment()} /> */}
    </>
  )
}

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'community-page'
}

export async function getServerSideProps() {
  return {
    props: {}
  }
}

export default Page

import { Box, Grid, Skeleton } from '@mui/material'
import { useEffect } from 'react'
import CommunityCard from 'src/@core/components/apps/communityPortal/Card'
import CommunityHeader from 'src/@core/components/apps/communityPortal/CommunityHeader'
import NoFeedFound from 'src/@core/components/apps/communityPortal/NoFeedFound'
import CommunityDrawer from 'src/@core/components/apps/communityPortal/Drawer'
import { useCommunityFeed } from 'src/@core/hooks/apps/useCommunityFeed'
import { ICommunityFeed } from 'src/types/apps/community-feed'
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'
import DeleteAlert from 'src/@core/components/common/deleteAlert'
import { ModalType } from 'src/types'

const Page = () => {
  // Hooks

  const { getAllCommunityFeeds, store, deleteCommunityFeed } = useCommunityFeed(null)

  const { serviceId, isDrawerOpen, handleDrawer } = useToggleDrawer()

  useEffect(() => {
    getAllCommunityFeeds({ query: '' })
  }, [])

  const handleDeletePost = () => {
    serviceId && deleteCommunityFeed(serviceId)
  }

  return (
    <>
      <Grid item xs={12} md={12} lg={12} sx={{ width: '100%', minWidth: '60%', maxWidth: '80%', margin: '0 auto' }}>
        <Box display={'block'} margin='0  auto'>
          <CommunityHeader />
        </Box>
        {store.status === 'success' ? (
          !store.entities.length ? (
            <Box display={'block'} margin='0  auto' minWidth={'100%'}>
              <NoFeedFound />
            </Box>
          ) : (
            store?.entities?.map((feeds: ICommunityFeed) => <CommunityCard feeds={feeds} />)
          )
        ) : (
          <Box display={'block'} margin='0  auto' borderRadius={20}>
            <Skeleton variant='rectangular' sx={{ height: '30vh', width: '100%' }} />
          </Box>
        )}
      </Grid>
      <CommunityDrawer open={isDrawerOpen} serviceId={serviceId} toggle={() => handleDrawer(null)} />
      <DeleteAlert title='Feed' type={ModalType.COMMUNITYFEED} onAgree={() => handleDeletePost()} />
    </>
  )
}

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'community-page'
}

export default Page

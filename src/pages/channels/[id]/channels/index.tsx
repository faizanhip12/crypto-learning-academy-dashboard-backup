import React, { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/router'
import ChannelLayout from 'src/@core/layouts/ChannelLayout'
import UserLayout from 'src/layouts/UserLayout'
import { Box, Grid, Skeleton, Tooltip, Typography } from '@mui/material'
import Image from 'next/image'
import { IChannels } from 'src/types/apps/channels'
import Link from 'next/link'
import CheckIcon from '@mui/icons-material/Check'
import { useChannels } from 'src/@core/hooks/apps/useChannels'
import LoadingButton from '@mui/lab/LoadingButton'
import { textOverflow } from 'src/@core/helper/text'
import DataNotFound from 'src/@core/components/apps/channels/components/DataNotFound'

const Page = () => {
  const { store, getMyChannels, subscribeChannelByUserId, getChannelById } = useChannels(null)

  const {
    query: { id: paramId }
  } = useRouter()

  useEffect(() => {
    getMyChannels(store?.entity?.userId)
  }, [store?.entity?.userId])

  const subscribeChannel = async (id: string) => {
    const { statusCode } = await subscribeChannelByUserId(id)
    if (statusCode === '10000') {
      getMyChannels(store?.entity?.userId)
      if (paramId === id) {
        getChannelById(paramId)
      }
    }
  }

  return (
    <>
      <Box display={'flex'} flexWrap={'wrap'}>
        <Grid container spacing={5}>
          {store?.status === 'success' ? (
            !store?.entities?.length ? (
              <DataNotFound />
            ) : (
              store?.entities?.map((item: IChannels) => {
                return (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={3}
                    lg={4}
                    key={item.id}
                    textAlign={'center'}
                    padding={5}
                    borderRadius={1}
                  >
                    <Box
                      sx={{
                        background: 'transparent',
                        padding: 5,
                        borderRadius: 2
                      }}
                    >
                      <Link href={`/channels/${item?.id}`}>
                        <Box sx={{ cursor: 'pointer' }}>
                          <Image
                            src={item?.thumnail_url || '/images/avatars/avatar.png'}
                            width='100px'
                            height='100px'
                            alt='Remy sharp'
                            style={{ borderRadius: '50px' }}
                          />
                        </Box>
                      </Link>
                      <Typography component={'p'} fontSize={'1.4rem'} fontWeight={'500'} color={'#FFF'}>
                        {textOverflow(item?.name, 20)}
                      </Typography>
                      <Typography component={'p'} color={'#FFF'}>
                        {item?.subscriber?.length > 1
                          ? item?.subscriber?.length + ' Subscribers'
                          : item?.subscriber?.length + ' Subscriber'}
                      </Typography>
                      <Tooltip
                        title={`Click to ${item?.isSubscribed ? 'unsubscribe' : 'subscribe'} to ${textOverflow(
                          item?.name,
                          20
                        )}`}
                      >
                        <LoadingButton
                          loading={store.status === 'pending'}
                          disabled={store.status === 'pending'}
                          loadingPosition='end'
                          variant='contained'
                          color={item?.isSubscribed ? 'success' : 'primary'}
                          sx={{
                            width: '180px',
                            mt: 5
                          }}
                          type='submit'
                          endIcon={item?.isSubscribed ? <CheckIcon color='success' /> : null}
                          onClick={() => subscribeChannel(item?.id)}
                        >
                          {item?.isSubscribed ? 'Subscribed' : 'Subscribe'}
                        </LoadingButton>
                      </Tooltip>
                    </Box>
                  </Grid>
                )
              })
            )
          ) : (
            <Skeleton variant='rectangular' width={'100%'} height={'60vh'} />
          )}
        </Grid>
      </Box>
    </>
  )
}

Page.getLayout = (page: ReactNode) => (
  <UserLayout>
    <ChannelLayout>{page}</ChannelLayout>
  </UserLayout>
)

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'channels-page'
}

export async function getServerSideProps() {
  // Return the fetched data as props
  return {
    props: {}
  }
}

export default Page

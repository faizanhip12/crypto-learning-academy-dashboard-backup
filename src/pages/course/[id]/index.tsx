import { Card, CardContent, CardMedia, Divider, Grid, Skeleton, Tooltip, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useVideo } from 'src/@core/hooks/apps/useVideo'
import CheckIcon from '@mui/icons-material/Check'
import Rating from '@mui/material/Rating'
import LoadingButton from '@mui/lab/LoadingButton'
import IconButton from '@mui/material/IconButton'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import FolderSharedIcon from '@mui/icons-material/FolderShared'

// ** Component Imports
import { usePlaylist } from 'src/@core/hooks/apps/usePlaylist'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { InputField } from 'src/@core/components/form'
import { useForm } from 'react-hook-form'
import { useReview } from 'src/@core/hooks/apps/useReview'
import ReviewDrawer from 'src/@core/components/apps/review/components/Drawer'
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'
import DataNotFound from 'src/@core/components/apps/channels/components/DataNotFound'
import { textOverflow } from 'src/@core/helper/text'
import { useTheme } from '@mui/material/styles'

const Page = () => {
  // Hooks

  const [value, setValue] = React.useState<number | null>(2)

  const { serviceId, isDrawerOpen, handleDrawer } = useToggleDrawer()

  const { store, getAllVideosByPlaylistId } = useVideo(null)

  const { getPlaylistById, store: playlistStore } = usePlaylist(null)

  const { addReview, getAllReviewsByPlaylistId, store: reviewStore } = useReview(null)

  const { control, handleSubmit, setValue: formSetValue } = useForm()

  const {
    query: { id }
  } = useRouter()
  const theme = useTheme()
  useEffect(() => {
    getAllVideosByPlaylistId(id as any)
    getAllReviewsByPlaylistId(id as any)
    getPlaylistById(id as string)
  }, [id])

  const onSubmit = async (body: any) => {
    playlistStore?.status === 'pending'
    body.reviews = value
    body.playListId = id
    const { payload }: any = await addReview(body)
    if (payload?.statusCode === '10000') {
      getAllReviewsByPlaylistId(id as any)
      formSetValue('description', '')
    }
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item lg={4} md={6} xs={12} sm={12} sx={{ marginRight: '0px' }}>
            <Card sx={{ minHeight: 'auto' }}>
              <CardMedia
                component='img'
                height='auto'
                width={'100%'}
                sx={{ objectFit: 'contain', maxHeight: 250 }}
                image={
                  ('thumbnail' in playlistStore?.entity && playlistStore?.entity?.thumbnail) ||
                  '/images/misc/no-results-found.webp'
                }
                alt='Image'
              />
              <CardContent>
                <Typography variant='h6' textAlign={'center'}>
                  {playlistStore?.entity && 'name' in playlistStore?.entity && playlistStore?.entity?.name}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Link href={`/course/${playlistStore?.entity?.workSpace?.id}/workspace`}>
                    <Tooltip title='View WorkSpace'>
                      <IconButton>
                        <FolderSharedIcon />
                      </IconButton>
                    </Tooltip>
                  </Link>
                  <Tooltip title='View Reviews'>
                    <IconButton onClick={() => handleDrawer(null)}>
                      <WorkspacePremiumIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Divider />
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Box
                    sx={{
                      '& > legend': { mt: 10 }
                    }}
                  >
                    <Box
                      sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <Rating
                        style={{
                          marginBottom: 20,
                          marginTop: 20
                        }}
                        name='hover-feedback'
                        value={value}
                        precision={0.5}
                        onChange={(event, newValue) => {
                          setValue(newValue)
                        }}
                      />
                    </Box>
                    <InputField
                      name='description'
                      label='Description'
                      placeholder='Enter Description'
                      type='text-area'
                      rows={5}
                      control={control}
                      required
                    />
                  </Box>
                  <LoadingButton
                    loading={reviewStore?.status === 'pending'}
                    disabled={reviewStore?.status === 'pending'}
                    loadingPosition='end'
                    size='small'
                    variant='contained'
                    color='primary'
                    type='submit'
                    fullWidth
                    sx={{
                      mt: 5
                    }}
                  >
                    Submit
                  </LoadingButton>
                </form>
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
              padding: '20px',
              '&::-webkit-scrollbar': {
                display: 'none'
              }
            }}
          >
            {store?.entities?.length > 0 ? (
              store?.status === 'pending' ? (
                <Skeleton variant='rectangular' width={'40vw'} height={'80vh'} />
              ) : (
                store?.entities?.map((item, index) => {
                  return (
                    <Card sx={{ mt: 2 }} key={item.id}>
                      <Box display={'flex'}>
                        <Typography
                          display={'flex'}
                          justifyContent={'center'}
                          alignItems={'center'}
                          marginRight={2}
                          marginLeft={2}
                          fontWeight={'800'}
                        >
                          {index + 1}
                        </Typography>
                        <Link href={`/course/${id}/video/${item?.id}`}>
                          <CardMedia
                            sx={{ width: '200px', objectFit: 'cover' }}
                            component='img'
                            height='194'
                            image={item?.thumbnail_url || '/images/misc/no-results-found.webp'}
                            alt='Image'
                            style={{ cursor: 'pointer' }}
                          />
                        </Link>
                        <CardContent>
                          {/* <Link href={`/watch/${item?.id}`}> */}
                          <Link href={`/course/${id}/video/${item?.id}`}>
                            <Typography component='p' mt={5} fontWeight={'bold'} sx={{ cursor: 'pointer' }}>
                              {textOverflow(item?.title, 20)}
                            </Typography>
                          </Link>
                          <Link href={`/channels/${item?.channel?.id}`}>
                            <Box display={'flex'}>
                              <Typography sx={{ cursor: 'pointer', mt: 3 }}>
                                {textOverflow(item?.channel?.name, 35) || 'No Title Found'}
                              </Typography>
                              <CheckIcon
                                sx={{
                                  mt: '19px',
                                  width: '12px',
                                  height: '12px',
                                  background: theme.palette.customColors.grey,
                                  ml: 1,
                                  borderRadius: '50%'
                                }}
                              />
                            </Box>
                          </Link>
                          <Typography variant='body2' fontSize='11px' mt={3}>
                            {item?.likes_count} views -{' '}
                            {formatDistanceToNow(new Date(item?.createdAt), { addSuffix: true })}
                          </Typography>
                        </CardContent>
                      </Box>
                    </Card>
                  )
                })
              )
            ) : (
              <DataNotFound />
            )}
          </Grid>
        </Grid>
      </Box>
      <ReviewDrawer open={isDrawerOpen} serviceId={serviceId} toggle={() => handleDrawer(null)} />
    </>
  )
}

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'playlist-page'
}

export async function getServerSideProps() {
  // Return the fetched data as props
  return {
    props: {}
  }
}

export default Page

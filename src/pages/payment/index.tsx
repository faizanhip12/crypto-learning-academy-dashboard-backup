// ** React Imports
import { MouseEvent, useContext, useEffect, useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import CheckIcon from '@mui/icons-material/Check'

// ** Custom Components Imports
import TableHeader from 'src/@core/components/apps/subscription/components/TableHeader'
import Drawer from 'src/@core/components/apps/subscription/components/Drawer'
import DeleteAlert from 'src/@core/components/common/deleteAlert'

// ** Import Custom hooks
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'
import { useSubscription } from 'src/@core/hooks/apps/useSubscription'
import { Box, Button, Divider, Menu, MenuItem, Skeleton, Typography } from '@mui/material'
import { DeleteOutline, DotsVertical, ImageEdit } from 'mdi-material-ui'
import { useRouter } from 'next/router'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import DataNotFound from 'src/@core/components/apps/channels/components/DataNotFound'
import { IPayment } from 'src/types/apps/payment'
import { useAuth } from 'src/hooks/useAuth'
import LoadingButton from '@mui/lab/LoadingButton'
import { useTheme } from '@mui/material/styles'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.linear_gradient.cardGradient : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}))

const RowOptions = ({ id }: { id: string }) => {
  // ** Hooks
  const { handleDrawer, handleModal } = useToggleDrawer()

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
    handleModal(id)
    handleRowOptionsClose()
  }

  const handleUpdate = () => handleDrawer(id)

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
        <MenuItem onClick={handleDelete}>
          <DeleteOutline fontSize='small' sx={{ mr: 2 }} />
          Delete
        </MenuItem>
        <MenuItem onClick={handleUpdate}>
          <ImageEdit fontSize='small' sx={{ mr: 2 }} />
          Edit
        </MenuItem>
      </Menu>
    </>
  )
}

const Page = () => {
  const ability = useContext(AbilityContext)
  const theme = useTheme()
  // ** Hooks

  const { user } = useAuth()
  const { serviceId, isDrawerOpen, handleDrawer } = useToggleDrawer()
  const router = useRouter()
  const { store, getAllSubscriptions, deleteSubscription } = useSubscription(null)

  const handleDelete = () => {
    serviceId && deleteSubscription(serviceId)
  }

  useEffect(() => {
    getAllSubscriptions({ query: '' })
  }, [])

  return (
    <>
      <Typography variant='h3'>Payment</Typography>
      {!store.entities.length && <TableHeader value={''} handleFilter={() => {}} toggle={() => handleDrawer(null)} />}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {store?.status === 'success' ? (
            !store?.entities?.length ? (
              <DataNotFound />
            ) : (
              store?.entities?.map((item: IPayment) => {
                return (
                  <Grid item lg={6} md={6} sm={12} xs={12} key={item?.id}>
                    <Item style={{ margin: '2.5rem' }}>
                      <Box display={'flex'} justifyContent={'flex-end'}>
                        {ability.can('itsHaveAccess', 'edit-subscription-details') && <RowOptions id={item?.id} />}
                      </Box>
                      <Typography variant='h6' fontSize={'18px'} fontWeight={'600'} lineHeight={'140%'} m={'2.5rem'}>
                        {item?.title}
                      </Typography>
                      <Typography
                        variant='h6'
                        fontSize={'13px'}
                        fontWeight={'400'}
                        lineHeight={'161%'}
                        margin={'2.5rem'}
                      >
                        {item?.description}
                      </Typography>
                      <Divider sx={{ margin: '2.5rem' }} />
                      <Typography variant='h6' fontSize={'18px'} fontWeight={'600'} lineHeight={'140%'} m={'2.5rem'}>
                        <Box component={'span'} color={theme.palette.customColors.themeColor} fontSize={'72.132px'}>
                          ${item?.price}
                        </Box>
                        /
                        {item?.expireYears >= 1
                          ? 'Year'
                          : item?.expireMonths >= 1 && item?.expireYears <= 1
                          ? 'Month'
                          : 'Days'}
                      </Typography>
                      <Typography
                        variant='h6'
                        fontSize={'13px'}
                        fontWeight={'400'}
                        lineHeight={'161%'}
                        margin={'2.5rem'}
                      >
                        {item?.subTitle}
                      </Typography>
                      {ability.can('itsHaveAccess', 'subscribe-button') && (
                        <LoadingButton
                          sx={{
                            marginTop: '10px',
                            marginBottom: '20px',
                            width: '248px'
                          }}
                          disabled={user?.isSubscribed}
                          onClick={() =>
                            router.push(
                              {
                                pathname: `/payment/check-out`,
                                query: item
                              },
                              '/payment/check-out'
                            )
                          }
                          variant='contained'
                          color={user?.isSubscribed ? 'success' : 'primary'}
                          endIcon={user?.isSubscribed ? <CheckIcon color='success' /> : null}
                        >
                          {user?.isSubscribed ? 'Subscribed' : 'Subscribe'}
                        </LoadingButton>
                      )}
                      <Divider sx={{ margin: '2.5rem' }} />
                      <Typography textAlign={'start'} margin={'2.5rem'} fontSize={'12px'}>
                        <Box component={'span'} color={theme.palette.customColors.themeColor}>
                          DISCLAIMER
                        </Box>
                        {` Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                    scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                    into electronic typesetting, remaining essentially unchanged. It was popularized in the 1960s.`}
                      </Typography>
                    </Item>
                  </Grid>
                )
              })
            )
          ) : (
            <Skeleton variant='rectangular' sx={{ height: '60vh', widows: '75vw' }} />
          )}
        </Grid>
      </Box>
      {ability.can('itsHaveAccess', 'payment-drawer') && (
        <Drawer open={isDrawerOpen} serviceId={serviceId} toggle={() => handleDrawer(null)} />
      )}
      <DeleteAlert title='Payment' onAgree={handleDelete} />
    </>
  )
}

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'payment-page'
}

export default Page

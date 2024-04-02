import * as React from 'react'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import { InputField, Select } from 'src/@core/components/form'
import Close from 'mdi-material-ui/Close'
import { Divider, Grid, MenuItem } from '@mui/material'
import {
  MILESTONE_ENTITIES,
  MILESTONE_TYPES,
  MILESTONE_TYPES_LIST,
  getReadableMilestoneEntityName
} from '../constants/constants'
import { useMilestone } from 'src/@core/hooks/apps/useMilestones'
import { IMilestone } from 'src/types/apps/milestone'

interface SidebarAddUserType {
  open: boolean
  toggle: () => void
  serviceId: string | null
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const Footer = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const MilestoneDrawer = (props: SidebarAddUserType) => {
  const { open, toggle, serviceId } = props

  const {
    form: { control, reset, handleSubmit, watch, getValues },
    addMilestone,
    updateMilestone,
    store
  } = useMilestone(serviceId)

  const onSubmit = async (data: IMilestone) => {
    if (serviceId) {
      await updateMilestone(serviceId, data)
    } else {
      await addMilestone(data)
    }
  }

  const handleClose = () => {
    reset()
    toggle()
  }

  const selectedCount = watch('count')
  const selectedBonusPoints = watch('bonus_points')
  const selectedMilestoneType = watch('milestoneType')
  const selectedMilestoneEntity = watch('milestoneEntity')

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: 700 } }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Header>
          <Typography variant='h6'>{!serviceId ? 'Add Milestone' : 'Update Milestone'}</Typography>

          <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
        </Header>

        <Box sx={{ p: 5 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12}>
              <InputField name='name' label='Name' placeholder='Milestone Name' type='text' control={control} />
            </Grid>
            <Grid item xs={12} sm={12}>
              <InputField
                name='description'
                label='Description'
                placeholder='Milestone Description'
                type='text-area'
                rows={4}
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Select name='milestoneType' label='Milestone Type' placeholder='Milestone Type' control={control}>
                {MILESTONE_TYPES_LIST.map((type, index) => (
                  <MenuItem
                    value={type.value}
                    onChange={() => {
                      reset({
                        ...getValues(),
                        milestoneEntity: '',
                        milestoneType: type.value
                      })
                    }}
                    key={index}
                  >
                    {type.title}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            {selectedMilestoneType === MILESTONE_TYPES.COUNT ? (
              <Grid item xs={12} sm={12}>
                <Select
                  name='milestoneEntity'
                  label='Milestone Entity'
                  placeholder='Milestone Entity'
                  control={control}
                >
                  {MILESTONE_ENTITIES.map((type, index) => (
                    <MenuItem value={type.value} key={index}>
                      {type.title}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            ) : null}

            <Grid item xs={12} sm={12}>
              <Divider />
            </Grid>

            <Grid item xs={12} sm={12}>
              <InputField name='count' label='Count' placeholder='Count' type='number' control={control} />
            </Grid>

            <Grid item xs={12} sm={12}>
              <InputField
                name='bonus_points'
                label='Bonus Points'
                placeholder='Bonus Points'
                type='number'
                control={control}
              />
            </Grid>

            {selectedMilestoneType && selectedCount > 0 ? (
              <>
                <Grid item xs={12} sm={12}>
                  <Divider />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <Typography variant='caption'>
                    To achieve this milestone student will have to{' '}
                    {selectedMilestoneType === MILESTONE_TYPES.COUNT
                      ? `complete ${selectedCount} ${getReadableMilestoneEntityName(selectedMilestoneEntity)}\`s`
                      : `login ${selectedCount} times in a row`}
                  </Typography>
                  <Box />
                  <Typography variant='caption'>Student will get {selectedBonusPoints} Points</Typography>
                </Grid>
              </>
            ) : null}
          </Grid>
        </Box>

        <Footer sx={{ position: 'absolute', bottom: '0', width: '100%' }}>
          <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
            Cancel
          </Button>

          <LoadingButton
            sx={{ mr: 3 }}
            loading={store.status === 'pending'}
            disabled={store.status === 'pending'}
            loadingPosition='end'
            size='large'
            variant='contained'
            type='submit'
            color='primary'
          >
            Submit
          </LoadingButton>
        </Footer>
      </form>
    </Drawer>
  )
}

export default MilestoneDrawer

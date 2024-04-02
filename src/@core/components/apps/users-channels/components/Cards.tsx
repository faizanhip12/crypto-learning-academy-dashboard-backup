import * as React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { ImageEdit } from 'mdi-material-ui'

import MoreVertIcon from '@mui/icons-material/MoreVert'
import Image from 'next/image'
import { Stack } from '@mui/system'
import { DeleteOutline } from 'mdi-material-ui'
import { Menu, MenuItem } from '@mui/material'
import { useChannels } from 'src/@core/hooks/apps/useChannels'
import { useTheme } from '@mui/material/styles'

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}

export default function Cards() {
  const [openOptions, setOpenOptions] = React.useState(false)

  const { getAllChannels, store } = useChannels(null)

  React.useEffect(() => {
    getAllChannels({ query: '' })
  }, [])
  const theme = useTheme()

  return store?.entities?.map((cards: any, index: number) => {
    return (
      <Card sx={{ maxWidth: 345, float: 'left', mr: 5, mb: 5, position: 'relative' }} key={index}>
        <Image src={cards?.thumnail_url} width='345px' height='250px' alt='Video Image' />
        <CardHeader
          sx={{
            bgcolor: theme.palette.customColors.darkgrey,
            color: theme.palette.customColors.white,
            mt: '-10px',
            minHeight: 110,
            position: 'relative'
          }}
          action={
            <IconButton aria-label='settings' sx={{ color: theme.palette.customColors.white, position: 'relative' }}>
              <MoreVertIcon onClick={() => setOpenOptions(!openOptions)} />
            </IconButton>
          }
          title={cards?.title}
        />
        <CardContent sx={{ bgcolor: theme.palette.customColors.darkgrey, position: 'relative' }}>
          <Stack direction='row' height='auto' alignItems='center'>
            <Typography variant='h6' color={theme.palette.customColors.white} mr='10px'>
              {openOptions ? (
                <>
                  <Menu
                    keepMounted
                    // anchorEl={anchorEl}
                    open={openOptions}
                    onClose={() => setOpenOptions(false)}
                    // anchorOrigin={{
                    //   vertical: 'center',
                    //   horizontal: 'center'
                    // }}
                    // transformOrigin={{
                    //   vertical: 'top',
                    //   horizontal: 'right'
                    // }}
                    PaperProps={{ style: { minWidth: '8rem' } }}
                  >
                    <MenuItem
                    // onClick={handleDelete}
                    >
                      <DeleteOutline fontSize='small' sx={{ mr: 2 }} />
                      Delete
                    </MenuItem>
                    <MenuItem
                    // onClick={handleUpdate}
                    >
                      <ImageEdit fontSize='small' sx={{ mr: 2 }} />
                      Edit
                    </MenuItem>
                  </Menu>
                </>
              ) : null}
              {`${cards?.user?.first_name} ${cards?.user?.last_name}`}
            </Typography>
            {/* <Image src={cards.imageveri} width='10px' height='10px' /> */}
          </Stack>
          <Typography variant='body2' color={theme.palette.customColors.white}>
            {cards.views_count} views - {cards.time} monts ago
          </Typography>
        </CardContent>
      </Card>
    )
  })
}

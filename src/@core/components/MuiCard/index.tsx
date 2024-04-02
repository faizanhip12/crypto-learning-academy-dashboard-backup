import * as React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Image from 'next/image'
import { Stack } from '@mui/system'
import { DeleteOutline, ImageEdit } from 'mdi-material-ui'
import { Menu, MenuItem } from '@mui/material'
import { useChannels } from 'src/@core/hooks/apps/useChannels'
import { useRouter } from 'next/router'
import { useTheme } from '@mui/material/styles'

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}

export default function MuiCard() {
  const [openOptions, setOpenOptions] = React.useState(false)
  const theme = useTheme()
  const { getAllChannels, store } = useChannels(null)

  const {
    query: { id }
  } = useRouter()

  React.useEffect(() => {
    getAllChannels({ query: '' })
  }, [])

  return store?.entities?.map((cards, index) => {
    return (
      <Card sx={{ maxWidth: 345, float: 'left', mr: 5, mb: 5, position: 'relative' }} key={index}>
        <Image src={cards?.thumnail_url} width='345px' height='250px' alt='Video Image' />
        <CardHeader
          sx={{
            bgcolor: theme.palette.customColors.grey,
            color: '#fff',
            mt: '-10px',
            minHeight: 110,
            position: 'relative'
          }}
          action={
            <IconButton aria-label='settings' sx={{ color: '#fff', position: 'relative' }}>
              <MoreVertIcon onClick={() => setOpenOptions(!openOptions)} />
            </IconButton>
          }
          title={cards?.name}
        />
        <CardContent sx={{ bgcolor: theme.palette.customColors.darkgrey, position: 'relative' }}>
          <Stack direction='row' height='auto' alignItems='center'>
            <Typography variant='h6' mr='10px'>
              {openOptions ? (
                <>
                  <Menu
                    keepMounted
                    open={openOptions}
                    onClose={() => setOpenOptions(false)}
                    PaperProps={{ style: { minWidth: '8rem' } }}
                  >
                    <MenuItem>
                      <DeleteOutline fontSize='small' sx={{ mr: 2 }} />
                      Delete
                    </MenuItem>
                    <MenuItem>
                      <ImageEdit fontSize='small' sx={{ mr: 2 }} />
                      Edit
                    </MenuItem>
                  </Menu>
                </>
              ) : null}
              {cards?.slug}
            </Typography>
          </Stack>
          <Typography variant='body2' color='#fff'>
            {cards.views_count} views - {cards.time} monts ago
          </Typography>
        </CardContent>
      </Card>
    )
  })
}

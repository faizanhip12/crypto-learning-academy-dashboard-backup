import React from 'react'
// ** MUI Imports
import Box from '@mui/material/Box'
import {
  Card,
  CardContent,
  Direction,
  Divider,
  Typography,
  CardActions,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material'

// ** Third Party Components
import { useKeenSlider } from 'keen-slider/react'
import { UrlToFileName } from 'src/@core/helper/url-manuplation'
import FileRender from './FileRender'
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'
import { DeleteOutline, DotsVertical } from 'mdi-material-ui'
import { useWorkspace } from 'src/@core/hooks/apps/useWorkspace'

const RowOptions = ({ id }: { id: string }) => {
  const { deleteWorkspaceFiles } = useWorkspace(null)

  const { handleModal, handleDrawer } = useToggleDrawer()

  // ** State
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = async () => {
    handleRowOptionsClose()
    deleteWorkspaceFiles(id)
    // handleModal(id, ModalType.WORKSPACE)
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
        {/* <MenuItem onClick={handleUpdate}>
          <ImageEdit fontSize='small' sx={{ mr: 2 }} />
          Edit
        </MenuItem> */}
      </Menu>
      {/* <DeleteAlert title='client' onAgree={handleDelete} /> */}
    </>
  )
}

const SwiperFreeMode = ({ direction, folders: { File } }: { direction: Direction; folders: any }) => {
  // ** Hook
  const [ref] = useKeenSlider<HTMLDivElement>({
    loop: false,
    mode: 'free',
    rtl: direction === 'ltr',
    slides: {
      perView: 3,
      spacing: 0
    },
    breakpoints: {
      '(max-width: 1440px)': {
        loop: false,
        slides: {
          perView: 2
        }
      },
      '(max-width: 991px)': {
        loop: false,
        slides: {
          perView: 1
        }
      }
    }
  })

  return (
    <>
      <Box
        ref={ref}
        className='keen-slider'
        style={{ overflowX: 'hidden' }}
        sx={File?.length > 1 ? { display: 'flex', zIndex: '-1' } : null}
      >
        {File?.map((file: any, index: number) => {
          return (
            <Box className='keen-slider__slide' width={200} marginRight={'10px'} key={index}>
              <Card
                sx={{
                  maxWidth: 345,
                  minWidth: 200,
                  minHeight: '300px',
                  margin: '10px 10px',
                  padding: '0px 10px'
                }}
              >
                <Box display={'flex'} justifyContent={'flex-end'}>
                  <RowOptions id={file?.id as string} />
                </Box>
                <CardContent sx={{ p: 1, justifyContent: 'center' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <FileRender file_type={file?.type} />
                  </Box>
                </CardContent>
                <Divider />
                <CardActions sx={{ p: 1 }}>
                  <Typography variant='body1'>{UrlToFileName(file?.public_source_url)?.filename}</Typography>
                </CardActions>
              </Card>
            </Box>
          )
        })}
      </Box>
    </>
  )
}

export default SwiperFreeMode

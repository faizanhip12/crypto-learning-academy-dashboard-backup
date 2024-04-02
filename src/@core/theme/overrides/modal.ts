// ** MUI Imports
import { Theme } from '@mui/material/styles'
// ** Theme Type Import
import { Skin } from 'src/@core/layouts/types'

const Modal = (theme: Theme, skin: Skin) => {
  return {
    MuiModal: {
      styleOverrides: {
        root: {
          color: theme.palette.text.primary,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          '& .MuiPaper-root': {
            background:
              theme.palette.linear_gradient.multiGradient
          }
        }
      }
    }
  }
}

export default Modal

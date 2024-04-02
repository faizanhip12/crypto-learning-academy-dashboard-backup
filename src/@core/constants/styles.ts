import { Box, BoxProps, styled } from '@mui/material'

export const scrollBarStyle = {
  scrollbarWidth: 'thin',
  '&::-webkit-scrollbar': {
    width: '0.4em'
  },
  '&::-webkit-scrollbar-track': {
    background: '#f1f1f1'
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#888'
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: '#555'
  }
}

export const AlignRight = styled(Box)<BoxProps>(({ theme }) => ({
  textAlign: 'right',
  [theme.breakpoints.down('md')]: {
    textAlign: 'center'
  },
  [theme.breakpoints.down('sm')]: {
    textAlign: 'center'
  },
  [theme.breakpoints.down('xs')]: {
    textAlign: 'center'
  }
}))

export const CenterWrapperText = styled(Box)<BoxProps>(({ theme }) => ({
  textAlign: 'left',
  [theme.breakpoints.down('md')]: {
    textAlign: 'left'
  },
  [theme.breakpoints.down('sm')]: {
    textAlign: 'center'
  },
  [theme.breakpoints.down('xs')]: {
    textAlign: 'center'
  }
}))

export const CenterImg = styled(Box)<BoxProps>(({ theme }) => ({
  textAlign: 'left',
  width: '100%',
  height: '100%',
  [theme.breakpoints.down('md')]: {
    textAlign: 'left'
  },
  [theme.breakpoints.down('sm')]: {
    textAlign: 'center',
    width: '30%',
    margin: 'auto',
    height: '30%'
  },
  [theme.breakpoints.down('xs')]: {
    textAlign: 'center'
  }
}))

export const DonutImg = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  height: '100%',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  },
  [theme.breakpoints.down('sm')]: {
    textAlign: 'center',
    width: '100%',
    margin: 'auto',
    height: '100%'
  },
  [theme.breakpoints.down('xs')]: {
    textAlign: 'center',
    width: '100%',
    margin: 'auto',
    height: '100%'
  }
}))

export const FlexColumnMobile = styled(Box)<BoxProps>(({ theme }) => ({
  marginBottom: '20px',
  display: 'flex',
  [theme.breakpoints.down('sm')]: {
    overflowX: 'scroll'
  }
}))

export const GraphBox = styled(Box)<BoxProps>(({ theme }) => ({
  borderRadius: '4px',
  width: '100%',
  border: '1px solid #363636',
  padding: '20px ',
  background: theme.palette.linear_gradient.cardGradient,
  height: '100%',
  [theme.breakpoints.down('sm')]: {}
}))

export const SmallGrayText = styled(Box)<BoxProps>(({ theme }) => ({
  fontSize: '14px',
  lineHeight: '16px',
  color: theme.palette.customColors.grey,
  [theme.breakpoints.down('lg')]: {
    fontSize: '14px',
    lineHeight: '14px'
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '14px',
    lineHeight: '16px'
  },

  [theme.breakpoints.down('sm')]: {
    fontSize: '14px',
    lineHeight: '16px'
  }
}))

export const FlexBoxes = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '20px 0',
  flexFlow: 'wrap',
  gap: '20px',
  [theme.breakpoints.down('lg')]: {
    flexDirection: 'column'
  }
}))

export const RightBox = styled(Box)<BoxProps>(({ theme }) => ({
  textAlign: 'right',
  [theme.breakpoints.down('lg')]: {
    textAlign: 'left'
  },

  [theme.breakpoints.down('md')]: {
    textAlign: 'left'
  }
}))

export const CardBoxSingle = styled(Box)<BoxProps>(({ theme }) => ({
  borderRadius: '4px',
  width: '100%',
  border: '1px solid #363636',
  padding: '0 20px ',
  background: theme.palette.linear_gradient.cardGradient,
  height: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  [theme.breakpoints.down('sm')]: {}
}))


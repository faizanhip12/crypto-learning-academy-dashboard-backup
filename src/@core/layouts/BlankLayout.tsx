import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'
import { GuestLayoutProps } from './types'
import { useEffect, useState } from 'react'

const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.down('md')]: {}
}))

const ImageWrapper1 = styled('img')({
  position: 'absolute',
  top: '0',
  right: '0'
})

const ImageWrapper2 = styled('img')({
  position: 'absolute',
  bottom: '0',
  left: '0'
})

const MainWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'absolute',
  width: '70%',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  [theme.breakpoints.down('lg')]: {
    maxWidth: '100%',
    height: 'auto',
    width: '90%'
  }
}))

const ModalWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  padding: '50px',
  width: '100%',
  borderRadius: 20,
  overflow: 'hidden',
  backgroundColor: theme.palette.background.default, //'#000000a6',
  background: 'rgba(205, 205, 205, 0.01)',
  boxShadow:
    '0px 0px 56px -36px #000000, inset 0px 7px 11px -4px rgb(176 176 176 / 20%), inset 0px -82px 68px -64px rgb(176 176 176 / 17%), inset 0px 98px 100px -48px rgb(176 176 176 / 14%), inset 0px 4px 50px rgb(176 176 176 / 30%), inset 0px 1px 0px #b0b0b0',
  backdropFilter: 'blur(50px)',
  borderEndEndRadius: 24,
  border: '1px double transparent',
  backgroundImage: theme.palette.linear_gradient.radialGradient,
  backgroundOrigin: 'border-box',
  backgroundClip: 'padding-box, border-box',
  margin: '0 auto',
  position: 'relative',
  [theme.breakpoints.down('xs')]: {
    maxWidth: '100%',
    padding: '15px 10px'
  },
  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
    padding: '30px 20px'
  },
  [theme.breakpoints.down('lg')]: {
    maxWidth: '100%'
  }
}))

const GuestLayout = ({ children }: GuestLayoutProps) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })

  const updateCursorPosition = (e: any) => {
    setCursorPosition({ x: e.clientX, y: e.clientY })
  }

  useEffect(() => {
    document.addEventListener('mousemove', e => {
      setCursorPosition({
        x: e.clientX,
        y: e.clientY
      })
    })

    return () => {
      document.removeEventListener('mousemove', updateCursorPosition)
    }
  }, [])

  const CircleOnCursor = styled(Box)<BoxProps>(({ theme }) => ({
    position: 'fixed',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    border: `2px solid orange`,
    top: `${cursorPosition.y}px`,
    left: `${cursorPosition.x - 10}px`,
    transition: 'all -0.5s ease-in',
    pointerEvents: 'none',
    zIndex: 9999999999
  }))

  return (
    <>
      <CircleOnCursor />
      <ImageWrapper1 src='../images/background/bottomCystals.png' alt='crstals' />
      <ImageWrapper2 src='../images/background/topCystals.png' alt='crstals' sx={{ width: '100%', maxWidth: '100%' }} />
      <MainWrapper id='yyyyyyyyyyyy'>
        <ModalWrapper>
          <Box>
            <BoxWrapper>{children}</BoxWrapper>
          </Box>
        </ModalWrapper>
      </MainWrapper>
    </>
  )
}

export default GuestLayout

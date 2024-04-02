// ** MUI Imports
import { Box, Tab } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'

// ** Types
import { ProfileLayoutProps } from './types'
import Link from 'next/link'
import { FlexColumnMobile } from '../constants/styles'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/store'
import { useTheme } from '@mui/material/styles'

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  // Hooks

  const [value, setValue] = useState('1')
  const router = useRouter()
  const routeSegments = router.pathname?.split('/')
  const lastSegment = routeSegments.pop()
  const theme = useTheme()
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <>
      <Box sx={{ typography: 'body1', mt: 5 }}>
        <TabContext value={value}>
          <TabList onChange={handleChange} aria-label='lab API tabs example'>
            <FlexColumnMobile>
              <Link href={`/settings/profile`}>
                <Tab
                  label='Profile'
                  value={'1'}
                  sx={
                    lastSegment === 'profile'
                      ? {
                          borderBottom: `2px solid ${theme.palette.customColors.themeColor}`,
                          color: theme.palette.customColors.themeColor
                        }
                      : { color: '#fff' }
                  }
                />
              </Link>
              <Link href={`/settings/changePassword`}>
                <Tab
                  label='Password'
                  value={'2'}
                  sx={
                    lastSegment === 'changePassword'
                      ? {
                          borderBottom: `2px solid ${theme.palette.customColors.themeColor}`,
                          color: theme.palette.customColors.themeColor
                        }
                      : { color: '#fff' }
                  }
                />
              </Link>
            </FlexColumnMobile>
          </TabList>
          <TabPanel value='1'>{children}</TabPanel>
          <TabPanel value='2'>{children}</TabPanel>
        </TabContext>
      </Box>
    </>
  )
}

export default ProfileLayout

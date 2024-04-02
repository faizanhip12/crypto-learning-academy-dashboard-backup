// ** MUI Imports
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

// ** Icons Imports
import MenuIcon from 'mdi-material-ui/Menu'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'

// ** Components
import Autocomplete from 'src/layouts/components/Autocomplete'
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import LanguageDropdown from 'src/@core/layouts/components/shared-components/LanguageDropdown'
import NotificationDropdown from 'src/@core/layouts/components/shared-components/NotificationDropdown'
import { styled, Tooltip, Typography } from '@mui/material'
import { useAuth } from 'src/hooks/useAuth'
import { useEffect, useState } from 'react'

interface Props {
  hidden: boolean
  settings: Settings
  toggleNavVisibility: () => void
  saveSettings: (values: Settings) => void
}

const LastLoggedInText = styled(Typography)(({ theme }) => ({
  marginLeft: 10,
  [theme.breakpoints.down('md')]: {
    textAlign: 'center'
  },
  [theme.breakpoints.down(490)]: {
    marginTop: 5,
    marginBottom: 5
  }
}))

const ResponseLastLoggedAtText = styled(Box)(({ theme }) => ({
  marginRight: 2,
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.down(490)]: {
    flexDirection: 'column',
    marginTop: 5
  }
}))

const AppBarContent = (props: Props) => {
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props

  // Hooks

  const { user } = useAuth()

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        {hidden ? (
          <IconButton color='inherit' sx={{ ml: -2.75 }} onClick={toggleNavVisibility}>
            <MenuIcon />
          </IconButton>
        ) : null}
        <ResponseLastLoggedAtText>
          <Autocomplete hidden={hidden} settings={settings} />
          <div id='google_translate_element'></div>
          {user?.logedAt && (
            <Tooltip title='Your Last Logged In Time'>
              <LastLoggedInText variant='caption'>
                Last Logged in At {new Date(user?.logedAt || '').toUTCString()}
              </LastLoggedInText>
            </Tooltip>
          )}
        </ResponseLastLoggedAtText>
      </Box>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        {/* <LanguageDropdown settings={settings} saveSettings={saveSettings} />
        <ModeToggler settings={settings} saveSettings={saveSettings} /> */}
        {/* <NotificationDropdown settings={settings} /> */}
        <UserDropdown settings={settings} />
      </Box>
    </Box>
  )
}

export default AppBarContent

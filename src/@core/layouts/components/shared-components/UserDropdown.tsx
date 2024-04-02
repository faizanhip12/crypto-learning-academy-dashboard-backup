// ** React Imports
import { useState, SyntheticEvent, Fragment } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Icons Imports
import LogoutVariant from 'mdi-material-ui/LogoutVariant'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import { getInitials } from 'src/@core/utils/get-initials'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Context
import { useAuth } from 'src/hooks/useAuth'

// ** Type Imports
import { Settings } from 'src/@core/context/settingsContext'
import MyChannelList from 'src/@core/components/apps/channels/components/MyChannelList'
import { IUser } from 'src/types/apps/user'
import Link from 'next/link'
import { textOverflow } from 'src/@core/helper/text'
import { renderClient } from 'src/@core/components/common/renderClient'
import { Tooltip } from '@mui/material'

interface Props {
  settings: Settings
}

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const ChannelListBox = styled('div')(({ theme }) => ({
  display: 'flex',
  ml: 3,
  alignItems: 'flex-start',
  flexDirection: 'column',
  margin: 0,
  background: theme.palette.linear_gradient.cardGradient,
  maxHeight: '160px',
  overflowY: 'scroll',
  '&:empty': {
    height: '0'
  }
}))

const UserDropdown = (props: Props) => {
  // ** Props
  const { settings } = props

  // ** States
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)

  // ** Hooks
  const router = useRouter()
  const { logout, user } = useAuth()

  // ** Vars
  const { direction } = settings

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = (url?: string) => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }

  const handleLogout = () => {
    logout()
    handleDropdownClose()
  }

  return (
    <Fragment>
      <Badge
        overlap='circular'
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: 'pointer' }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        {renderClient(user?.profile_picture, user?.first_name + ' ' + user?.last_name)}
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 230, mt: 4 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
      >
        <Box sx={{ pt: 2, pb: 3, px: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Badge
              overlap='circular'
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
            >
              {renderClient(user?.profile_picture, user?.first_name + ' ' + user?.last_name)}
            </Badge>
            <Link href='/settings/profile'>
              <Box
                sx={{ display: 'flex', ml: 3, alignItems: 'flex-start', flexDirection: 'column', cursor: 'pointer' }}
              >
                <Typography sx={{ fontWeight: 600 }}>
                  {textOverflow(
                    user?.activeChannel ? user?.activeChannel?.channel?.name : user?.first_name + ' ' + user?.last_name,
                    15
                  )}
                </Typography>
                <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>
                  {user?.role?.code || 'Unknown User'}
                </Typography>
              </Box>
            </Link>
          </Box>
        </Box>
        <Divider sx={{ mt: 0, mb: 1 }} />
        <ChannelListBox
          sx={{
            overflowY: 'scroll',
            '::-webkit-scrollbar': {
              width: 3
            }
          }}
        >
          <MyChannelList />
        </ChannelListBox>
        <MenuItem sx={{ py: 2 }} onClick={() => handleDropdownClose('/settings/profile')}>
          <PersonOutlineOutlinedIcon sx={{ mr: 2, fontSize: '1.375rem', color: 'text.secondary' }} />
          Profile
        </MenuItem>
        <Divider sx={{ mt: 0, mb: 1 }} />
        <MenuItem sx={{ py: 2 }} onClick={handleLogout}>
          <LogoutVariant sx={{ mr: 2, fontSize: '1.375rem', color: 'text.secondary' }} />
          Logout
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default UserDropdown

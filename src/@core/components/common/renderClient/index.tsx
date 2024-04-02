import { getInitials } from 'src/@core/utils/get-initials'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** renders client column
export const renderClient = (profilePicture: string, fullName: string, width = 34, height = 34) => {
  if (profilePicture) {
    return <CustomAvatar src={profilePicture} sx={{ mr: 3, width, height }} />
  } else {
    return (
      <CustomAvatar skin='light' color={'primary'} sx={{ mr: 3, width, height, fontSize: '1rem' }}>
        {getInitials(fullName || 'UnKnown')}
      </CustomAvatar>
    )
  }
}

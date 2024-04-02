// ** React Imports
import { ReactNode, useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useDispatch, useSelector } from 'react-redux'
import { sendMsg, selectChat, fetchChatsContacts, removeSelectedChat } from 'src/store/apps/chat'
import { RootState, AppDispatch } from 'src/store'
import { StatusObjType, StatusType } from 'src/types/apps/chatTypes'
import { useSettings } from 'src/@core/hooks/useSettings'
import { getInitials } from 'src/@core/utils/get-initials'
import { formatDateToMonthShort } from 'src/@core/utils/format'
import SidebarLeft from 'src/@core/components/apps/channels/components/chat/components/SidebarLeft'
import ChatContent from 'src/@core/components/apps/channels/components/chat/components/ChatContent'
import ChannelLayout from 'src/@core/layouts/ChannelLayout'
import UserLayout from 'src/layouts/UserLayout'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { useRouter } from 'next/router'

const Page = () => {
  // ** States
  const [userStatus, setUserStatus] = useState<StatusType>('online')

  const [leftSidebarOpen, setLeftSidebarOpen] = useState<boolean>(false)

  const [userProfileLeftOpen, setUserProfileLeftOpen] = useState<boolean>(false)

  const [userProfileRightOpen, setUserProfileRightOpen] = useState<boolean>(false)

  const theme = useTheme()

  const { settings } = useSettings()

  const dispatch = useDispatch<AppDispatch>()

  const hidden = useMediaQuery(theme.breakpoints.down('lg'))

  const store = useSelector((state: RootState) => state.chat)

  const ability = useContext(AbilityContext)

  const smAbove = useMediaQuery(theme.breakpoints.up('sm'))

  const sidebarWidth = smAbove ? 370 : 300

  const mdAbove = useMediaQuery(theme.breakpoints.up('md'))

  const { skin, appBar, footer, layout, navHidden } = settings

  const statusObj: StatusObjType = {
    busy: 'error',
    away: 'warning',
    online: 'success',
    offline: 'secondary'
  }

  const {
    query: { id }
  } = useRouter()

  useEffect(() => {
    dispatch(fetchChatsContacts(id as string))
  }, [dispatch])

  const handleLeftSidebarToggle = () => setLeftSidebarOpen(!leftSidebarOpen)

  const handleUserProfileLeftSidebarToggle = () => setUserProfileLeftOpen(!userProfileLeftOpen)

  const handleUserProfileRightSidebarToggle = () => setUserProfileRightOpen(!userProfileRightOpen)

  const handlestartConversation = () => console.log(`startConversation('ABC')`, store.selectedChat)

  const calculateAppHeight = () => {
    return `(${
      (appBar === 'hidden' ? 0 : (theme.mixins.toolbar.minHeight as number)) *
        (layout === 'horizontal' && !navHidden ? 2 : 1) +
      (footer === 'hidden' ? 0 : 56)
    }px + ${theme.spacing(6)} * 2)`
  }

  return (
    <>
      <Box
        className='app-chat'
        sx={{
          width: '100%',
          display: 'flex',
          borderRadius: 1,
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: 'background.paper',
          boxShadow: skin === 'bordered' ? 0 : 6,
          height: `calc(100vh - ${calculateAppHeight()})`,
          ...(skin === 'bordered' && { border: `1px solid ${theme.palette.divider}` })
        }}
      >
        {ability.can('itsHaveAccess', 'only-teacher-sidebar') && (
          <SidebarLeft
            store={store}
            hidden={hidden}
            mdAbove={mdAbove}
            dispatch={dispatch}
            statusObj={statusObj}
            userStatus={userStatus}
            selectChat={selectChat}
            getInitials={getInitials}
            sidebarWidth={sidebarWidth}
            setUserStatus={setUserStatus}
            leftSidebarOpen={leftSidebarOpen}
            removeSelectedChat={removeSelectedChat}
            userProfileLeftOpen={userProfileLeftOpen}
            formatDateToMonthShort={formatDateToMonthShort}
            handleLeftSidebarToggle={handleLeftSidebarToggle}
            handleUserProfileLeftSidebarToggle={handleUserProfileLeftSidebarToggle}
          />
        )}
        <ChatContent
          store={store}
          hidden={hidden}
          sendMsg={sendMsg}
          mdAbove={mdAbove}
          dispatch={dispatch}
          statusObj={statusObj}
          getInitials={getInitials}
          sidebarWidth={sidebarWidth}
          userProfileRightOpen={userProfileRightOpen}
          handleLeftSidebarToggle={handleLeftSidebarToggle}
          handleStartConversation={handlestartConversation}
          handleUserProfileRightSidebarToggle={handleUserProfileRightSidebarToggle}
        />
      </Box>
    </>
  )
}

Page.getLayout = (page: ReactNode) => (
  <UserLayout>
    <ChannelLayout>{page}</ChannelLayout>
  </UserLayout>
)

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'channels-chat-page'
}

export async function getServerSideProps() {
  // Return the fetched data as props
  return {
    props: {}
  }
}

export default Page

// ** Icon imports
import EmailOutline from 'mdi-material-ui/EmailOutline'
import UserIcon from 'mdi-material-ui/AccountStar'
import WalletIcon from 'mdi-material-ui/WalletGiftcard'
import VideoIcon from 'mdi-material-ui/Video'
import { CameraImage, Crosshairs, Home, Video, VideoAccount } from 'mdi-material-ui'

import NotificationsIcon from 'mdi-material-ui/BellBadge'
import BannerAdsIcon from 'mdi-material-ui/Advertisements'
import ChallengesIcon from 'mdi-material-ui/VideoBox'
import VoterPrizesIcon from 'mdi-material-ui/CurrencyUsd'
import UploadIcon from '@mui/icons-material/Upload'
import CogTransfer from 'mdi-material-ui/CogTransfer'
import AssignmentIcon from 'mdi-material-ui/ClipboardCheck'
import TelevisionIcon from 'mdi-material-ui/Television'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import SaveIcon from '@mui/icons-material/Save'
import AccessibilityIcon from '@mui/icons-material/Accessibility'
import PaymentIcon from '@mui/icons-material/Payment'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
import LiveTvIcon from '@mui/icons-material/LiveTv'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import RssFeed from '@mui/icons-material/RssFeed'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'
import DashboardIcon from '@mui/icons-material/Dashboard'
import TourIcon from '@mui/icons-material/Tour'
import FeedbackIcon from '@mui/icons-material/Feedback'
// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { useContext } from 'react'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { useAuth } from 'src/hooks/useAuth'
import SchoolIcon from '@mui/icons-material/School'

const navigation = (): VerticalNavItemsType => {
  const ability = useContext(AbilityContext)

  return [
    // {
    //   sectionTitle: 'Application Modules'
    // },
    {
      title: 'Dashboard',
      icon: DashboardIcon,
      path: '/dashboard',
      action: 'itsHaveAccess',
      subject: 'dashboard-page'
    },
    {
      title: 'Channels',
      icon: TelevisionIcon,
      path: '/channels',
      action: 'itsHaveAccess',
      subject: 'channels-page'
    },
    {
      title: 'My Courses',
      icon: SchoolIcon,
      path: '/my-courses',
      action: 'itsHaveAccess',
      subject: 'my-courses-page'
    },

    {
      title: 'Result Score',
      icon: TelevisionIcon,
      path: '/result-score',
      action: 'itsHaveAccess',
      subject: 'result-score-page'
    },
    {
      title: 'Upload Videos',
      icon: UploadIcon,
      path: '/videos',
      action: 'itsHaveAccess',
      subject: 'videos-page'
    },
    {
      title: 'Liked Videos',
      icon: ThumbUpIcon,
      path: '/like-videos',
      action: 'itsHaveAccess',
      subject: 'like-videos-page'
    },
    {
      title: 'Saved Videos',
      icon: SaveIcon,
      path: '/save-videos',
      action: 'itsHaveAccess',
      subject: 'saved-videos-page'
    },
    {
      title: 'Go Live',
      icon: LiveTvIcon,
      path: '/live',
      action: 'itsHaveAccess',
      subject: 'go-live-page'
    },
    {
      title: 'Chat',
      icon: WhatsAppIcon,
      path: '/chat',
      action: 'itsHaveAccess',
      subject: 'chat-page'
    },
    {
      title: 'Calendar',
      icon: CalendarMonthIcon,
      path: '/calendar',
      action: 'itsHaveAccess',
      subject: 'calendar-page'
    },
    {
      title: 'Community',
      icon: RssFeed,
      path: '/community-portal',
      action: 'itsHaveAccess',
      subject: 'community-page'
    },
    {
      title: 'Market Data',
      icon: CompareArrowsIcon,
      path: '/market-data',
      action: 'itsHaveAccess',
      subject: 'market-page'
    },
    {
      title: 'Crytpo Mentor',
      icon: WhatsAppIcon,
      path: '/chat-bot',
      action: 'itsHaveAccess',
      subject: 'chat-bot-page'
    },
    ...(ability?.can('itsHaveAccess', 'teachers-page')
      ? [
          {
            title: 'Teachers',
            icon: AccessibilityIcon,
            action: 'itsHaveAccess',
            subject: 'teachers-page',
            children: [
              {
                title: 'Teachers',
                icon: AccessibilityIcon,
                path: '/teachers',
                action: 'itsHaveAccess',
                subject: 'teachers-page'
              },
              {
                title: 'Teacher Details',
                icon: AccessibilityIcon,
                path: '/teachers/teacher-details',
                action: 'itsHaveAccess',
                subject: 'teachers-page'
              },
              {
                title: 'Teachers Payments',
                icon: AccessibilityIcon,
                path: '/teachers/teachers-payments',
                action: 'itsHaveAccess',
                subject: 'teachers-payments-page'
              }
            ]
          }
        ]
      : []),
    // {
    //   title: 'Teachers',
    //   icon: AccessibilityIcon,
    //   action: 'itsHaveAccess',
    //   subject: 'teachers-page',
    //   children: [
    //     {
    //       title: 'Teachers',
    //       icon: AccessibilityIcon,
    //       path: '/teachers',
    //       action: 'itsHaveAccess',
    //       subject: 'teachers-page'
    //     },
    //     {
    //       title: 'Teacher Details',
    //       icon: AccessibilityIcon,
    //       path: '/teachers/teacher-details',
    //       action: 'itsHaveAccess',
    //       subject: 'teachers-page'
    //     },
    //     {
    //       title: 'Teachers Payments',
    //       icon: AccessibilityIcon,
    //       path: '/teachers/teachers-payments',
    //       action: 'itsHaveAccess',
    //       subject: 'teachers-payments-page'
    //     }
    //   ]
    // }
    {
      title: 'Students',
      icon: AccessibilityIcon,
      path: '/students',
      action: 'itsHaveAccess',
      subject: 'students-page'
    },
    {
      title: 'Payment',
      icon: ShoppingCartIcon,
      path: '/payment',
      action: 'itsHaveAccess',
      subject: 'payment-page'
    },
    {
      title: 'Invite Friends',
      icon: PaymentIcon,
      path: '/invite-friends',
      action: 'itsHaveAccess',
      subject: 'invite-friends-page'
    },
    {
      title: 'Points',
      icon: MonetizationOnIcon,
      path: '/points',
      action: 'itsHaveAccess',
      subject: 'points-page'
    },
    {
      title: 'Points Management',
      icon: MonetizationOnIcon,
      path: '/points-management',
      action: 'itsHaveAccess',
      subject: 'points-management-page'
    },
    {
      title: 'Milestone',
      icon: TourIcon,
      path: '/milestone',
      action: 'itsHaveAccess',
      subject: 'milestone-page'
    },
    {
      title: 'Feedback',
      icon: FeedbackIcon,
      path: '/feedbacks',
      action: 'itsHaveAccess',
      subject: 'feedbacks-page'
    },
    {
      title: 'Feedback',
      icon: FeedbackIcon,
      path: '/feedback',
      action: 'itsHaveAccess',
      subject: 'feedback-page'
    }
  ]
}

export default navigation

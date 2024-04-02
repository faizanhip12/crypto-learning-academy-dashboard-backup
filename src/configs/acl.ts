import { AbilityBuilder, Ability } from '@casl/ability'

export type Subjects = string
export type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete'

export type AppAbility = Ability<[Actions, Subjects]> | undefined

export const AppAbility = Ability as any
export type ACLObj = {
  action: Actions
  subject: string
}

// export const RoleCode: {
//   SUPER_ADMIN: 'SUPER_ADMIN',
//   COMPANY_ADMIN: 'COMPANY_ADMIN',
//   ADMIN: 'ADMIN',
//   MANAGER: 'MANAGER',
//   INSPECTOR: 'INSPECTOR'
// };
/**
 * Please define your own Ability rules according to your app requirements.
 * We have just shown Admin and Client rules for demo purpose where
 * admin can manage everything and client can just visit ACL page
 */
const defineRulesFor = (role: string, subject: string) => {
  // console.log('=============defineRulesFor=========')
  // console.log('subject', subject)
  // console.log('role', role)
  // console.log('====================================')

  const { can, rules } = new AbilityBuilder(AppAbility)
  // console.log('============AbilityBuilder=========');
  // console.log('rules', rules)
  // console.log('====================================')
  // can('manage', 'all')
  // can('itsHaveAccess', 'channels-page')

  if (role === 'SUPER_ADMIN') {
    can('itsHaveAccess', 'like-videos-page')
    can('itsHaveAccess', 'points-management-page')
    can('itsHaveAccess', 'milestone-page')
    can('itsHaveAccess', 'feedbacks-page')
    can('itsHaveAccess', 'course-event-page')
    can('itsHaveAccess', 'admin-dashboard')
    can('itsHaveAccess', 'dashboard-page')
    can('itsHaveAccess', 'saved-videos-page')
    can('itsHaveAccess', 'channels-page')
    can('itsHaveAccess', 'watch-videos')
    can('itsHaveAccess', 'playlist-page')
    can('itsHaveAccess', 'students-page')
    can('itsHaveAccess', 'teachers-page')
    can('itsHaveAccess', 'teachers-payments-page')
    can('itsHaveAccess', 'subscription-button')
    can('itsHaveAccess', 'edit-subscription-details')
    can('itsHaveAccess', 'payment-page')
    can('itsHaveAccess', 'payment-drawer')
    can('itsHaveAccess', 'thead')
    can('itsHaveAccess', 'settings-profile-page')
    can('itsHaveAccess', 'change-password-page')
    can('itsHaveAccess', 'workspace-page')
    can('itsHaveAccess', 'chat-page')
    can('itsHaveAccess', 'calendar-page')
    can('itsHaveAccess', 'community-page')
    can('itsHaveAccess', 'market-page')
    can('itsHaveAccess', 'add-event-button')
    can('itsHaveAccess', 'comment-page')
    can('itsHaveAccess', 'chat-bot-page')
  } else if (role === 'TEACHER') {
    can('itsHaveAccess', 'dashboard-page')
    can('itsHaveAccess', 'teacher-certification-page')
    can('itsHaveAccess', 'channels-chat-page')
    can('itsHaveAccess', 'only-teacher-sidebar')
    // can('itsHaveAccess', 'payment-page')
    // can('itsHaveAccess', 'payment-checkout-page')
    // can('itsHaveAccess', 'payment-success-page')
    can('itsHaveAccess', 'workspace-module')
    can('itsHaveAccess', 'feedback-page')
    can('itsHaveAccess', 'student-module')
    can('itsHaveAccess', 'like-videos-page')
    can('itsHaveAccess', 'course-event-page')
    can('itsHaveAccess', 'teacher-dashboard')
    can('itsHaveAccess', 'channels-page')
    can('itsHaveAccess', 'subscribe-button')
    can('itsHaveAccess', 'watch-videos')
    can('itsHaveAccess', 'playlist-page')
    can('itsHaveAccess', 'videos-page')
    can('itsHaveAccess', 'CreatePlaylist-Header-page')
    can('itsHaveAccess', 'create-channel-button')
    can('itsHaveAccess', 'create-playlist-button')
    can('itsHaveAccess', 'settings-profile-page')
    can('itsHaveAccess', 'change-password-page')
    can('itsHaveAccess', 'saved-videos-page')
    can('itsHaveAccess', 'workspace-page')
    can('itsHaveAccess', 'student-page')
    can('itsHaveAccess', 'go-live-page')
    can('itsHaveAccess', 'upload-folder-button')
    can('itsHaveAccess', 'upload-files-button')
    can('itsHaveAccess', 'chat-page')
    can('itsHaveAccess', 'community-page')
    can('itsHaveAccess', 'calendar-page')
    can('itsHaveAccess', 'market-page')
    can('itsHaveAccess', 'START_STREAMING_BUTTON')
    can('itsHaveAccess', 'channel-drawer')
    can('itsHaveAccess', 'courses-drawer')
    can('itsHaveAccess', 'add-event-button')
    can('itsHaveAccess', 'comment-page')
    can('itsHaveAccess', 'single-student-page')
    can('itsHaveAccess', 'single-student-assignment-page')
    can('itsHaveAccess', 'chat-bot-page')
  } else if (role === 'STUDENT') {
    can('itsHaveAccess', 'dashboard-page')
    can('itsHaveAccess', 'channels-chat-page')
    can('itsHaveAccess', 'certification-module')
    can('itsHaveAccess', 'certification-page')
    can('itsHaveAccess', 'my-courses-page')
    can('itsHaveAccess', 'feedback-page')
    can('itsHaveAccess', 'enroll-now-btn')
    can('itsHaveAccess', 'like-videos-page')
    can('itsHaveAccess', 'assignment-page')
    can('itsHaveAccess', 'student-dashboard')
    can('itsHaveAccess', 'channels-page')
    can('itsHaveAccess', 'watch-videos')
    can('itsHaveAccess', 'course-event-page')
    can('itsHaveAccess', 'playlist-page')
    can('itsHaveAccess', 'community-page')
    can('itsHaveAccess', 'payment-page')
    can('itsHaveAccess', 'payment-checkout-page')
    can('itsHaveAccess', 'payment-success-page')
    can('itsHaveAccess', 'invite-friends-page')
    can('itsHaveAccess', 'points-page')
    can('itsHaveAccess', 'share-invitations-page')
    can('itsHaveAccess', 'market-page')
    can('itsHaveAccess', 'subscribe-button')
    can('itsHaveAccess', 'saved-videos-page')
    can('itsHaveAccess', 'settings-profile-page')
    can('itsHaveAccess', 'change-password-page')
    can('itsHaveAccess', 'workspace-page')
    can('itsHaveAccess', 'chat-page')
    can('itsHaveAccess', 'calendar-page')
    can('itsHaveAccess', 'comment-page')
    can('itsHaveAccess', 'chat-bot-page')

    // can('allow', 'project-add')
  } else {
    can(['read', 'create', 'update', 'delete'], subject)
  }
  return rules
}

export const buildAbilityFor = (role: string, subject: string): AppAbility => {
  return new AppAbility(defineRulesFor(role, subject), {
    // https://casl.js.org/v5/en/guide/subject-type-detection
    detectSubjectType: (object: any) => object!.type
  })
}

export const defaultACLObj: ACLObj = {
  action: 'manage',
  subject: 'all'
}

export default defineRulesFor

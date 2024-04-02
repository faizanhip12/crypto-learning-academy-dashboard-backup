// ** React Imports
import Calendar from 'src/@core/components/apps/calendar'

const Page = () => {
  return <Calendar />
}

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'calendar-page'
}

export default Page

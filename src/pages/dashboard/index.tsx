import dynamic from 'next/dynamic'
const RootLandingDashboard = dynamic(
  () => import('src/@core/components/apps/dashboard/components/RootLandingDashboard'),
  {
    ssr: false
  }
)

const Page = () => {
  return (
    <>
      <RootLandingDashboard />
    </>
  )
}

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'dashboard-page'
}

export default Page

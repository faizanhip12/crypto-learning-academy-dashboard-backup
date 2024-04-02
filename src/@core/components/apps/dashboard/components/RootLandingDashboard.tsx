import React, { Fragment, useContext } from 'react'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import AdminDashboard from './AdminDashboard'
import TeacherDashboard from './TeacherDashboard'
import StudentDashboard from './StudentDashboard'

const RootLandingDashboard = () => {
  // Hooks

  const ability = useContext(AbilityContext)

  return (
    <Fragment>
      {ability.can('itsHaveAccess', 'admin-dashboard') && <AdminDashboard />}
      {ability.can('itsHaveAccess', 'teacher-dashboard') && <TeacherDashboard />}
      {ability.can('itsHaveAccess', 'student-dashboard') && <StudentDashboard />}
    </Fragment>
  )
}

export default RootLandingDashboard

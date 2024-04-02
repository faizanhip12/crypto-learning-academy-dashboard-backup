// ** React Imports
import { useEffect } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

// ** Custom Components Imports
import Table from 'src/@core/components/apps/points/components/Table'
import { useStudents } from 'src/@core/hooks/apps/useStudents'
import { Typography } from '@mui/material'

const Page = () => {
  // ** Hooks
  const { getAllStudentsPoints } = useStudents(null)

  useEffect(() => {
    getAllStudentsPoints({ query: '' })
    return () => {}
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4' mt={2} mb={2}>
          Receive Points
        </Typography>
        <Table />
      </Grid>
    </Grid>
  )
}

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'points-page'
}

export default Page

// ** React Imports
import { useContext } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

const ACLPage = () => {
  // ** Hooks
  // const ability = useContext(AbilityContext)
  // console.log('=========ACL ability================');
  // console.log(ability);
  // console.log('====================================');

  return (
    <Grid container spacing={6}>
      <Grid item md={6} xs={12}>
        <Card>
          <CardHeader title='Common' />
          <CardContent>
            <Typography sx={{ mb: 4 }}>Report</Typography>
            <Typography sx={{ color: 'primary.main' }}> Crypto Learning Academy</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

// ACLPage.acl = {
//     action: 'read',
//     subject: 'acl-page'
// }

// ACLPage.acl = {
//     action: 'custom',
//     subject: 'custom-page'
// }

export default ACLPage

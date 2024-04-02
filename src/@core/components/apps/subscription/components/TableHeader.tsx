// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

// ** Icons Imports
import ExportVariant from 'mdi-material-ui/ExportVariant'
import { useContext } from 'react'
import { AbilityContext } from 'src/layouts/components/acl/Can'

interface TableHeaderProps {
  value: string
  toggle: () => void
  handleFilter: (val: string) => void
}

const TableHeader = (props: TableHeaderProps) => {
  const ability = useContext(AbilityContext)

  // ** Props
  const { handleFilter, value, toggle } = props

  return (
    <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      {ability.can('itsHaveAccess', 'subscription-button') && (
        <Button sx={{ mr: 4, ml: 'auto' }} onClick={toggle} variant='contained' color='primary'>
          Add Subscription
        </Button>
      )}
    </Box>
  )
}

export default TableHeader

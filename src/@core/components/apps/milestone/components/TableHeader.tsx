// ** MUI Imports
import { Typography, Button } from '@mui/material'
import Box from '@mui/material/Box'

interface TableHeaderProps {
  value: string
  toggle: () => void
  handleFilter: (val: string) => void
}

const TableHeader = (props: TableHeaderProps) => {
  const { toggle } = props
  return (
    <Box sx={{ pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end' }}>
      <Button onClick={toggle} variant='contained' color='primary'>
        Add Milestone
      </Button>
    </Box>
  )
}

export default TableHeader

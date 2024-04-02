// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

// ** Icons Imports
import ExportVariant from 'mdi-material-ui/ExportVariant'

interface TableHeaderProps {
  value: string
  toggle: () => void
  handleFilter: (val: string) => void
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { handleFilter, value, toggle } = props

  return (
    <Box sx={{ p: 5, pb: 3, display: 'flex', justifyContent: 'center' }}>
      <Button
        onClick={toggle}
        variant='contained'
        sx={{
          display: 'block',
          margin: 'auto',
          width: '100%',
          height: '50px',
          
          marginTop: 2
        }}
        color='primary'
      >
        View Reviews
      </Button>
    </Box>
  )
}

export default TableHeader

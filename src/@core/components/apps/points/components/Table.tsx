import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import Typography from '@mui/material/Typography'

// ** Utils Import
import { format } from 'date-fns'

// ** Store Imports
import { useSelector } from 'react-redux'

// ** Types Imports
import { RootState } from 'src/store'
import { Stack, Tooltip } from '@mui/material'
import { IPoints } from 'src/types/apps/points'

interface CellType {
  row: IPoints
}

const columns = [
  {
    flex: 0.2,
    minWidth: 100,
    field: 'Narration',
    headerName: 'narration',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', cursor: 'pointer' }}>
            <Tooltip title={row?.narration}>
              <Typography textTransform={'capitalize'}>{row?.narration}</Typography>
            </Tooltip>
          </Box>
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 230,
    field: 'date-time',
    headerName: 'Date/Time',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', cursor: 'pointer' }}>
            <Stack display='flex' alignItems='center'>
              <Typography
                noWrap
                component='a'
                variant='subtitle2'
                sx={{ color: 'text.primary', textDecoration: 'none' }}
              >
                {row?.createdAt ? format(new Date(row?.createdAt), 'MM/dd/yyyy') : ''}
              </Typography>
              <Typography variant='caption'>
                {row?.createdAt ? format(new Date(row?.createdAt), 'h:mm a') : ''}
              </Typography>
            </Stack>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: 'Receive',
    headerName: 'receive',
    renderCell: ({ row }: CellType) => {
      return (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
            flexDirection: 'row',
            cursor: 'pointer',
            width: '50px'
          }}
        >
          <Typography variant='body2' style={{ margin: '0 auto' }}>
            {row?.amount}
          </Typography>
        </Box>
      )
    }
  }
]

const StudentsTable = () => {
  // ** State
  const [pageSize, setPageSize] = useState<number>(10)

  // ** Hooks
  const store = useSelector((state: RootState) => state?.students)

  return (
    <DataGrid
      autoHeight
      rows={store?.points || []}
      columns={columns}
      // checkboxSelection
      pageSize={pageSize}
      disableSelectionOnClick
      rowsPerPageOptions={[10, 25, 50]}
      sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
      onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
      // components={{ Toolbar: GridToolbar }}
    />
  )
}

export default StudentsTable

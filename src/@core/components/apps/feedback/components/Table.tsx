import { useState } from 'react'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import Typography from '@mui/material/Typography'
import { useSelector } from 'react-redux'
import { RootState } from 'src/store'
import { IFeedback } from 'src/types/apps/feedback'

interface CellType {
  row: IFeedback
}

const columns = [
  {
    flex: 0.02,
    minWidth: 250,
    field: 'title',
    headerName: 'Title',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Typography noWrap component='a' variant='subtitle2' sx={{ color: 'text.primary', textDecoration: 'none' }}>
              {row.title}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 250,
    field: 'content',
    headerName: 'Content',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Typography noWrap component='a' variant='subtitle2' sx={{ color: 'text.primary', textDecoration: 'none' }}>
              {row.content}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.02,
    minWidth: 150,
    field: 'feedbackType',
    headerName: 'Feedback Type',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Typography noWrap component='a' variant='subtitle2' sx={{ color: 'text.primary', textDecoration: 'none' }}>
              {row.feedbackType}
            </Typography>
          </Box>
        </Box>
      )
    }
  }
]

const PointsTable = () => {
  const [pageSize, setPageSize] = useState<number>(10)
  const store = useSelector((state: RootState) => state.feedbacks)

  return (
    <DataGrid
      autoHeight
      rows={store.entities || []}
      columns={columns}
      pageSize={pageSize}
      disableSelectionOnClick
      getRowId={row => row.id || ''}
      rowsPerPageOptions={[10, 25, 50]}
      sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
      onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
    />
  )
}

export default PointsTable

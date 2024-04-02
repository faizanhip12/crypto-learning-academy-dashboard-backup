import { useEffect, useState } from 'react'
import Image from 'next/image'

// ** MUI Imports
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import Typography from '@mui/material/Typography'

// ** Icons Imports
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Types Imports
import { marketService } from 'src/services'
import { IMarket } from 'src/types/apps/market'
import { Button } from '@mui/material'
import { renderClient } from 'src/@core/components/common/renderClient'

interface CellType {
  row: IMarket
}

interface DataItem {
  ic: string
  avatarColor: any
  i: any
  coins: string
}

function formatNumberWithCommas(number: number) {
  return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

// Format market cap and volume abbreviations
function formatAbbreviation(value: number) {
  const suffixes = ['', 'K', 'M', 'B', 'T']
  const suffixIndex = Math.floor(Math.log10(value) / 3)
  const abbreviatedValue = (value / Math.pow(10, suffixIndex * 3)).toFixed(2)
  return `${abbreviatedValue}${suffixes[suffixIndex]}`
}

const ShowStats: React.FC<{ value: number }> = ({ value }) => {
  const Up = { background: 'rgba(8, 209, 88, 0.1)', color: '#6ccf59' }
  const Down = { background: 'rgba(205, 0, 0, 0.1)', color: '#ff0000' }
  const style = value > 0 ? Up : Down

  return (
    <Button
      startIcon={value > 0 ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      sx={{ padding: 1, borderRadius: 5, ...style, mt: 5 }}
    >
      {value}%
    </Button>
  )
}

const columns = [
  {
    flex: 0.2,
    minWidth: 280,
    field: 'Name',
    headerName: 'Name',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            {renderClient(row?.ic, row?.i)}
            <Typography noWrap component='a' variant='subtitle2' sx={{ color: 'text.primary', textDecoration: 'none' }}>
              {row?.n} <Typography variant='caption'>* {row?.s}</Typography>
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'p1',
    headerName: '1h%',
    renderCell: ({ row }: CellType) => {
      return <ShowStats value={row?.p1} />
    }
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'p24',
    headerName: '24h%',
    renderCell: ({ row }: CellType) => {
      return <ShowStats value={row?.p24} />
    }
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'p7d',
    headerName: '7d%',
    renderCell: ({ row }: CellType) => {
      return <ShowStats value={row?.p7d} />
    }
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'pu',
    headerName: 'Price',
    renderCell: ({ row }: CellType) => {
      const formattedPrice = `USD ${formatNumberWithCommas(row.pu)}`
      return <Typography variant='subtitle2'>{formattedPrice}</Typography>
    }
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'm',
    headerName: 'Market Cap',
    renderCell: ({ row }: CellType) => {
      const formattedMarketCap = `USD ${formatAbbreviation(row.m)}`
      return <Typography variant='caption'>{formattedMarketCap}</Typography>
    }
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'v',
    headerName: '24h Volume',
    renderCell: ({ row }: CellType) => {
      const formattedVolume24h = `USD ${formatAbbreviation(row.v)}`
      return <Typography variant='caption'>{formattedVolume24h}</Typography>
    }
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'graph',
    headerName: 'Price graph 24h',
    renderCell: ({ row }: CellType) => {
      return <Image width={134} height={27} src={`https://static.coinstats.app/sparks/${row.i}_1w.png`} />
    }
  }
]

const Table = () => {
  // ** State
  const [pageSize, setPageSize] = useState<number>(10)
  const [data, setData] = useState<DataItem[]>([])

  // ** Hooks

  useEffect(() => {
    const getMarketData = async () => {
      const { data } = await marketService.getAll()
      setData(data)
    }
    getMarketData()

    const interval = setInterval(() => {
      getMarketData()
    }, 5000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <DataGrid
      autoHeight
      rows={(data && 'coins' in data && (data?.coins as any)) || []}
      getRowId={row => row?.i}
      columns={columns}
      // checkboxSelection
      pageSize={pageSize}
      disableSelectionOnClick
      rowsPerPageOptions={[10, 25, 50]}
      sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
      onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
    />
  )
}

export default Table

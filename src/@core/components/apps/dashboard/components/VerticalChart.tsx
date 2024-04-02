// ** React Imports
import { forwardRef, useEffect, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'

// ** Third Party Imports
import format from 'date-fns/format'
import { CategoryScale, Chart, registerables } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import DatePicker from 'react-datepicker'

// ** Icons Imports
import ChevronDown from 'mdi-material-ui/ChevronDown'
import CalendarOutline from 'mdi-material-ui/CalendarOutline'

// ** Types
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import { useDashboard } from 'src/@core/hooks/apps/useDashboard'

interface BarProp {
  yellow: string
  labelColor: string
  borderColor: string
  gridLineColor: string
}

const ChartjsBarChart = (props: BarProp) => {
  // Hooks

  const { getAllGraphicalRepresentation, yearlyRepresentation } = useDashboard()

  useEffect(() => {
    getAllGraphicalRepresentation()
  }, [])

  // ** Props
  const { yellow, labelColor, borderColor, gridLineColor } = props

  // ** States
  const [endDate, setEndDate] = useState<DateType>(null)
  const [startDate, setStartDate] = useState<DateType>(new Date())

  Chart.register(CategoryScale, ...registerables)

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 100 },
    scales: {
      x: {
        grid: {
          borderColor,
          color: gridLineColor
        },
        ticks: { color: labelColor }
      },
      y: {
        // min: 0,
        // max: 400,
        grid: {
          borderColor,
          color: gridLineColor
        },
        ticks: {
          stepSize: 100,
          color: labelColor
        }
      }
    },
    plugins: {
      legend: { display: false }
    }
  }

  const formattedLabels = yearlyRepresentation.map((entry: any) => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const monthName = monthNames[entry.month - 1]
    const label = `${monthName}/${entry.currentYear}`
    return label
  })

  const data = {
    labels: formattedLabels,
    datasets: [
      {
        maxBarThickness: 5,
        backgroundColor: yellow,
        borderColor: 'transparent',
        data: yearlyRepresentation?.map((entry: any) => entry?.registrations)
        // data: [200, 300, 50, 80, 20, 300, 50, 800, 80, 20, 300, 50, 800]

        // borderRadius: { topRight: 10, topLeft: 10, bottomRight: 10, bottomLeft: 10 }
      }
    ]
  }

  const CustomInput = forwardRef(({ ...props }: any, ref) => {
    const startDate = format(props.start, 'MM/dd/yyyy')
    const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null

    const value = `${startDate}${endDate !== null ? endDate : ''}`

    return (
      <TextField
        {...props}
        size='small'
        value={value}
        inputRef={ref}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <CalendarOutline />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position='end'>
              <ChevronDown />
            </InputAdornment>
          )
        }}
      />
    )
  })

  const handleOnChange = (dates: any) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }

  return <Bar data={data} options={options} />
}

export default ChartjsBarChart

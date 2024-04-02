// ** React Imports
import { forwardRef, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'

// ** Third Party Imports
import format from 'date-fns/format'
import { ApexOptions } from 'apexcharts'
import DatePicker from 'react-datepicker'

// ** Icons Imports
import BellOutline from 'mdi-material-ui/BellOutline'
import ChevronDown from 'mdi-material-ui/ChevronDown'

// ** Types
import { DateType } from 'src/types/forms/reactDatepickerTypes'

// ** Component Import
import ReactApexcharts from 'src/@core/components/react-apexcharts'

interface PickerProps {
  start: Date | number
  end: Date | number
}

const ApexBarChart = () => {
  const options: ApexOptions = {
    chart: {
      //   parentHeightOffset: 0,
      //   toolbar: {
      //     show: false
      //   }
    },
    plotOptions: {
      bar: {
        borderRadius: 4,

        barHeight: '20%',
        horizontal: true,
        startingShape: 'rounded'
      }
    },
    // grid: {
    //   xaxis: {
    //     lines: {
    //       show: false
    //     }
    //   },
    //   padding: {
    //     top: -10
    //   }
    // },
    colors: ['#FF8A00'],
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: ['']
    }
  }

  const series = [
    {
      data: [700, 350, 480, 600, 210, 550, 150]
    }
  ]

  return (

    <ReactApexcharts options={options} series={series} type='bar' height={400} />


  )
}

export default ApexBarChart

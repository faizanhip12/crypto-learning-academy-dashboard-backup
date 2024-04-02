// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Component Import
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { Box } from '@mui/material'
import { DonutImg } from 'src/@core/constants/styles'

const donutColors = {
  series1: '#F68A1F',
  series2: '#EDC8A7',
  series3: '#FCB97B',
  series4: '#F9A355'
}

const DonutChart = () => {
  const options: ApexOptions = {
    legend: {
      show: true,
      position: 'right'
    },
    stroke: { width: 0 },
    labels: ['Operational', 'Networking', 'Hiring', 'R&D'],
    colors: [donutColors.series1, donutColors.series3, donutColors.series2],
    dataLabels: {
      enabled: true,
      formatter(val: string) {
        return `${parseInt(val, 10)}%`
      }
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              fontSize: '14px',
              fontFamily: 'Montserrat',
              color: '#ccc'
            },
            value: {
              fontSize: '14px',
              fontFamily: 'Montserrat',
              formatter(val: string) {
                return `${parseInt(val, 10)}`
              }
            },
            total: {
              show: true,
              fontSize: '14px',
              label: 'Operational',
              formatter() {
                return '31%'
              }
            }
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 1800,
        options: {
          chart: {
            height: 380
          },
          legend: {
            position: 'bottom'
          }
        }
      },
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 300
          },
          legend: {
            position: 'bottom'
          }
        }
      },
      {
        breakpoint: 576,
        options: {
          chart: {
            height: 320
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {
                    fontSize: '1.5rem'
                  },
                  value: {
                    fontSize: '1rem'
                  },
                  total: {
                    fontSize: '1.5rem'
                  }
                }
              }
            }
          }
        }
      }
    ]
  }

  const series = [85, 16, 50, 50]

  return (
    <DonutImg>
      <ReactApexcharts options={options} series={series} type='donut' />
    </DonutImg>
  )
}

export default DonutChart

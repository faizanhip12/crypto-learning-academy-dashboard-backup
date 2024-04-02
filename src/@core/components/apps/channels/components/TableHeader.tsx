import Button from '@mui/material/Button'
import { useContext } from 'react'
import { AlignRight } from 'src/@core/constants/styles'
import { AbilityContext } from 'src/layouts/components/acl/Can'

interface TableHeaderProps {
  value: string
  toggle: () => void
  handleFilter: (val: string) => void
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { toggle } = props

  const ability = useContext(AbilityContext)

  return (
    <>
      <AlignRight>
        {ability.can('itsHaveAccess', 'create-channel-button') && (
          <Button variant='contained' onClick={() => toggle()} color='primary'>
            Create Channel
          </Button>
        )}
      </AlignRight>
    </>
  )
}

export default TableHeader

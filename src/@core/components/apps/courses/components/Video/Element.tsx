// ** React Imports
import { Fragment } from 'react'
import Subtitle from 'src/@core/components/apps/courses/components/Subtitle'

const Element = ({ step }: { step: number }) => {
  return (
    <Fragment key={step}>
      <Subtitle />
    </Fragment>
  )
}

export default Element

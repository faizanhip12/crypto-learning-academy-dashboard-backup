import React from 'react'
import { useRouter } from 'next/router'

const Page = () => {
  const { query } = useRouter()
  // console.log(query.id)

  return <div>Page</div>
}

export default Page

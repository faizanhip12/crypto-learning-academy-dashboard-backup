import { useState } from 'react'

// ** Third Party Imports
import { useForm } from 'react-hook-form'
import { ApiParams } from 'src/types/api'
import { certificateService } from 'src/services'


export const useCertificate = (serviceId: string | null) => {
  // ** Hook

  const [certificateData, setCertificateData] = useState<{
    playList?: {
      name?: string
    }
    user?: {
      first_name?: string
      last_name?: string
    }
    createdAt: Date
  } | null>(null)

  const form = useForm({
    mode: 'onChange'
  })

  const getCertificate = async (id: string, studentId: string) => {
    const { data } = await certificateService.getById(id, studentId)
    if (data?.statusCode === '10000') {
      setCertificateData(data?.data?.certificate)
    }
  }

  const getAllCertificates = async ({ query }: ApiParams) => {
    const { data } = await certificateService.getAll({ query: '' })
  }

  return {
    form,
    getAllCertificates,
    getCertificate,
    certificateData
  }
}

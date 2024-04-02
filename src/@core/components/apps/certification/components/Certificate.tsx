import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { useCertificate } from 'src/@core/hooks/apps/useCertificate'
// @ts-ignore
import styles from './style.module.css'
import { useAuth } from 'src/hooks/useAuth'
import { Typography } from '@mui/material'

const Certificate = () => {
  const {
    query: { id, student_id }
  } = useRouter()

  const { getCertificate, certificateData } = useCertificate(null)

  const { user } = useAuth()

  useEffect(() => {
    const studentId = (user?.role.code === 'STUDENT' ? user.id : student_id) as string
    getCertificate(id as string, studentId)
  }, [id, student_id])

  if (!certificateData?.playList) {
    return (
      <Typography variant='h3' textAlign={'center'}>
        You are not eligible for certificate
      </Typography>
    )
  } else
    return (
      <>
        <div className={styles.section}>
          <div className={styles.row}>
            <div className={styles.col1}>
              <div className={styles.certificatelogo}>
                {' '}
                <Image src='/images/logos/smlogo.png' alt='' width={280} height={100} />
              </div>
              {certificateData?.createdAt && (
                <h6 className={styles.date}>
                  {formatDistanceToNow(new Date(certificateData?.createdAt), { addSuffix: true })}
                </h6>
              )}
              {/* {formatDistanceToNow(new Date(certificate?.createdAt), { addSuffix: true })} */}
              <h1 className={styles.name}>
                {certificateData?.user?.first_name + ' ' + certificateData?.user?.last_name || 'Chrelle Lewis'}{' '}
              </h1>
              <p className={styles.para}>has successfully completed</p>
              <h2 className={styles.course}>{certificateData?.playList?.name}</h2>
              <p className={styles.para}>
                an online non-credit course authorized by Google and offered through smart-chain-academy
              </p>
              <div className={styles.signature}>
                <h2 className={styles.googleline}>Smart-Chain-Academy</h2>
                <p className={styles.para}>Smart-Chain-Academy</p>
              </div>
            </div>
            <div className={styles.col2}>
              <div className={styles.courseimg}>
                <Image src='/images/logos/certify.png' alt='' width={280} height={660} />
              </div>
              <div className={styles.text}>
                <h5 className={styles.verify}>verify at coursera.org/verify/ZRNXREMC2JDZ</h5>
                <p className={styles.details}>
                  coursera has confirmed the idenitity of this individual and their participation in the
                  smart-chain-academy
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    )
}

export default Certificate

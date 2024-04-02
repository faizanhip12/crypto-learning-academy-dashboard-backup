// ** Third Party Import
import { useTranslation } from 'react-i18next'
import { useAuth } from 'src/hooks/useAuth'

interface Props {
  text: string
}

const Translations = ({ text }: Props) => {
  // ** Hook
  const { t } = useTranslation()
  const { user } = useAuth()

  return (
    <>
      {text === 'Payment' || text === 'Dashboard' || user?.invoices?.length ? null : user?.role?.code === 'STUDENT' ? (
        <div
          style={{
            position: 'absolute',
            width: '22px',
            height: '22px',
            backgroundImage: `url('/images/pages/lock.png')`,
            top: '0',
            right: '0',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'top center'
          }}
        />
      ) : null}
      {`${t(text)}`}
    </>
  )
}

export default Translations

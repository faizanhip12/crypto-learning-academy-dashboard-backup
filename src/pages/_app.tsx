// ** React Imports
import { ReactNode, useEffect } from 'react'

// ** Next Imports
import Head from 'next/head'
import { Router, useRouter } from 'next/router'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

// ** Store Imports
import { store } from 'src/store'
import { Provider } from 'react-redux'

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'
import type { EmotionCache } from '@emotion/cache'

// ** Config Imports
import 'src/configs/i18n'
import { defaultACLObj } from 'src/configs/acl'
import themeConfig from 'src/configs/themeConfig'

// ** Third Party Import
import { Toaster } from 'react-hot-toast'

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'
import AclGuard from 'src/@core/components/auth/AclGuard'
import ThemeComponent from 'src/@core/theme/ThemeComponent'
import AuthGuard from 'src/@core/components/auth/AuthGuard'
import GuestGuard from 'src/@core/components/auth/GuestGuard'
import WindowWrapper from 'src/@core/components/window-wrapper'

// ** Spinner Import
import Spinner from 'src/@core/components/spinner'

// ** Contexts
import { AuthProvider } from 'src/context/AuthContext'
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'
import { DrawerProvider } from 'src/@core/context/DrawerContext'
import { LocationProvider } from 'src/context/LocationContext'

// ** Styled Components
import ReactHotToast from 'src/@core/styles/libs/react-hot-toast'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** Prismjs Styles
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** Global css styles
import '../../styles/globals.css'
import { SocketProvider } from 'src/context/SocketContext'
import { PusherProvider } from 'src/context/PusherContext'
import * as PusherPushNotifications from '@pusher/push-notifications-web'
import Pusher from 'pusher-js'
import { useAuth } from 'src/hooks/useAuth'
import { IUser } from 'src/types/apps/user'

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  Component: NextPage
  emotionCache: EmotionCache
}

type GuardProps = {
  authGuard: boolean
  guestGuard: boolean
  children: ReactNode
}

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

const Guard = ({ children, authGuard, guestGuard }: GuardProps) => {
  if (guestGuard) {
    return <GuestGuard fallback={<Spinner />}>{children}</GuestGuard>
  } else if (!guestGuard && !authGuard) {
    return <>{children}</>
  } else {
    return <AuthGuard fallback={<Spinner />}>{children}</AuthGuard>
  }
}

// ** Configure JSS & ClassName
const App = (props: ExtendedAppProps) => {
  // Configuring Google Translator

  useEffect(() => {
    var addScript = document.createElement('script')
    addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit')
    document.body.appendChild(addScript)
    // @ts-ignore
    window.googleTranslateElementInit = googleTranslateElementInit
  }, [])

  const googleTranslateElementInit = () => {
    // @ts-ignore
    new window.google.translate.TranslateElement(
      {
        pageLanguage: 'en',
        includedLanguages: 'en,ms,ta,zh-CN,es,fr', // include this for selected languages
        // @ts-ignore
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
      },
      'google_translate_element'
    )
  }

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  // Variables
  const getLayout = Component.getLayout ?? ((page: any) => <UserLayout>{page}</UserLayout>)

  const setConfig = Component.setConfig ?? undefined

  const authGuard = Component.authGuard ?? true

  const guestGuard = Component.guestGuard ?? false

  const aclAbilities = Component.acl ?? defaultACLObj

  // useEffect(() => {
  //   const beamsClient = new PusherPushNotifications.Client({
  //     instanceId: "f90d76b2-9fc6-42cf-ab0c-4ebdf0371b85",
  //   });

  //   beamsClient.start().then(() => {
  //     console.log('first')
  //     // Build something beatiful 🌈
  //   });
  // }, []);

  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>{`${themeConfig.templateName} -  Crypto Learning  - LMS Dashboard`}</title>
          <meta name='description' content={`${themeConfig.templateName} Crypto Learning – LMS Dashboard`} />
          <meta name='keywords' content=' Crypto Learning - LMS Dashboard software' />
          <meta name='viewport' content='initial-scale=1, width=device-width' />
        </Head>
        <PusherProvider>
          <SocketProvider>
            <AuthProvider>
              <DrawerProvider>
                <SettingsProvider {...(setConfig ? { pageSettings: setConfig() } : {})}>
                  <LocationProvider>
                    <SettingsConsumer>
                      {({ settings }) => {
                        return (
                          <ThemeComponent settings={settings}>
                            <WindowWrapper>
                              <Guard authGuard={authGuard} guestGuard={guestGuard}>
                                <AclGuard aclAbilities={aclAbilities} guestGuard={guestGuard}>
                                  {getLayout(<Component {...pageProps} />)}
                                </AclGuard>
                              </Guard>
                            </WindowWrapper>
                            <ReactHotToast>
                              <Toaster
                                position={settings.toastPosition}
                                toastOptions={{ className: 'react-hot-toast' }}
                              />
                            </ReactHotToast>
                          </ThemeComponent>
                        )
                      }}
                    </SettingsConsumer>
                  </LocationProvider>
                </SettingsProvider>
              </DrawerProvider>
            </AuthProvider>
          </SocketProvider>
        </PusherProvider>
      </CacheProvider>
    </Provider>
  )
}

export default App

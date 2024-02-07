import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Footer, Navbar, PrivateRoute } from '@/components'
import { ThemeProvider as MuiThemeProvider} from '@mui/material'
import { themeProvider, StyledThemeProvider } from '@/shared'
import { EventTicketProvider } from '@/shared/hooks'
import { ToastProvider } from '@/shared/hooks/useToast'
import { ErrorProvider } from '@/shared/hooks/useDialog'
import { RegisterProvider } from '@/shared/hooks/useRegister'
import Head from 'next/head'
import Script from 'next/script'
import { SearchProvider, useSearch } from '@/shared/hooks/useSearch'
import { AuthProvider } from '@/shared/hooks/useAuth'
// import { useRouter } from 'next/router';
// import { useEffect } from 'react';
// import { isPrivateRoute } from '@/adapters';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'bipshow',
  description: 'Comprou, sorriu, curtiu.',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <MuiThemeProvider
      theme={themeProvider}
    >
      <ErrorProvider>
        <EventTicketProvider>
          <StyledThemeProvider>
          <RegisterProvider>
            <AuthProvider>
              <SearchProvider>
                    <html lang="PT-BR">
                          <Script type="text/javascript" async src="https://stc.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.directpayment.js" />
                          <Script src="https://assets.pagseguro.com.br/checkout-sdk-js/rc/dist/browser/pagseguro.min.js"></Script>
                          <Script
                          src="https://code.jquery.com/jquery-3.3.1.min.js"
                          integrity="sha384-tsQFqpEReu7ZLhBV2VZlAu7zcOV+rXbYlF2cqB8txI/8aZajjp4Bqd+V6D5IgvKT"
                          crossOrigin="anonymous"
                        />
                        <body className={inter.className + ' bg-background overflow-x-hidden'}>
                          <ToastProvider>
                                <Navbar/>
                                <div
                                  className='w-full h-full min-h-[70vh]'
                                  >
                                    <PrivateRoute>
                                      {children}
                                    </PrivateRoute>
                                </div>
                                <Footer/>
                            </ToastProvider>
                      </body>
                  </html>
              </SearchProvider>
            </AuthProvider>
          </RegisterProvider>
          </StyledThemeProvider>
        </EventTicketProvider>
      </ErrorProvider>
    </MuiThemeProvider>
  )
}

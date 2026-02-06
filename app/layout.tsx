import './global.css'
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/footer'
import { baseUrl } from './sitemap'
import { Manrope, Playfair, Playfair_Display } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'

// Configure Playfair Display (Serif)
const playfair = Playfair({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  style: ['normal', 'italic'],
})

// Configure Manrope (Sans-serif)
const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
  style: ['normal'],
})

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Jayesh Chotaliya | Embedded Software Engineer',
    template: '%s | Jayesh Chotaliya',
  },
  description: 'Embedded Software Engineer at ABB, Bangalore. Specializing in IoT, Cloud Connectivity, and Industrial Automation systems.',
  
  keywords: [
    'Jayesh Chotaliya',
    'Embedded Software Engineer',
    'ABB',
    'IoT Engineer',
    'Bangalore',
    'C++',
    'Embedded Systems',
    'OPC UA',
    'Azure IoT Hub',
    'Yocto',
    'ARM Cortex-M',
    'Industrial Automation'
  ],

  authors: [{ name: 'Jayesh Chotaliya', url: baseUrl }],
  creator: 'Jayesh Chotaliya',
  
  openGraph: {
    title: 'Jayesh Chotaliya | Embedded Software Engineer',
    description: 'Embedded Software Engineer at ABB. Building secure cloud-connected industrial systems.',
    url: baseUrl,
    siteName: 'Jayesh Chotaliya Portfolio',
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Jayesh Chotaliya | Embedded Software Engineer',
    description: 'Embedded Software Engineer at ABB. IoT & Cloud Connectivity.',
    creator: '@jayeshchotaliya',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // 6. Verification (Optional: Add if you use Google Search Console)
  // verification: {
  //   google: 'your-google-verification-code',
  // },
}

const cx = (...classes) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(
        'dark text-white bg-neutral-950',
        playfair.variable,
        manrope.variable
      )}
    >
      <body className={`font-serif antialiased max-w-2xl mx-4 mt-8 lg:mx-auto text-sm tracking-tight`}>
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ''} />
        </main>
      </body>
    </html>
  )
}

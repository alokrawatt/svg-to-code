import type { Metadata } from 'next'
import SvgToCodeConverter from '@/components/svg-to-code-converter'
import Header from '@/components/ui/Header'

export const metadata: Metadata = {
  title: 'SVG to Code Converter',
  description: 'Convert SVG files to code and vice versa with this easy-to-use tool. Upload your SVG files and get the corresponding code and D values instantly.',
  keywords: ['SVG', 'code converter','copy SVG D values' , 'SVG to code', 'code to SVG', 'convert SVG', 'SVG upload'],
  authors: [{ name: 'Your Name', url: 'https://yourwebsite.com' }],
  openGraph: {
    title: 'SVG to Code Converter',
    description: 'Convert SVG files to code and vice versa with this easy-to-use tool.',
    url: 'https://yourwebsite.com',
    siteName: 'SVG to Code Converter',
    images: [
      {
        url: 'https://yourwebsite.com/path/to/image.jpg',
        width: 800,
        height: 600,
        alt: 'SVG to Code Converter',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow p-4 md:p-24 bg-gray-100">
        <SvgToCodeConverter />
      </main>
    </div>
  )
}

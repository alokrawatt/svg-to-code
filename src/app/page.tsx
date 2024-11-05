import type { Metadata } from 'next'
import SvgToCodeConverter from '@/components/svg-to-code-converter'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/footer'

export const metadata: Metadata = {
  title: 'SVG to Code Converter',
  description: 'Convert SVG files to code and vice versa with this easy-to-use tool',
  keywords: ['SVG', 'code converter', 'SVG to code', 'code to SVG'],
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow p-4 md:p-24 bg-gray-100">
        <SvgToCodeConverter />
      </main>
      <Footer />
    </div>
  )
}

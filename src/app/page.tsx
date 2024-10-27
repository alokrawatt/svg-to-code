import type { Metadata } from 'next'
import SvgToCodeConverter from '@/components/svg-to-code-converter'

export const metadata: Metadata = {
  title: 'SVG to Code Converter',
  description: 'Convert SVG files to code and vice versa with this easy-to-use tool',
  keywords: ['SVG', 'code converter', 'SVG to code', 'code to SVG'],
}

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-24">
      <SvgToCodeConverter />
    </main>
  )
}

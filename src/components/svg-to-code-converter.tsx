"use client"
import { useState, useCallback, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowLeftRight, ClipboardCopy, Upload, Download } from 'lucide-react'

export default function Component() {
  const [svgCode, setSvgCode] = useState('')
  const [svgPreview, setSvgPreview] = useState('')
  const [isCopied, setIsCopied] = useState(false)

  const svgContainerRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setSvgCode(content)
        setSvgPreview(content)
      }
      reader.readAsText(file)
    }
  }

  const handleCodeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSvgCode(event.target.value)
    setSvgPreview(event.target.value)
  }

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(svgCode).then(() => {
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    }).catch(err => {
      console.error('Failed to copy text: ', err)
    })
  }, [svgCode])

  const downloadSVG = useCallback(() => {
    const blob = new Blob([svgCode], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'image.svg'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [svgCode])

  useEffect(() => {
    if (svgContainerRef.current && svgPreview) {
      const container = svgContainerRef.current
      const svgElement = container.querySelector('svg')
      if (svgElement) {
        svgElement.setAttribute('width', '100%')
        svgElement.setAttribute('height', '100%')
        svgElement.style.maxWidth = '100%'
        svgElement.style.maxHeight = '100%'
      }
    }
  }, [svgPreview])

  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      const lineNumbers = textarea.value.split('\n').map((_, index) => index + 1).join('\n')
      textarea.style.backgroundImage = `linear-gradient(transparent, transparent calc(100% - 0.5em)), url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='${textarea.scrollHeight}'><text x='0' y='15' fill='%23999' font-size='12'>${lineNumbers}</text></svg>")`
      textarea.style.backgroundAttachment = 'local'
      textarea.style.backgroundPosition = '0 0'
      textarea.style.backgroundRepeat = 'no-repeat'
      textarea.style.backgroundSize = '40px 100%'
      textarea.style.paddingLeft = '40px'
    }
  }, [svgCode])

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center flex items-center justify-center">
            SVG <ArrowLeftRight className="mx-2" /> Code
          </CardTitle>
          <CardDescription className="text-center">
            Convert SVG image to code and vice versa.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <input
                  type="file"
                  accept=".svg"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="svg-upload"
                />
                <label
                  htmlFor="svg-upload"
                  className="cursor-pointer flex flex-col items-center justify-center h-40"
                >
                  <Upload className="w-12 h-12 text-gray-400" />
                  <span className="mt-2 text-sm">Drop SVG file here or click to upload</span>
                </label>
              </div>
              <Button className="w-full" onClick={() => document.getElementById('svg-upload')?.click()}>
                Choose File
              </Button>
            </div>
            <textarea
              ref={textareaRef}
              placeholder="Paste SVG code here..."
              value={svgCode}
              onChange={handleCodeChange}
              className="h-full min-h-[10rem] w-full p-2 border rounded-md font-mono text-sm"
              style={{ lineHeight: '1.5em' }}
            />
          </div>
          <div className="flex justify-end mt-4">
            <Button variant="outline" onClick={copyToClipboard}>
              <ClipboardCopy className="mr-2 h-4 w-4" /> {isCopied ? 'Copied!' : 'Copy SVG code'}
            </Button>
          </div>
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">SVG Preview</h3>
            <div className="border rounded-lg p-4 h-64 flex items-center justify-center bg-gray-100 overflow-hidden">
              <div className="w-full h-full" ref={svgContainerRef} dangerouslySetInnerHTML={{ __html: svgPreview }} />
            </div>
            <div className="mt-4 flex justify-center">
              <Button variant="outline" onClick={downloadSVG}>
                <Download className="mr-2 h-4 w-4" /> Download SVG
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
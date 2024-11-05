"use client"
import { useState, useCallback, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowLeftRight, ClipboardCopy, Upload } from 'lucide-react'

export default function SvgToCodeConverter() {
  const [svgCode, setSvgCode] = useState<string>('')
  const [svgPreview, setSvgPreview] = useState<string>('')
  const [isCopied, setIsCopied] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const svgContainerRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const validateSvgContent = (content: string): boolean => {
    const trimmedContent = content.trim().replace(/<!--.*?-->/g, '');
    const svgStart = trimmedContent.toLowerCase().indexOf('<svg');
    const svgEnd = trimmedContent.toLowerCase().indexOf('</svg>');

    return (
        svgStart !== -1 &&
        svgEnd !== -1 &&
        svgStart < svgEnd &&
        trimmedContent.includes('xmlns')
    );
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (!file.type.includes('svg')) {
        setError('Please upload an SVG file')
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        console.log('Uploaded SVG content:', content);
        if (validateSvgContent(content)) {
          setError(null)
          setSvgCode(content)
          setSvgPreview(content)
        } else {
          setError('Invalid SVG content')
        }
      }
      reader.onerror = () => {
        setError('Error reading file')
      }
      reader.readAsText(file)
    }
  }

  const handleCodeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = event.target.value
    setSvgCode(content)
    if (content && !validateSvgContent(content)) {
      setError('Invalid SVG content')
    } else {
      setError(null)
      setSvgPreview(content)
    }
  }

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(svgCode)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      setError('Failed to copy to clipboard')
    }
  }, [svgCode])

  const downloadSVG = useCallback(() => {
    try {
        // Create a temporary SVG element to modify its attributes
        const tempSvg = new DOMParser().parseFromString(svgCode, "image/svg+xml");
        const svgElement = tempSvg.querySelector('svg');

        if (svgElement) {
            // Set width and height to ensure proper scaling
            svgElement.setAttribute('width', '800'); // Set desired width
            svgElement.setAttribute('height', '600'); // Set desired height
        }

        const updatedSvgCode = new XMLSerializer().serializeToString(tempSvg);
        const blob = new Blob([updatedSvgCode], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'converted-image.svg';

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } catch (err) {
        setError('Failed to download SVG');
    }
}, [svgCode]);

  const copyDValues = useCallback(() => {
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgCode, "image/svg+xml");
    const paths = svgDoc.getElementsByTagName("path");
    const dValues = Array.from(paths).map((path) => path.getAttribute("d")).filter(Boolean).join(", ");
    
    if (dValues) {
      navigator.clipboard.writeText(dValues).then(() => {
        alert("Copied D values: " + dValues);
      }).catch(() => {
        setError('Failed to copy D values');
      });
    } else {
      setError('No path elements found in SVG');
    }
  }, [svgCode]);

  useEffect(() => {
    if (svgContainerRef.current && svgPreview && !error) {
      try {
        const container = svgContainerRef.current
        container.innerHTML = svgPreview
        const svgElement = container.querySelector('svg')
        if (svgElement) {
          svgElement.setAttribute('width', '100%')
          svgElement.setAttribute('height', '100%')
          svgElement.style.maxWidth = '100%'
          svgElement.style.maxHeight = '100%'
        }
      } catch (err) {
        setError('Error rendering SVG preview')
      }
    }
  }, [svgPreview, error])

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
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
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
              <Button 
                className="w-full" 
                onClick={() => document.getElementById('svg-upload')?.click()}
              >
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
          <div className="flex justify-end mt-4 space-x-2">
            <Button 
              variant="outline" 
              onClick={copyToClipboard}
              disabled={!svgCode || !!error}
            >
              <ClipboardCopy className="mr-2 h-4 w-4" />
              {isCopied ? 'Copied!' : 'Copy SVG code'}
            </Button>
            <Button 
              variant="outline" 
              onClick={copyDValues}
              disabled={!svgCode || !!error}
            >
              Copy D Values
            </Button>
          </div>
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">SVG Preview</h3>
            <div className="border rounded-lg p-4 h-64 flex items-center justify-center bg-gray-100 overflow-hidden">
              <div 
                className="w-full h-full" 
                ref={svgContainerRef}
              />
            </div>
            <div className="mt-4 flex justify-center">
              <Button 
                variant="outline" 
                onClick={downloadSVG}
                disabled={!svgCode || !!error}
              >
                Download SVG
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

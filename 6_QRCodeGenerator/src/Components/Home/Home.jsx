
import { useState, useEffect } from "react"

export default function QRCodeGenerator() {
  const [qrCode, setQrCode] = useState(null)
  const [loading, setLoading] = useState(false)
  const [inputData, setInputData] = useState("")
  const [error, setError] = useState("")

  const API_KEY = "B9i1uTG5Jz4iYO2Gkct23w==bVSONreqE5xIN9iW"

  // Clean up any object URLs when component unmounts
  useEffect(() => {
    return () => {
      if (qrCode && qrCode.startsWith("blob:")) {
        URL.revokeObjectURL(qrCode)
      }
    }
  }, [qrCode])

  // Convert Blob to base64 data URL
  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  }

  const generateQRCode = async () => {
    if (!inputData.trim()) {
      setError("Please enter some data!")
      return
    }

    setLoading(true)
    setError("")
    setQrCode(null)

    const API_URL = `https://api.api-ninjas.com/v1/qrcode?data=${encodeURIComponent(inputData)}&format=png`

    try {
      console.log("Fetching QR Code from:", API_URL)

      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          "X-Api-Key": API_KEY,
        },
      })

      console.log("API Response status:", response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Error response:", errorText)
        throw new Error(`Failed to generate QR code: ${response.status} ${response.statusText}`)
      }

      // Get the blob data
      const blob = await response.blob()
      console.log("Blob size:", blob.size, "bytes")
      console.log("Blob type:", blob.type)

      if (blob.size === 0) {
        throw new Error("Received empty blob from API")
      }

      // Convert blob to base64 data URL instead of object URL
      const base64Data = await blobToBase64(blob)
      console.log("Base64 data created (first 50 chars):", base64Data.substring(0, 50) + "...")
      setQrCode(base64Data)
    } catch (error) {
      console.error("Error generating QR code:", error)
      setError(`Failed to generate QR code: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  // Alternative approach using direct API response
  const generateQRCodeAlternative = async () => {
    if (!inputData.trim()) {
      setError("Please enter some data!")
      return
    }

    setLoading(true)
    setError("")
    setQrCode(null)

    try {
      // Using a different approach - direct data URL
      const dataUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(inputData)}`
      setQrCode(dataUrl)
      console.log("Using direct QR code URL:", dataUrl)
    } catch (error) {
      console.error("Error with alternative method:", error)
      setError(`Failed to generate QR code: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">QR Code Generator</h2>
      <div className="flex w-full mb-4">
        <input
          type="text"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          placeholder="Enter text or URL"
          className="flex-1 p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Alternative method button */}
      <button
        onClick={generateQRCodeAlternative}
        className="mb-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
        disabled={loading}
      >
         Generate QR
      </button>

      {error && <div className="mt-2 p-2 bg-red-100 text-red-700 rounded-md w-full">{error}</div>}

      {loading && (
        <div className="my-4 flex items-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mr-2"></div>
          Generating QR code...
        </div>
      )}

      {qrCode && !loading && (
        <div className="mt-6 flex flex-col items-center">
          <h4 className="text-lg font-medium mb-2">Generated QR Code:</h4>
          <div className="border-2 border-gray-300 p-2 rounded-md">
            <img
              src={qrCode || "/placeholder.svg"}
              alt="QR Code"
              className="max-w-full h-auto"
              onError={(e) => {
                console.error("Image failed to load")
                setError("Failed to display QR code image. Try the alternative method.")
                console.log("Image src that failed:", qrCode?.substring(0, 100) + "...")
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}


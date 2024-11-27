export function encode(
    imageData: Buffer,
    message: string,
  ): Buffer {
    // Convert message to binary string with length prefix
    const messageLength = message.length
    const lengthBinary = messageLength.toString(2).padStart(32, '0')  // Increased to 32 bits
    const messageBinary = message
      .split('')
      .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
      .join('')
    
    const binaryData = lengthBinary + messageBinary
    
    // Create a copy of the image data
    const output = Buffer.from(imageData)
    
    // Encode each bit
    for (let i = 0; i < binaryData.length; i++) {
      const bit = parseInt(binaryData[i])
      const byteIndex = Math.floor(i / 3) * 4 + (i % 3)
      
      if (byteIndex < output.length) {
        // Clear LSB and set it to message bit
        output[byteIndex] = (output[byteIndex] & 0xFE) | bit
      }
    }
    
    return output
  }
  
  export function decode(
    imageData: Buffer,
    width: number,
    height: number
  ): string {
    // First extract the length (32 bits)
    let lengthBinary = ''
    for (let i = 0; i < 32; i++) {
      const byteIndex = Math.floor(i / 3) * 4 + (i % 3)
      if (byteIndex < imageData.length) {
        lengthBinary += (imageData[byteIndex] & 1).toString()
      }
    }
    
    // Convert binary length to integer
    const messageLength = parseInt(lengthBinary, 2)
    
    // Validate message length
    if (messageLength <= 0 || messageLength > 10000) {  // Added reasonable limit
      throw new Error('Invalid message length detected')
    }
    
    // Extract message bits
    const totalBits = messageLength * 8
    let messageBinary = ''
    
    for (let i = 32; i < 32 + totalBits; i++) {  // Start after length bits
      const byteIndex = Math.floor(i / 3) * 4 + (i % 3)
      if (byteIndex < imageData.length) {
        messageBinary += (imageData[byteIndex] & 1).toString()
      }
    }
    
    // Convert binary message to text
    let message = ''
    for (let i = 0; i < messageBinary.length; i += 8) {
      const byte = messageBinary.slice(i, i + 8)
      if (byte.length === 8) {
        const charCode = parseInt(byte, 2)
        // Validate character code
        if (charCode >= 32 && charCode <= 126) {  // Standard ASCII range
          message += String.fromCharCode(charCode)
        }
      }
    }
    
    return message
  }
  
  // Helper functions remain the same
  export function canEncodeMessage(
    width: number,
    height: number,
    message: string
  ): boolean {
    const totalPixels = width * height
    const availableBits = totalPixels * 3
    const requiredBits = 32 + (message.length * 8)  // Updated to 32 bits for length
    return availableBits >= requiredBits
  }
  
  export function getMaxMessageLength(
    width: number,
    height: number
  ): number {
    const totalPixels = width * height
    const availableBits = totalPixels * 3
    const maxBits = availableBits - 32  // Updated to 32 bits for length
    return Math.floor(maxBits / 8)
  }
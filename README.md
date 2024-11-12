# Image Steganography Web App

A Next.js web application for hiding and revealing secret messages in images using LSB (Least Significant Bit) steganography.

## Features

- Hide text messages within images
- Decode hidden messages from images
- Support for JPG, PNG, and HEIC image formats
- Secure LSB encoding algorithm
- Modern, responsive UI

## Technologies Used

- Next.js 14
- TypeScript
- Tailwind CSS
- Sharp for image processing
- HEIC-Convert for HEIC support for apple phones

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/your-username/steganography-app.git
```

2. Install dependencies:
```bash
cd steganography-app
npm install
pnpm install
```

3. Run the development server:
```bash
npm run dev
pnpm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How It Works

This application uses LSB (Least Significant Bit) steganography to hide messages in images:

1. The message is converted to binary
2. Each bit of the message is stored in the least significant bit of the image's RGB values
3. The process is reversible, allowing the hidden message to be extracted

## License

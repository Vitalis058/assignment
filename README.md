# AI Document Assistant

An intelligent document processing application that can parse PDF and text files, extract their content, and provide AI-powered improvements to make the text more clear, concise, and professional.

## Features

- 📄 PDF and Text File Support
- 🔍 OCR-powered PDF Text Extraction
- ✨ AI-powered Text Enhancement
- 👀 Side-by-side Document Comparison
- 💡 Interactive Suggestions Panel
- 🎨 Modern, Responsive UI with Shadcn/ui

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Zustand (State Management)
- Shadcn/ui Components
- OCR.space API
- OpenRouter AI API

## Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- npm or yarn package manager
- Required API keys (see Environment Variables section)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd assignment
```

2. Install dependencies:

```bash
npm install
# or
yarn
```

3. Set up environment variables (see next section)

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# OCR.space API key for PDF processing
OCR_SPACE_API_KEY=your_ocr_space_api_key

# OpenRouter API key for AI text enhancement
OPENROUTER_API_KEY=your_openrouter_api_key
```

### Getting the API Keys

1. **OCR.space API Key:**

   - Sign up at [OCR.space](https://ocr.space/ocrapi)
   - Get your free API key from the dashboard
   - Free tier includes 25,000 requests per month

2. **OpenRouter API Key:**
   - Visit [OpenRouter](https://openrouter.ai/)
   - Create an account and get your API key
   - Supports multiple AI models including Microsoft's MAI-DS-R1

## Usage

1. Upload a document using the drag-and-drop interface or file picker
2. The application will automatically:
   - Extract text from PDFs using OCR
   - Process text files directly
   - Generate AI-powered improvements
3. View the original and improved versions side by side
4. Accept or reject suggested improvements
5. Copy the final improved text

## Project Structure

- `/src/app/api/*` - API routes for PDF processing and text enhancement
- `/src/components/*` - React components including the UI components
- `/src/store/*` - State management using Zustand
- `/src/lib/*` - Utility functions and helpers

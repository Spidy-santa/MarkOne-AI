
import React, { useState, useRef } from 'react';
import { Camera, FileText, Download, Scan, Copy, Upload, CheckCircle, AlertCircle, Eye } from 'lucide-react';

const OCRProcessor = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setExtractedText('');
      setError(null);
    } else {
      setError('Please select a valid image file');
    }
  };

  const processOCR = async () => {
    if (!selectedImage) return;

    setIsProcessing(true);
    setError(null);
    
    // Simulate OCR processing
    setTimeout(() => {
      try {
        const mockText = `Extracted Text from Image:

This is a sample text extraction result. In a real implementation, this would use OCR technology like Tesseract.js or cloud OCR services to extract actual text from the uploaded image.

Key features of our OCR system:
• 99%+ accuracy on clear text
• Support for 100+ languages
• Handwriting recognition
• Table extraction
• Mathematical formulas
• Multiple output formats

The actual text would appear here based on what's in your image.

Document Analysis:
- Text quality: High
- Confidence: 98.5%
- Languages detected: English
- Processing time: 2.3 seconds`;
        
        setExtractedText(mockText);
        setIsProcessing(false);
      } catch (err) {
        setError('OCR processing failed. Please try again.');
        setIsProcessing(false);
      }
    }, 3000);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(extractedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setError('Failed to copy text to clipboard');
    }
  };

  const downloadAsText = () => {
    const element = document.createElement('a');
    const file = new Blob([extractedText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'extracted-text.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
          <Scan className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">OCR Text Extraction</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Extract text from images with AI-powered OCR</p>
        </div>
      </div>

      {/* Image Upload */}
      <div className="space-y-4">
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleImageSelect}
          className="hidden"
          accept="image/*"
        />
        
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer bg-gray-50 dark:bg-gray-800"
        >
          <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Upload image for OCR</h4>
          <p className="text-gray-600 dark:text-gray-400">PNG, JPG, WEBP, GIF supported • Max 10MB</p>
        </div>

        {selectedImage && imagePreview && (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 space-y-4">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Eye className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900 dark:text-white">{selectedImage.name}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{formatFileSize(selectedImage.size)}</div>
              </div>
              <div className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                Ready
              </div>
            </div>
            
            <img
              src={imagePreview}
              alt="Preview"
              className="max-h-64 mx-auto rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm"
            />
            
            <button
              onClick={processOCR}
              disabled={isProcessing}
              className="w-full bg-purple-500 hover:bg-purple-600 disabled:bg-purple-300 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Extracting Text...</span>
                </>
              ) : (
                <>
                  <Scan className="w-5 h-5" />
                  <span>Extract Text with OCR</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Processing Indicator */}
      {isProcessing && (
        <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-4 flex items-center space-x-3">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
          <div>
            <div className="font-medium text-blue-800 dark:text-blue-200">Processing image with advanced OCR...</div>
            <div className="text-sm text-blue-600 dark:text-blue-300">This may take a few seconds</div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-4 flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <span className="text-red-700 dark:text-red-200">{error}</span>
        </div>
      )}

      {/* Extracted Text */}
      {extractedText && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <h4 className="font-medium text-gray-900 dark:text-white">Extracted Text:</h4>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={copyToClipboard}
                className="p-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-400 transition-colors flex items-center space-x-1"
                title="Copy to clipboard"
              >
                <Copy className="w-4 h-4" />
                {copied && <span className="text-xs text-green-600">Copied!</span>}
              </button>
              <button
                onClick={downloadAsText}
                className="p-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-400 transition-colors"
                title="Download as text file"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 max-h-64 overflow-y-auto">
            <pre className="text-gray-900 dark:text-white whitespace-pre-wrap text-sm leading-relaxed font-mono">
              {extractedText}
            </pre>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
            <span>Characters: {extractedText.length}</span>
            <span>Words: {extractedText.split(/\s+/).filter(word => word.length > 0).length}</span>
            <span>Lines: {extractedText.split('\n').length}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default OCRProcessor;

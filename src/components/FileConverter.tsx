
import React, { useState, useRef } from 'react';
import { Upload, Download, FileText, Image, FileSpreadsheet, Film, Music, Zap, CheckCircle, AlertCircle } from 'lucide-react';

const FileConverter = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [convertTo, setConvertTo] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const [convertedFile, setConvertedFile] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const supportedConversions = {
    document: {
      from: ['pdf', 'docx', 'txt', 'html', 'rtf'],
      to: ['pdf', 'docx', 'txt', 'html', 'rtf'],
      icon: FileText,
      color: 'blue'
    },
    spreadsheet: {
      from: ['xlsx', 'csv', 'json', 'ods'],
      to: ['xlsx', 'csv', 'json', 'ods'],
      icon: FileSpreadsheet,
      color: 'green'
    },
    image: {
      from: ['png', 'jpg', 'jpeg', 'webp', 'bmp', 'gif'],
      to: ['png', 'jpg', 'jpeg', 'webp', 'bmp', 'gif'],
      icon: Image,
      color: 'purple'
    },
    video: {
      from: ['mp4', 'avi', 'mov', 'mkv'],
      to: ['mp4', 'avi', 'mov', 'mkv'],
      icon: Film,
      color: 'red'
    },
    audio: {
      from: ['mp3', 'wav', 'flac', 'aac'],
      to: ['mp3', 'wav', 'flac', 'aac'],
      icon: Music,
      color: 'yellow'
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setConvertedFile(null);
      setError(null);
    }
  };

  const handleConvert = async () => {
    if (!selectedFile || !convertTo) return;

    setIsConverting(true);
    setError(null);
    
    // Simulate conversion process
    setTimeout(() => {
      try {
        // In a real app, this would make an API call to the backend
        const mockConvertedUrl = URL.createObjectURL(selectedFile);
        setConvertedFile(mockConvertedUrl);
        setIsConverting(false);
      } catch (err) {
        setError('Conversion failed. Please try again.');
        setIsConverting(false);
      }
    }, 2000);
  };

  const getFileType = (filename: string) => {
    const extension = filename.split('.').pop()?.toLowerCase() || '';
    for (const [type, config] of Object.entries(supportedConversions)) {
      if (config.from.includes(extension)) {
        return type;
      }
    }
    return 'unknown';
  };

  const getAvailableFormats = () => {
    if (!selectedFile) return [];
    const fileType = getFileType(selectedFile.name);
    return supportedConversions[fileType as keyof typeof supportedConversions]?.to || [];
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
        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
          <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Universal File Converter</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Convert between 20+ file formats instantly</p>
        </div>
      </div>

      {/* File Upload */}
      <div className="space-y-4">
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelect}
          className="hidden"
          accept=".pdf,.docx,.txt,.html,.xlsx,.csv,.json,.png,.jpg,.jpeg,.webp,.mp4,.mp3,.wav"
        />
        
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer bg-gray-50 dark:bg-gray-800"
        >
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Choose file to convert</h4>
          <p className="text-gray-600 dark:text-gray-400">Supports documents, images, audio, video, and spreadsheets</p>
        </div>

        {selectedFile && (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 flex items-center space-x-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900 dark:text-white">{selectedFile.name}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{formatFileSize(selectedFile.size)}</div>
            </div>
            <div className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
              Ready
            </div>
          </div>
        )}
      </div>

      {/* Format Selection */}
      {selectedFile && (
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-900 dark:text-white">Convert to:</label>
          <select
            value={convertTo}
            onChange={(e) => setConvertTo(e.target.value)}
            className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select output format...</option>
            {getAvailableFormats().map(format => (
              <option key={format} value={format}>
                {format.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Convert Button */}
      {selectedFile && convertTo && (
        <button
          onClick={handleConvert}
          disabled={isConverting}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
        >
          {isConverting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Converting...</span>
            </>
          ) : (
            <>
              <Zap className="w-5 h-5" />
              <span>Convert to {convertTo.toUpperCase()}</span>
            </>
          )}
        </button>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-4 flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <span className="text-red-700 dark:text-red-200">{error}</span>
        </div>
      )}

      {/* Download Result */}
      {convertedFile && (
        <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <div>
              <div className="font-medium text-green-800 dark:text-green-200">Conversion complete!</div>
              <div className="text-sm text-green-600 dark:text-green-300">Your file is ready for download</div>
            </div>
          </div>
          <a
            href={convertedFile}
            download={`converted.${convertTo}`}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </a>
        </div>
      )}

      {/* Supported Formats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
        {Object.entries(supportedConversions).map(([type, config]) => {
          const IconComponent = config.icon;
          return (
            <div key={type} className="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
              <IconComponent className="w-8 h-8 text-gray-600 dark:text-gray-400 mx-auto mb-2" />
              <div className="text-sm font-medium text-gray-900 dark:text-white capitalize">{type}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">{config.from.length} formats</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FileConverter;

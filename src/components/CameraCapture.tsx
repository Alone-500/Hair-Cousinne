import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Camera, RefreshCw, Upload, Sparkles, Check, AlertCircle, X } from 'lucide-react';

interface CameraCaptureProps {
  onCapture: (base64Image: string) => void;
  isLoading: boolean;
  onNotify?: (title: string, message?: string) => void;
}

export const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, isLoading, onNotify }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);

  // Start webcam
  const startCamera = useCallback(async (mode: 'user' | 'environment' = facingMode) => {
    setCameraError(null);
    try {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: mode,
          width: { ideal: 1280 },
          height: { ideal: 960 },
        },
        audio: false,
      });

      setStream(mediaStream);
      setCameraActive(true);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }
    } catch (err: any) {
      setCameraActive(false);
      const friendlyMsg = err?.name === 'NotAllowedError' || err?.name === 'PermissionDeniedError'
        ? 'Camera permission was paused. You can enable it in your browser settings or tap "Upload Photo" below.'
        : 'Camera is currently in use or unavailable on this browser. You can select any photo from your phone gallery.';
      setCameraError(friendlyMsg);
      if (onNotify) {
        onNotify('Camera Notice', friendlyMsg);
      }
    }
  }, [facingMode, stream, onNotify]);

  // Stop camera tracks
  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setCameraActive(false);
  }, [stream]);

  // Clean up stream on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  // Handle capture snapshot
  const captureSnapshot = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current || document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (facingMode === 'user') {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.88);
    setPreviewImage(dataUrl);
    stopCamera();
    if (onNotify) {
      onNotify('Photo Captured', 'Your hair and facial structure photo is ready for analysis.');
    }
  };

  // Trigger 3s timer capture
  const handleTimedCapture = () => {
    setCountdown(3);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(timer);
          captureSnapshot();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Flip camera front/back
  const toggleCameraFacing = () => {
    const nextMode = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(nextMode);
    startCamera(nextMode);
  };

  // Handle file upload
  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      if (onNotify) {
        onNotify('File Format Notice', 'Please choose a standard image file like JPG, PNG, or WEBP.');
      }
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setPreviewImage(result);
        stopCamera();
        if (onNotify) {
          onNotify('Photo Loaded', 'Ready to analyze your facial architecture.');
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  // Reset preview
  const handleRetake = () => {
    setPreviewImage(null);
    startCamera(facingMode);
  };

  // Confirm and start analysis
  const handleConfirm = () => {
    if (previewImage) {
      onCapture(previewImage);
    }
  };

  return (
    <div className="w-full bg-[#11141c] rounded-2xl border border-slate-800 p-3 sm:p-5 md:p-6 shadow-2xl relative max-w-full overflow-hidden">
      <canvas ref={canvasRef} className="hidden" />
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.[0]) handleFile(e.target.files[0]);
        }}
      />

      {/* Snapshot Preview Mode */}
      {previewImage ? (
        <div className="flex flex-col items-center max-w-full">
          <div className="relative w-full max-w-md aspect-[3/4] max-h-[460px] rounded-xl overflow-hidden border-2 border-amber-500/50 shadow-2xl bg-black">
            <img
              src={previewImage}
              alt="Hair snapshot preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs text-amber-300 font-medium flex items-center gap-1.5 shadow-sm">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Photo Ready</span>
            </div>
            <button
              type="button"
              onClick={handleRetake}
              disabled={isLoading}
              className="absolute top-3 right-3 p-2 bg-black/75 hover:bg-black text-slate-300 hover:text-white rounded-lg border border-white/10 transition-colors"
              title="Retake photo"
              aria-label="Retake photo"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md">
            <button
              type="button"
              onClick={handleRetake}
              disabled={isLoading}
              className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold transition-colors flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retake Photo</span>
            </button>

            <button
              type="button"
              onClick={handleConfirm}
              disabled={isLoading}
              className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Analyzing Facial Geometry...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>Analyze Face & Recommend Haircuts</span>
                </>
              )}
            </button>
          </div>
        </div>
      ) : cameraActive ? (
        /* Live Camera Active View */
        <div className="flex flex-col items-center max-w-full">
          <div className="relative w-full max-w-md aspect-[3/4] max-h-[480px] rounded-xl overflow-hidden border border-slate-700 bg-black shadow-inner flex items-center justify-center">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`}
            />

            {/* BARBER ALIGNMENT OVERLAY */}
            <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center p-4">
              <div className="relative w-[74%] h-[78%] rounded-[50%/60%] border-2 border-dashed border-amber-400/70 shadow-[0_0_20px_rgba(245,158,11,0.2)] flex flex-col justify-between items-center py-4">
                <div className="w-3/4 border-t border-amber-300/60 text-[10px] text-amber-300 font-mono text-center pt-0.5 uppercase tracking-wider">
                  Align Hairline Here
                </div>
                <div className="w-5/6 flex items-center justify-between text-[9px] text-amber-300/80 font-mono px-1">
                  <span>◄ Eye Line</span>
                  <span>Eye Line ►</span>
                </div>
                <div className="w-1/2 border-b border-amber-300/60 text-[10px] text-amber-300 font-mono text-center pb-0.5 uppercase tracking-wider">
                  Chin Base
                </div>
              </div>
            </div>

            {/* Countdown Overlay */}
            {countdown !== null && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-30">
                <span className="text-7xl font-extrabold text-amber-400 animate-ping">
                  {countdown}
                </span>
              </div>
            )}

            {/* Top controls */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20">
              <span className="bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] sm:text-[11px] text-slate-300 border border-white/10 truncate max-w-[65%]">
                Center face & hair
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={toggleCameraFacing}
                  className="p-2 bg-black/75 hover:bg-black text-white rounded-lg border border-white/10 backdrop-blur-md transition-colors"
                  title="Switch camera"
                  aria-label="Switch camera"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={stopCamera}
                  className="p-2 bg-black/75 hover:bg-black text-white rounded-lg border border-white/10 backdrop-blur-md transition-colors"
                  title="Close camera"
                  aria-label="Close camera"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Bottom Shutter Controls */}
            <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-3 sm:gap-4 z-20 px-2">
              <button
                type="button"
                onClick={handleTimedCapture}
                className="px-3 py-2 bg-black/80 hover:bg-black text-amber-300 rounded-lg border border-amber-500/30 text-xs font-semibold backdrop-blur-md transition-colors active:scale-95"
              >
                3s Timer
              </button>

              <button
                type="button"
                onClick={captureSnapshot}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-amber-500 hover:bg-amber-400 p-1.5 shadow-xl shadow-amber-500/40 transition-transform active:scale-90 flex items-center justify-center"
                title="Take picture"
                aria-label="Capture snapshot"
              >
                <div className="w-full h-full rounded-full border-2 border-slate-950 flex items-center justify-center bg-amber-400">
                  <Camera className="w-6 h-6 text-slate-950" />
                </div>
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-2 bg-black/80 hover:bg-black text-slate-300 rounded-lg border border-white/10 text-xs font-semibold backdrop-blur-md transition-colors active:scale-95"
              >
                Upload File
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Idle Mode: Start Camera or Upload Option */
        <div className="flex flex-col items-center max-w-full">
          {cameraError && (
            <div className="w-full max-w-xl mb-4 p-3.5 rounded-xl bg-amber-950/40 border border-amber-600/50 text-amber-200 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>{cameraError}</span>
            </div>
          )}

          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`w-full max-w-xl rounded-xl border-2 border-dashed p-6 sm:p-8 md:p-10 flex flex-col items-center justify-center text-center transition-all ${
              dragActive
                ? 'border-amber-400 bg-amber-950/20'
                : 'border-slate-800 bg-[#0d1017] hover:border-slate-700'
            }`}
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-3.5 shadow-inner">
              <Camera className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
              Capture or Upload Hair Photo
            </h3>
            <p className="text-xs text-slate-400 max-w-md mb-6 leading-relaxed">
              Face forward in natural lighting. Keep your temples, hairline, and hair texture visible for precise barber recommendations.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
              <button
                type="button"
                onClick={() => startCamera()}
                className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <Camera className="w-4 h-4 text-slate-950" />
                <span>Open Barber Camera</span>
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full sm:w-auto py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors border border-slate-700 flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <Upload className="w-4 h-4 text-slate-300" />
                <span>Upload Photo</span>
              </button>
            </div>

            <div className="mt-4 text-[11px] text-slate-500">
              Supported formats: JPG, PNG, WEBP, HEIC · Or drag & drop directly
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

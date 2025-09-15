// src/components/BarcodeScanner.jsx
import React, { useEffect, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";

const BarcodeScanner = ({ onDetected = () => {}, onError = () => {} }) => {
  const videoRef = useRef(null);
  const codeReaderRef = useRef(null);

  useEffect(() => {
    codeReaderRef.current = new BrowserMultiFormatReader();
    const codeReader = codeReaderRef.current;

    if (!videoRef.current) return;

    // Start decoding from the camera
    codeReader.decodeFromConstraints(
      { video: { facingMode: "environment", width: 1280, height: 720 }, audio: false },
      videoRef.current,
      (result, error) => {
        if (result) {
          onDetected(result.getText());
        }
        if (error && error.name !== "NotFoundException") {
          onError(error);
        }
      }
    );

    return () => {
      // Stop camera and reset
      if (codeReader) codeReader.reset();
    };
  }, [onDetected, onError]);

  return (
    <div className="relative w-full max-w-md mt-4">
      <video
        ref={videoRef}
        className="w-full h-auto rounded-lg"
        muted
        autoPlay
        playsInline
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="border-4 border-dashed border-blue-400 w-3/4 h-1/3 rounded-lg"></div>
      </div>
    </div>
  );
};

export default BarcodeScanner;

"use client";
import React from "react";
import { useDropzone } from "react-dropzone";

export default function FileUploader() {
  const onDrop = React.useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
    } catch (err) {
      console.error("upload failed:", err);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <div
      {...getRootProps()}
      className="w-40 h-20 border-dashed border border-black"
    >
      <input {...getInputProps()} />
      <p className="text-gray-300">Drag file Here to Upload</p>
    </div>
  );
}

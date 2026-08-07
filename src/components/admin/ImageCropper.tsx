"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type ImageCropperProps = {
  file: File;
  aspect: number;
  title: string;
  onCancel: () => void;
  onSave: (file: File) => void;
};

const OUTPUT_WIDTH = 1600;

export default function ImageCropper({ file, aspect, title, onCancel, onSave }: ImageCropperProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [sourceUrl, setSourceUrl] = useState("");
  const [zoom, setZoom] = useState(1);
  const [horizontal, setHorizontal] = useState(0);
  const [vertical, setVertical] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setSourceUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const image = imageRef.current;
    if (!canvas || !image || !image.naturalWidth || !image.naturalHeight) return;

    const outputHeight = Math.round(OUTPUT_WIDTH / aspect);
    canvas.width = OUTPUT_WIDTH;
    canvas.height = outputHeight;

    const baseScale = Math.max(OUTPUT_WIDTH / image.naturalWidth, outputHeight / image.naturalHeight);
    const scale = baseScale * zoom;
    const width = image.naturalWidth * scale;
    const height = image.naturalHeight * scale;
    const overflowX = Math.max(0, width - OUTPUT_WIDTH);
    const overflowY = Math.max(0, height - outputHeight);
    const x = -overflowX / 2 + (horizontal / 100) * (overflowX / 2);
    const y = -overflowY / 2 + (vertical / 100) * (overflowY / 2);
    const context = canvas.getContext("2d");
    if (!context) return;
    context.clearRect(0, 0, OUTPUT_WIDTH, outputHeight);
    context.drawImage(image, x, y, width, height);
    setReady(true);
  }, [aspect, horizontal, vertical, zoom]);

  useEffect(() => {
    draw();
  }, [draw, sourceUrl]);

  function saveCrop() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const outputType = file.type === "image/png" ? "image/png" : "image/jpeg";
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const extension = outputType === "image/png" ? "png" : "jpg";
        const baseName = file.name.replace(/\.[^.]+$/, "");
        onSave(new File([blob], `${baseName}-cropped.${extension}`, { type: outputType }));
      },
      outputType,
      0.92
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#171024]/80 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="crop-title">
      <div className="w-full max-w-3xl rounded-[28px] bg-white p-5 shadow-2xl sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="crop-title" className="text-xl font-bold text-[#302451]">{title}</h2>
            <p className="mt-1 text-xs text-[#625b70]">Adjust every image manually, then apply the crop.</p>
          </div>
          <button type="button" onClick={onCancel} className="rounded-full bg-[#302451]/8 px-4 py-2 text-xs font-bold text-[#302451]">Cancel</button>
        </div>

        <div className="mt-5 overflow-hidden rounded-2xl bg-[#171024]" style={{ aspectRatio: String(aspect) }}>
          {sourceUrl && (
            // The source is a local object URL, so Next/Image optimization does not apply.
            // eslint-disable-next-line @next/next/no-img-element
            <img ref={imageRef} src={sourceUrl} alt="Crop source" className="hidden" onLoad={draw} />
          )}
          <canvas ref={canvasRef} className="h-full w-full object-contain" />
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <CropRange label="Zoom" value={zoom} min={1} max={3} step={0.01} onChange={setZoom} />
          <CropRange label="Horizontal position" value={horizontal} min={-100} max={100} step={1} onChange={setHorizontal} />
          <CropRange label="Vertical position" value={vertical} min={-100} max={100} step={1} onChange={setVertical} />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={() => { setZoom(1); setHorizontal(0); setVertical(0); }} className="rounded-full border border-[#302451]/15 px-5 py-3 text-xs font-bold text-[#302451]">Reset</button>
          <button type="button" disabled={!ready} onClick={saveCrop} className="rounded-full bg-[#302451] px-6 py-3 text-xs font-bold text-white disabled:opacity-50">Apply crop</button>
        </div>
      </div>
    </div>
  );
}

function CropRange({ label, value, min, max, step, onChange }: { label: string; value: number; min: number; max: number; step: number; onChange: (value: number) => void }) {
  return (
    <label className="text-xs font-bold text-[#302451]">
      <span className="flex justify-between"><span>{label}</span><span className="text-[#625b70]">{label === "Zoom" ? `${value.toFixed(2)}x` : Math.round(value)}</span></span>
      <input type="range" value={value} min={min} max={max} step={step} onChange={(event) => onChange(Number(event.target.value))} className="mt-3 w-full accent-[#302451]" />
    </label>
  );
}

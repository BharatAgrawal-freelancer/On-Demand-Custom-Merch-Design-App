import React, { useEffect, useRef, useState } from "react";

const DesignViewer = () => {
  const [design, setDesign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const canvasRef = useRef(null);

  const designId = "68edf11e6a053604026d48f4";

  // 🔹 Step 1: Fetch design with Bearer token
  useEffect(() => {
    const fetchDesign = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token missing!");

        const res = await fetch(`http://localhost:5000/api/designs/${designId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        const data = await res.json();
        setDesign(data);
      } catch (err) {
        console.error("❌ Error fetching design:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (designId) fetchDesign();
  }, [designId]);

  // 🔹 Step 2: Draw design on canvas
  useEffect(() => {
    if (!design || !design.baseImage) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const drawDesign = async () => {
      try {
        // Load base image
        const baseImg = await loadImage(fixURL(design.baseImage));
        canvas.width = baseImg.width;
        canvas.height = baseImg.height;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(baseImg, 0, 0);

        // Sort and render overlays
        const overlays = (design.overlays || []).sort((a, b) => a.zIndex - b.zIndex);

        for (const overlay of overlays) {
          ctx.save();
          ctx.globalAlpha = overlay.opacity ?? 1;
          ctx.translate(overlay.x ?? 0, overlay.y ?? 0);
          ctx.rotate(((overlay.rotation ?? 0) * Math.PI) / 180);
          ctx.scale(overlay.scaleX ?? 1, overlay.scaleY ?? 1);

          if (overlay.type === "text") {
            ctx.font = `${overlay.fontSize || 20}px ${overlay.fontFamily || "Arial"}`;
            ctx.fillStyle = overlay.color || "#000";
            ctx.textBaseline = "top";
            ctx.fillText(overlay.text || "", 0, 0);
          }

          if (overlay.type === "image" && overlay.imageUrl) {
            const img = await loadImage(fixURL(overlay.imageUrl));
            ctx.drawImage(img, 0, 0);
          }

          ctx.restore();
        }
      } catch (err) {
        console.error("❌ Error rendering design:", err);
        setError("Failed to render design.");
      }
    };

    drawDesign();
  }, [design]);

  // Helper → load images safely with CORS support
  const loadImage = (src) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("Image failed to load: " + src));
      img.src = src;
    });

  // Helper → fix relative or missing URLs
  const fixURL = (url) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    return `http://localhost:5000${url.startsWith("/") ? url : `/${url}`}`;
  };

  // 🔹 Step 3: Download JPEG
  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = `${design?.title || "design"}.jpeg`;
    link.href = canvasRef.current.toDataURL("image/jpeg");
    link.click();
  };

  // UI States
  if (loading) return <p className="text-center mt-10">Loading design...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;
  if (!design) return <p className="text-center mt-10">No design found.</p>;

  return (
    <div className="flex flex-col items-center mt-6">
      <h2 className="text-xl font-semibold mb-4">{design.title}</h2>
      <canvas
        ref={canvasRef}
        className="border rounded-xl shadow-md bg-white"
        style={{ maxWidth: "100%", height: "auto" }}
      />
      <button
        onClick={handleDownload}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Download as JPEG
      </button>
    </div>
  );
};

export default DesignViewer;

"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Rnd } from "react-rnd"
import { api } from "../lib/api.js"
import { useAuth } from "../context/AuthContext.jsx"
import { useCart } from "../context/CartContext.jsx"

export default function Editor() {
  const { designId } = useParams()
  const { token, user } = useAuth()
  const nav = useNavigate()
  const { add: addToCart } = useCart()
  const [design, setDesign] = useState(null)
  const [overlays, setOverlays] = useState([])
  const stageRef = useRef(null)
  const [prompt, setPrompt] = useState("Aesthetic")
  const [heading, setHeading] = useState("My Design")
  const [body, setBody] = useState("Made with PrintBazaar")
  const [selectedIdx, setSelectedIdx] = useState(null)
  const [editingTextIdx, setEditingTextIdx] = useState(null)
  const replaceImageInputRef = useRef(null)
  const savedImage = localStorage.getItem("baseImage")
  useEffect(() => {
    api.get(`/api/designs/${designId}`, token).then((res) => {
      if (res.ok) {
        setDesign(res.data)
        setOverlays(res.data.overlays || [])
      }
    })
  }, [designId, token])

  const addTextOverlay = async (text) => {
    const overlay = {
      type: "text",
      text,
      x: 50,
      y: 50,
      scaleX: 1,
      scaleY: 1,
      rotation: 0,
      opacity: 1,
      zIndex: overlays.length,
      color: "#ffffff",
      fontFamily: "Poppins",
      fontSize: 26,
      textStyle: "normal",
    }
    const res = await api.post(`/api/designs/${designId}/overlays`, { overlay }, token)
    if (res.ok) {
      setOverlays(res.data.overlays)
    }
  }

  const addImageOverlay = async (src) => {
    const overlay = {
      type: "image",
      imageUrl: src,
      x: 60,
      y: 60,
      scaleX: 1,
      scaleY: 1,
      rotation: 0,
      opacity: 1,
      zIndex: overlays.length,
    }
    const res = await api.post(`/api/designs/${designId}/overlays`, { overlay }, token)
    if (res.ok) setOverlays(res.data.overlays)
  }

  const uploadLocalImage = async (file) => {
    const base64 = await toBase64(file)
    const up = await api.post("/api/upload", { base64 }, token)
    if (up.ok) await addImageOverlay(up.data.url)
  }

  const savePositions = async () => {
    // Persist current overlay positions
    await api.patch(`/api/designs/${designId}`, { overlays }, token)
    await api.post(`/api/designs/${designId}/versions`, {}, token)
  }

  const publishPost = async () => {
    await savePositions()
    const res = await api.post(
      "/api/community/create",
      {
        designId,
        heading,
        body,
        tags: design?.tags || [],
      },
      token,
    )
    if (res.ok) nav(`/community/${res.data._id}`)
  }

  const addCart = async () => {
    await savePositions()
    await addToCart(
      {
        designId,
        productId: design?.productRef,
        variant: {},
        quantity: 1,
        designSnapshot: { overlays },
      },
      token,
    )
    nav("/cart")
  }

  const generateAIText = async () => {
    const res = await api.post("/api/ai/generateTextOverlay", { theme: "aesthetic", prompt }, token)
    if (res.ok) addTextOverlay(res.data.text || "Stay Inspired")
  }

  const canvasSize = useMemo(() => ({ w: 500, h: 500 }), [])
  const boundsClass = "bg-zinc-900 border border-zinc-800 rounded-xl relative overflow-hidden"

  const updateOverlay = (idx, patch) => {
    setOverlays((prev) => {
      const next = [...prev]
      next[idx] = { ...next[idx], ...patch }
      return next
    })
  }

  const onReplaceImageChosen = async (file) => {
    if (!file || selectedIdx == null) return
    try {
      const base64 = await toBase64(file)
      const up = await api.post("/api/upload", { base64 }, token)
      if (up.ok) {
        updateOverlay(selectedIdx, { imageUrl: up.data.url })
      }
    } catch (e) {
      console.log("[v0] replace image failed:", e)
    }
  }

  if (!design)
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <img src="/loading-editor.jpg" alt="loading editor" />
      </div>
    )

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className={`w-full ${boundsClass} flex items-center justify-center p-4`} ref={stageRef}>
         <div
  className="relative"
  style={{
    width: canvasSize.w,
    height: canvasSize.h,
    backgroundImage: savedImage ? `url(${savedImage})` : "none",
    backgroundSize: "contain",        // 👈 full image visible (no crop)
    backgroundPosition: "center",     // 👈 centered in div
    backgroundRepeat: "no-repeat",    // 👈 no tiling/repeating
    backgroundColor: "#000",          // optional - fill empty area
  }}
>
  {!savedImage && (
    <div className="absolute inset-0 flex items-center justify-center text-gray-500">
      No base image selected
    </div>
  )}
            {overlays.map((ov, idx) => (
              <Rnd
                key={idx}
                size={{ width: 180 * (ov.scaleX || 1), height: 60 * (ov.scaleY || 1) }}
                position={{ x: ov.x ?? 50, y: ov.y ?? 50 }}
                bounds="parent"
                onClick={() => setSelectedIdx(idx)}
                onDragStop={(_, d) => {
                  const next = [...overlays]
                  next[idx] = { ...next[idx], x: d.x, y: d.y }
                  setOverlays(next)
                }}
                onResizeStop={(_, __, ref, ___, pos) => {
                  const next = [...overlays]
                  next[idx] = {
                    ...next[idx],
                    scaleX: ref.offsetWidth / 180,
                    scaleY: ref.offsetHeight / 60,
                    x: pos.x,
                    y: pos.y,
                  }
                  setOverlays(next)
                }}
                style={{
                  outline: selectedIdx === idx ? "2px solid #15bcf0" : "none",
                  outlineOffset: "0px",
                }}
              >
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{
                    transform: `rotate(${ov.rotation || 0}deg)`,
                    opacity: ov.opacity ?? 1,
                  }}
                  onDoubleClick={() => {
                    setSelectedIdx(idx)
                    if (ov.type === "text") {
                      setEditingTextIdx(idx)
                    } else if (ov.type === "image") {
                      replaceImageInputRef.current?.click()
                    }
                  }}
                >
                  {ov.type === "text" ? (
                    editingTextIdx === idx ? (
                      <input
                        className="w-full h-full bg-transparent text-center outline-none border border-dashed border-zinc-500 rounded"
                        autoFocus
                        value={ov.text || ""}
                        onChange={(e) => updateOverlay(idx, { text: e.target.value })}
                        onBlur={() => setEditingTextIdx(null)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") setEditingTextIdx(null)
                        }}
                        style={{
                          color: ov.color || "#fff",
                          fontFamily: ov.fontFamily || "Poppins",
                          fontSize: ov.fontSize || 26,
                          ...getTextCss(ov),
                        }}
                      />
                    ) : (
                      <span
                        style={{
                          color: ov.color || "#fff",
                          fontFamily: ov.fontFamily || "Poppins",
                          fontSize: ov.fontSize || 26,
                          ...getTextCss(ov),
                        }}
                      >
                        {ov.text}
                      </span>
                    )
                  ) : (
                    <img
                      src={ov.imageUrl || "/placeholder.svg"}
                      alt="overlay"
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>
              </Rnd>
            ))}
          </div>
        </div>
      </div>

      <aside className="space-y-4">
        <div className="pb-card p-4">
          <h3 className="font-semibold mb-3">Add Overlay</h3>
          <div className="flex gap-2">
            <button className="btn btn-primary" onClick={() => addTextOverlay("Your Text")}>
              <i className="fa-solid fa-font mr-2" /> Text
            </button>
            <label className="btn btn-ghost cursor-pointer">
              <i className="fa-solid fa-image mr-2" /> Image
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => e.target.files[0] && uploadLocalImage(e.target.files[0])}
              />
            </label>
          </div>
        </div>

        <div className="pb-card p-4">
          <h3 className="font-semibold mb-3">AI Tools</h3>
          <div className="flex gap-2">
            <input
              className="flex-1 p-2 rounded-lg bg-zinc-900 border border-zinc-800"
              placeholder="Prompt theme, e.g. minimal, retro"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button className="btn btn-accent" onClick={generateAIText}>
              <i className="fa-solid fa-wand-magic-sparkles mr-2" /> Generate text
            </button>
          </div>
        </div>

        <div className="pb-card p-4 space-y-3">
          <h3 className="font-semibold">Publish</h3>
          <input
            className="w-full p-2 rounded-lg bg-zinc-900 border border-zinc-800"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            placeholder="Post heading"
          />
          <textarea
            className="w-full p-2 rounded-lg bg-zinc-900 border border-zinc-800"
            rows="3"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Post body"
          />
          <div className="flex gap-2">
            <button className="btn btn-primary" onClick={savePositions} title="Persist current overlay properties">
              <i className="fa-solid fa-floppy-disk mr-2" /> Save Changes
            </button>
            <button className="btn btn-accent" onClick={publishPost}>
              <i className="fa-solid fa-bullhorn mr-2" /> Publish
            </button>
          </div>
          <button className="btn btn-ghost w-full" onClick={addCart}>
            <i className="fa-solid fa-cart-plus mr-2" /> Add to Cart
          </button>
          <div className="text-xs text-zinc-400">Owner: {user?.username}</div>
        </div>

        <div className="pb-card p-4 space-y-3">
          <h3 className="font-semibold">Selected Overlay</h3>
          {selectedIdx == null ? (
            <div className="text-sm text-zinc-400">Select an overlay to edit its properties.</div>
          ) : (
            <>
              <div className="text-xs text-zinc-400">Type: {overlays[selectedIdx]?.type}</div>

              {overlays[selectedIdx]?.type === "text" && (
                <div className="grid grid-cols-2 gap-3">
                  <label className="col-span-2 text-sm">
                    Text
                    <input
                      className="mt-1 w-full p-2 rounded-lg bg-zinc-900 border border-zinc-800"
                      value={overlays[selectedIdx].text || ""}
                      onChange={(e) => updateOverlay(selectedIdx, { text: e.target.value })}
                    />
                  </label>

                  <label className="text-sm">
                    Color
                    <input
                      type="color"
                      className="mt-1 block h-9 w-full bg-transparent"
                      value={overlays[selectedIdx].color || "#ffffff"}
                      onChange={(e) => updateOverlay(selectedIdx, { color: e.target.value })}
                    />
                  </label>

                  <label className="text-sm">
                    Font Size
                    <input
                      type="range"
                      min={12}
                      max={120}
                      step={1}
                      className="mt-2 w-full"
                      value={overlays[selectedIdx].fontSize || 26}
                      onChange={(e) => updateOverlay(selectedIdx, { fontSize: Number(e.target.value) })}
                    />
                  </label>

                  <label className="text-sm">
                    Font Family
                    <select
                      className="mt-1 w-full p-2 rounded-lg bg-zinc-900 border border-zinc-800"
                      value={overlays[selectedIdx].fontFamily || "Poppins"}
                      onChange={(e) => updateOverlay(selectedIdx, { fontFamily: e.target.value })}
                    >
                      <option value="Poppins">Poppins</option>
                      <option value="Arial">Arial</option>
                      <option value="Georgia">Georgia</option>
                      <option value="Times New Roman">Times New Roman</option>
                      <option value="Courier New">Courier New</option>
                      <option value="Impact">Impact</option>
                    </select>
                  </label>

                  <label className="text-sm">
                    Text Style
                    <select
                      className="mt-1 w-full p-2 rounded-lg bg-zinc-900 border border-zinc-800"
                      value={overlays[selectedIdx].textStyle || "normal"}
                      onChange={(e) => updateOverlay(selectedIdx, { textStyle: e.target.value })}
                    >
                      <option value="normal">Normal</option>
                      <option value="bold">Bold</option>
                      <option value="italic">Italic</option>
                      <option value="underline">Underline</option>
                    </select>
                  </label>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <label className="text-sm">
                  Opacity
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    className="mt-2 w-full"
                    value={overlays[selectedIdx].opacity ?? 1}
                    onChange={(e) => updateOverlay(selectedIdx, { opacity: Number(e.target.value) })}
                  />
                </label>

                <label className="text-sm">
                  Rotation
                  <input
                    type="range"
                    min={-180}
                    max={180}
                    step={1}
                    className="mt-2 w-full"
                    value={overlays[selectedIdx].rotation || 0}
                    onChange={(e) => updateOverlay(selectedIdx, { rotation: Number(e.target.value) })}
                  />
                </label>

                <label className="text-sm">
                  Scale
                  <input
                    type="range"
                    min={0.2}
                    max={3}
                    step={0.05}
                    className="mt-2 w-full"
                    value={Math.max(overlays[selectedIdx].scaleX || 1, overlays[selectedIdx].scaleY || 1)}
                    onChange={(e) =>
                      updateOverlay(selectedIdx, { scaleX: Number(e.target.value), scaleY: Number(e.target.value) })
                    }
                  />
                </label>
              </div>

              {overlays[selectedIdx]?.type === "image" && (
                <div className="flex items-center gap-2 pt-1">
                  <button className="btn btn-ghost" onClick={() => replaceImageInputRef.current?.click()}>
                    <i className="fa-solid fa-image mr-2" />
                    Replace Image
                  </button>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <button className="btn btn-primary" onClick={savePositions} title="Persist current overlay properties">
                  <i className="fa-solid fa-floppy-disk mr-2" /> Save Changes
                </button>
                <button
                  className="btn btn-ghost"
                  onClick={() => {
                    if (selectedIdx == null) return
                    setOverlays((prev) => prev.filter((_, i) => i !== selectedIdx))
                    setSelectedIdx(null)
                  }}
                >
                  <i className="fa-solid fa-trash mr-2" /> Delete
                </button>
              </div>
            </>
          )}
          <input
            ref={replaceImageInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => onReplaceImageChosen(e.target.files?.[0])}
          />
        </div>
      </aside>
    </div>
  )
}

async function onReplaceImageChosen(file, selectedIdx, setOverlays, token) {
  if (selectedIdx == null || !file) return
  const base64 = await toBase64(file)
  const up = await api.post("/api/upload", { base64 }, token)
  if (up.ok) {
    setOverlays((prev) => {
      const next = [...prev]
      next[selectedIdx] = { ...next[selectedIdx], imageUrl: up.data.url }
      return next
    })
  }
}

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

function getTextCss(ov) {
  const style = ov.textStyle || "normal"
  return {
    fontWeight: style === "bold" ? 700 : 400,
    fontStyle: style === "italic" ? "italic" : "normal",
    textDecoration: style === "underline" ? "underline" : "none",
  }
}

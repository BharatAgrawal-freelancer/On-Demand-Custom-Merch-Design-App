export const suggestProducts = async (req, res) => {
  const { theme } = req.body
  res.json({
    theme,
    suggestions: [
      { productSlug: "tshirt-classic", reason: "Best canvas for text overlays" },
      { productSlug: "mug-basic", reason: "High-contrast small prints" },
    ],
  })
}

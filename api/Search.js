export default async function handler(req, res) {
  try {
    const { metier, ville } = req.query;

    if (!metier && !ville) {
      return res.status(400).json({
        error: "Métier ou ville requis"
      });
    }

    return res.status(200).json({
      message: "La fonction fonctionne",
      metier: metier || "",
      ville: ville || ""
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}

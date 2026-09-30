export default async function handler(req, res) {
  try {
    const { metier = "", ville = "" } = req.query;

    if (!metier && !ville) {
      return res.status(400).json({ error: "Métier ou ville requis." });
    }

    const credentials = Buffer.from(
      `${process.env.FRANCE_TRAVAIL_CLIENT_ID}:${process.env.FRANCE_TRAVAIL_CLIENT_SECRET}`
    ).toString("base64");

    const tokenResponse = await fetch(
      "https://entreprise.francetravail.fr/connexion/oauth2/access_token?realm=%2Fpartenaire",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${credentials}`
        },
        body: "grant_type=client_credentials&scope=api_offresdemploiv2"
      }
    );

    if (!tokenResponse.ok) {
      return res.status(500).json({
        error: "Impossible d'obtenir le token France Travail."
      });
    }

    const tokenData = await tokenResponse.json();

    const params = new URLSearchParams();
    params.set("range", "0-19");

    if (metier) params.set("motsCles", metier);
    if (ville) params.set("commune", ville);

    const offresResponse = await fetch(
      `https://api.francetravail.io/partenaire/offresdemploi/v2/offres/search?${params}`,
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`
        }
      }
    );

    const data = await offresResponse.json();

    return res.status(offresResponse.status).json(data);

  } catch (error) {
    return res.status(500).json({
      error: "Erreur serveur."
    });
  }
}

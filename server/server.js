
app.get("/personalInfo/getByLocation/:location", async (req, res) => {
  const location = req.params.location;
  const result = await db.query(
    `SELECT * FROM personalinfo WHERE location ILIKE %${location}% `
  );
  res.json(result.rows);
});


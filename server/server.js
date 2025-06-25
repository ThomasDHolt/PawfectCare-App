app.get("/account/getByEmail/:name", async (req, res) => {
  const accountemail = req.params.name;
  const result = await db.query(
    `SELECT * FROM account WHERE account_email ILIKE %accountemail% `
  );
  res.json(result.rows);
});

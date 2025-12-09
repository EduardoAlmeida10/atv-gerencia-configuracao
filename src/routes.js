import express from "express";
import { pool } from "./db.js";

const router = express.Router();

router.get("/itens", async (req, res) => {
  const result = await pool.query("SELECT * FROM produtos");
  res.json(result.rows);
});

router.get("/item/:id", async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM produtos WHERE id = $1",
    [req.params.id]
  );

  if (result.rows.length === 0)
    return res.status(404).json({ erro: "Item não encontrado" });

  res.json(result.rows[0]);
});

router.post("/item", async (req, res) => {
  const { nome, preco, descricao } = req.body;

  const result = await pool.query(
    "INSERT INTO produtos (nome, preco, descricao) VALUES ($1, $2, $3) RETURNING *",
    [nome, preco, descricao]
  );

  res.status(201).json(result.rows[0]);
});

router.delete("/item/:id", async (req, res) => {
  const { id } = req.params;

  const result = await pool.query(
    "DELETE FROM produtos WHERE id = $1 RETURNING *",
    [id]
  );

  if (result.rows.length === 0)
    return res.status(404).json({ erro: "Item não encontrado" });

  res.json({ mensagem: "Item deletado com sucesso", item: result.rows[0] });
});

export default router;

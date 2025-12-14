import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors()); // разрешаем все запросы с фронтенда

// Корень сайта
app.get("/", (req, res) => {
  res.send("Deadlock API работает. Используйте /items для получения предметов.");
});

// Эндпоинт /items возвращает JSON с предметами
app.get("/items", async (req, res) => {
  try {
    const response = await fetch("https://raw.githubusercontent.com/deadlockdb/deadlockdb-data/main/items.json");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

// Запуск сервера на Render
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

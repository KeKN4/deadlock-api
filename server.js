import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors()); // разрешаем любые запросы с фронтенда

// Эндпоинт /items возвращает все предметы Deadlock
app.get("/items", async (req, res) => {
  try {
    const response = await fetch("https://raw.githubusercontent.com/deadlockdb/deadlockdb-data/main/items.json");
    const data = await response.json();
    res.json(data); // отдаём клиенту
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

// Запуск сервера на порту Render или локально
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

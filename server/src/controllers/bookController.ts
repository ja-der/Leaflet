import { Request, Response } from "express";
import axios from "axios";

const API_BASE = "https://openlibrary.org";

export const getPopularBooks = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(
      `${API_BASE}/subjects/mystery.json?limit=10`
    );
    res.json(response.data.works);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books." });
  }
};

export const searchBook = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(
      `${API_BASE}/search.json?q=${req.body.query}`
    );
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch search request." });
  }
};

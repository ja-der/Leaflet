import { Request, Response } from "express";
import axios from "axios";

const API_BASE = "https://openlibrary.org";

export const getPopularBooks = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 0;
    const limit = parseInt(req.query.limit as string) || 12;
    const query = (req.query.q as string) || "bestseller";

    // Calculate offset for pagination
    const offset = page * limit;

    const response = await axios.get(
      `${API_BASE}/search.json?q=${query}&limit=${limit}&offset=${offset}`
    );
    res.json({
      books: response.data.docs,
      totalFound: response.data.numFound,
      page: page,
      limit: limit,
      hasMore: offset + limit < response.data.numFound,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books." });
  }
};

export const searchBook = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 0;
    const limit = parseInt(req.query.limit as string) || 12;
    const query = req.query.q as string;
    const offset = page * limit;

    const response = await axios.get(
      `${API_BASE}/search.json?q=${query}&limit=${limit}&offset=${offset}`
    );

    res.json({
      books: response.data.docs,
      totalFound: response.data.numFound,
      page: page,
      limit: limit,
      hasMore: offset + limit < response.data.numFound,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch search request." });
  }
};

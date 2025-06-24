import React, { useEffect, useState } from "react";
import { fetchBooks, addFavorite } from "../api";

export default function Home() {
  return (
    <div className="bg-blue-300" bg-blue>
      <h1 className="size-24 ">Find Your Next Read</h1>
    </div>
  );
}

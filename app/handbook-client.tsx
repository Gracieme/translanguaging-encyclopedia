import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import HandbookReader from "./HandbookReader";
import "./globals.css";

const root = document.getElementById("root");
if (!root) throw new Error("Missing application root");
createRoot(root).render(<StrictMode><HandbookReader /></StrictMode>);

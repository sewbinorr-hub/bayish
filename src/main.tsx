import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

// Check for required environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  rootElement.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; font-family: system-ui, sans-serif; padding: 20px;">
      <div style="text-align: center; max-width: 600px;">
        <h1 style="color: #ef4444; margin-bottom: 16px;">Configuration Error</h1>
        <p style="color: #64748b; margin-bottom: 8px;">Missing required environment variables:</p>
        <ul style="text-align: left; display: inline-block; color: #64748b;">
          <li>VITE_SUPABASE_URL: ${supabaseUrl ? '✓ Set' : '✗ Missing'}</li>
          <li>VITE_SUPABASE_PUBLISHABLE_KEY: ${supabaseKey ? '✓ Set' : '✗ Missing'}</li>
        </ul>
        <p style="color: #64748b; margin-top: 16px;">
          Please configure these in your Vercel project settings under Environment Variables.
        </p>
      </div>
    </div>
  `;
} else {
  createRoot(rootElement).render(<App />);
}

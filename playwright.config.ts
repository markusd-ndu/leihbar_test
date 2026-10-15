import { defineConfig, devices } from "@playwright/test";

// Läuft schon `npm run dev` (Port 3000), nutzt der Test diese App; sonst startet er sie selbst.
export default defineConfig({
  testDir: "./tests",
  use: { baseURL: "http://localhost:3000" },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: true,
  },
});

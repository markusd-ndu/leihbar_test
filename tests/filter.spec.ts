import { expect, test } from "@playwright/test";

// Issue 3, Kriterium 1: Klick auf „Mode“ → nur Mode, Filter sichtbar aktiv.
test("Filter „Mode“ zeigt nur Mode und ist als aktiv markiert", async ({ page }) => {
  await page.goto("/");
  const filter = page.getByRole("navigation", { name: "Nach Kategorie filtern" });
  await filter.getByRole("link", { name: "Mode" }).click();

  await expect(page).toHaveURL(/kategorie=Mode/);
  await expect(filter.getByRole("link", { name: "Mode" })).toHaveAttribute("aria-current", "true");
  await expect(filter.getByRole("link", { name: "Alle" })).not.toHaveAttribute("aria-current", "true");

  // Die Daten kommen aus der Datenbank, darum zählt nicht der Titel, sondern die Kategorie jeder Karte.
  // Alte Karten blenden beim Wechsel noch 0,3 s aus – darum wartet der Test, bis nur noch Mode übrig ist.
  const kategorien = () =>
    page.locator("#gegenstaende article p.text-muted").evaluateAll((els) => els.map((e) => e.textContent));
  await expect.poll(async () => (await kategorien()).length).toBeGreaterThan(0);
  await expect.poll(async () => (await kategorien()).filter((k) => k !== "Mode")).toEqual([]);
});

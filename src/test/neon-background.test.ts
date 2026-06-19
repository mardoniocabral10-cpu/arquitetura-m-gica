import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const css = readFileSync(resolve(__dirname, "../index.css"), "utf-8");

function getBlock(selector: string): string {
  const re = new RegExp(`${selector.replace(".", "\\.")}\\s*\\{([\\s\\S]*?)\\}`);
  const m = css.match(re);
  if (!m) throw new Error(`Block ${selector} not found`);
  return m[1];
}

function getVar(block: string, name: string): string {
  const m = block.match(new RegExp(`${name}\\s*:\\s*([^;]+);`));
  return m ? m[1].trim() : "";
}

const NEON_BG = "0 0% 4%";

describe("neon background consistency", () => {
  const root = getBlock(":root");
  const dark = getBlock(".dark");

  it("uses neon background in :root (light theme — login & public pages)", () => {
    expect(getVar(root, "--background")).toBe(NEON_BG);
    expect(getVar(root, "--card")).toBe(NEON_BG);
    expect(getVar(root, "--popover")).toBe(NEON_BG);
  });

  it("uses neon background in .dark (dashboard / dark mode)", () => {
    expect(getVar(dark, "--background")).toBe(NEON_BG);
    expect(getVar(dark, "--card")).toBe(NEON_BG);
    expect(getVar(dark, "--popover")).toBe(NEON_BG);
  });

  it("background matches across light and dark themes", () => {
    expect(getVar(root, "--background")).toBe(getVar(dark, "--background"));
    expect(getVar(root, "--card")).toBe(getVar(dark, "--card"));
    expect(getVar(root, "--popover")).toBe(getVar(dark, "--popover"));
  });

  it("applies bg-background globally to html, body, #root", () => {
    expect(css).toMatch(/html,\s*body,\s*#root\s*\{[^}]*bg-background/);
  });
});

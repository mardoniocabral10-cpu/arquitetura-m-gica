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

const NEON_RED = "0 100% 55%";
const VARS = ["--foreground", "--card-foreground", "--popover-foreground"] as const;

describe("neon red text color consistency", () => {
  const root = getBlock(":root");
  const dark = getBlock(".dark");

  it("uses neon red text in :root (login & public pages)", () => {
    for (const v of VARS) expect(getVar(root, v)).toBe(NEON_RED);
  });

  it("uses neon red text in .dark (dashboard)", () => {
    for (const v of VARS) expect(getVar(dark, v)).toBe(NEON_RED);
  });

  it("text color matches across light and dark themes", () => {
    for (const v of VARS) expect(getVar(root, v)).toBe(getVar(dark, v));
  });

  it("applies text-foreground globally to html, body, #root", () => {
    expect(css).toMatch(/html,\s*body,\s*#root\s*\{[^}]*text-foreground/);
  });
});

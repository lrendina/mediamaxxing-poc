import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

const checker = resolve("scripts/check-tokens.mjs");

function check(files) {
  const root = mkdtempSync(join(tmpdir(), "mediamaxxing-tokens-"));
  try {
    for (const dir of ["app", "components", "lib"]) mkdirSync(join(root, dir));
    for (const [name, source] of Object.entries(files)) {
      const path = join(root, name);
      mkdirSync(dirname(path), { recursive: true });
      writeFileSync(path, source);
    }
    return spawnSync(process.execPath, [checker], { cwd: root, encoding: "utf8" });
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

test("marketing spacing violations now fail the check", () => {
  for (const value of ["p-5", "md:gap-3", "pb-[20px]", "gap-1", "px-[3rem]"]) {
    const result = check({ "components/Sample.tsx": `<div className="${value}" />` });
    assert.equal(result.status, 1, `${value}: ${result.stdout}`);
    assert.match(result.stdout, /spacing/);
  }
});

test("token geometry, role colors and the single optical exception pass", () => {
  const result = check({
    "components/Sample.tsx": '<div className="p-6 md:p-8 gap-4 rounded bg-surface shadow-1 hover:shadow-2 px-[var(--gutter)]" />',
    "components/Pill.tsx": '<span className="gap-1 px-4 rounded-full bg-action-sunk" />',
  });
  assert.equal(result.status, 0, result.stdout);
});

test("the optical exception cannot hide other Pill spacing mistakes", () => {
  assert.equal(check({ "components/Pill.tsx": '<span className="gap-1 p-1" />' }).status, 1);
});

test("creator legacy rules remain advisory and comments are ignored", () => {
  const result = check({
    "components/creator/Sample.tsx": '<div className="p-5 rounded-xl shadow-lg bg-lime" />',
    "components/Sample.tsx": '/* p-5 rounded-xl #ffffff */\n<div className="p-6" />',
  });
  assert.equal(result.status, 0, result.stdout);
  assert.match(result.stdout, /3 rule hits and 1 spacing values/);
});

test("color and geometry violations remain blocking", () => {
  for (const value of ["rounded-xl", "shadow-lg", "bg-red-500", "text-money-ink", "bg-[#ffffff]"]) {
    const result = check({ "components/Sample.tsx": `<div className="${value}" />` });
    assert.equal(result.status, 1, `${value}: ${result.stdout}`);
  }
});

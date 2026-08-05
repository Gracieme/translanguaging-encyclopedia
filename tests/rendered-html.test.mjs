import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request("http://localhost/", { headers: { accept: "text/html" } }), {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  }, { waitUntil() {}, passThroughOnException() {} });
}

test("server renders the translanguaging encyclopedia shell", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<title>从应用语言学与社会语言学拆解超语 \| 双语概念百科<\/title>/);
  assert.match(html, /已编目[^<]*<!-- -->674<!-- --> 个概念/);
  assert.match(html, /本科生基础概念/);
  assert.match(html, /硕士生研究入门/);
  assert.match(html, /博士生理论深化/);
  assert.doesNotMatch(html, /Your site is taking shape|Building your site|codex-preview/i);
});

test("GitHub Pages build contains the encyclopedia assets and manual examples", async () => {
  const index = await readFile(new URL("../pages-dist/index.html", import.meta.url), "utf8");
  const [assets, encyclopedia] = await Promise.all([
    readdir(new URL("../pages-dist/assets/", import.meta.url)),
    readFile(new URL("../pages-dist/encyclopedia.md", import.meta.url), "utf8"),
  ]);
  const scriptName = assets.find((name) => /^index-.*\.js$/.test(name));
  assert.ok(scriptName, "expected a generated JavaScript bundle");
  const script = await readFile(new URL(`../pages-dist/assets/${scriptName}`, import.meta.url), "utf8");
  assert.match(index, /<html lang="zh-CN">/);
  assert.match(encyclopedia, /^### 1\. Translanguaging/m);
  assert.match(encyclopedia, /^### 674\./m);
  assert.match(script, /同一段英语录音配上不同肤色的头像/);
  assert.match(script, /A customer says an Asian clerk/);
  assert.match(script, /生活例子|研究示例/);
  assert.doesNotMatch(script, /生活例子：小林在家说方言|关键片段呈现出以下现象/);
});

test("concept rendering has no generated-template fallback", async () => {
  const source = await readFile(new URL("../app/conceptExamples.ts", import.meta.url), "utf8");
  assert.match(source, /manualConceptContent/);
  assert.match(source, /Missing manual content/);
  assert.doesNotMatch(source, /frames|undergraduateGroupScenes|hash\(|plainChineseOverrides/);
});

import { describe, it, expect } from "bun:test";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import remarkSpinster from "../index";

describe("remarkSpinster", () => {
  it("leaves text intact when no script tags are present", async () => {
    const processor = unified()
      .use(remarkParse)
      .use(remarkSpinster)
      .use(remarkStringify);
    const result = await processor.process("hello spinster world");
    expect(result.toString()).toBe("hello spinster world\n");
  });

  it("evaluates and removes script tags", async () => {
    (globalThis as any).scriptExecuted = false;
    const processor = unified()
      .use(remarkParse)
      .use(remarkSpinster)
      .use(remarkStringify);
    const md = "Hello <script>globalThis.scriptExecuted = true;</script>";
    const result = await processor.process(md);
    expect((globalThis as any).scriptExecuted).toBe(true);
    expect(result.toString()).toBe("Hello\n");
    delete (globalThis as any).scriptExecuted;
  });

  it("handles multiple script tags without skipping", async () => {
    (globalThis as any).s1 = false;
    (globalThis as any).s2 = false;
    const processor = unified()
      .use(remarkParse)
      .use(remarkSpinster)
      .use(remarkStringify);
    const md =
      "Hello <script>globalThis.s1 = true;</script>\n\nWorld <script>globalThis.s2 = true;</script>";
    const result = await processor.process(md);
    expect((globalThis as any).s1).toBe(true);
    expect((globalThis as any).s2).toBe(true);
    expect(result.toString()).toBe("Hello\n\nWorld\n");
    delete (globalThis as any).s1;
    delete (globalThis as any).s2;
  });
});

import { describe, it, expect } from "bun:test";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import remarkSpinster from "../index";

describe("remarkSpinster", () => {
  it("capitalizes 'spinster' occurrences", async () => {
    const processor = unified()
      .use(remarkParse)
      .use(remarkSpinster)
      .use(remarkStringify);
    const result = await processor.process("hello spinster world");
    expect(result.toString()).toBe("hello Spinster world\n");
  });

  it("ignores text without the keyword", async () => {
    const processor = unified()
      .use(remarkParse)
      .use(remarkSpinster)
      .use(remarkStringify);
    const result = await processor.process("hello world");
    expect(result.toString()).toBe("hello world\n");
  });
});

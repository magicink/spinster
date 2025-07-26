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
    const tree: any = {
      type: "root",
      children: [
        {
          type: "p",
          value: "<script>globalThis.scriptExecuted = true;</script>Hello",
        },
      ],
    };
    const transformer = remarkSpinster();
    transformer(tree);
    expect((globalThis as any).scriptExecuted).toBe(true);
    expect(tree.children[0].value).toBe("Hello");
    delete (globalThis as any).scriptExecuted;
  });

  it("handles multiple script tags without skipping", () => {
    (globalThis as any).s1 = false;
    (globalThis as any).s2 = false;
    const tree: any = {
      type: "root",
      children: [
        {
          type: "p",
          value: "<script>globalThis.s1 = true;</script>Hello",
        },
        {
          type: "p",
          value: "<script>globalThis.s2 = true;</script>World",
        },
      ],
    };
    const transformer = remarkSpinster();
    transformer(tree);
    expect((globalThis as any).s1).toBe(true);
    expect((globalThis as any).s2).toBe(true);
    expect(tree.children[0].value).toBe("Hello");
    expect(tree.children[1].value).toBe("World");
    delete (globalThis as any).s1;
    delete (globalThis as any).s2;
  });
});

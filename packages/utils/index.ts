import { visit } from "unist-util-visit";

export default function remarkSpinster() {
  return (tree: any) => {
    const toRemove: { parent: any; index: number }[] = [];

    visit(tree, "paragraph", (node: any, index: number, parent: any) => {
      if (!Array.isArray(node.children)) return;

      const joined = node.children
        .map((c: any) => (typeof c.value === "string" ? c.value : ""))
        .join("");

      const scriptRegex = /\s*<script\b[^>]*>([\s\S]*?)<\/script>\s*/i;
      const match = joined.match(scriptRegex);
      if (match) {
        try {
          eval(match[1]);
        } catch {
          // ignore script errors
        }
        const cleaned = joined.replace(scriptRegex, "");
        if (cleaned.trim() === "" && parent && typeof index === "number") {
          toRemove.push({ parent, index });
        } else {
          node.children = [{ type: "text", value: cleaned }];
        }
      }
    });

    for (const { parent, index } of toRemove.reverse()) {
      parent.children.splice(index, 1);
    }
  };
}

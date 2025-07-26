import { visit } from "unist-util-visit";

export default function remarkSpinster() {
  // Matches <script> tags and their contents, including any attributes and inner text.
  // The pattern captures the content inside the <script>...</script> tags for further processing.
  const SCRIPT_TAG_PATTERN = /\s*<script\b[^>]*>([\s\S]*?)<\/script>\s*/i;

  return (tree: any) => {
    const toRemove: { parent: any; index: number }[] = [];

    visit(tree, "paragraph", (node: any, index: number, parent: any) => {
      if (!Array.isArray(node.children)) return;

      const joined = node.children
        .map((c: any) => (typeof c.value === "string" ? c.value : ""))
        .join("");

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

    // Reverse the array to maintain correct indices when removing elements
    for (const { parent, index } of getReversedCopy(toRemove)) {
      parent.children.splice(index, 1);
    }
  };
}

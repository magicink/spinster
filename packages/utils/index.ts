import { visit } from "unist-util-visit";
export default function remarkSpinster() {
  return (tree: any) => {
    const toRemove: { parent: any; index: number }[] = [];
    visit(tree, "p", (node: any, index: number, parent: any) => {
      if (typeof node.value !== "string") return;
      const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/i;
      const match = node.value.match(scriptRegex);
      if (match) {
        try {
          eval(match[1]);
        } catch {
          // ignore script errors
        }
        node.value = node.value.replace(scriptRegex, "");
        if (node.value.trim() === "" && parent && typeof index === "number") {
          toRemove.push({ parent, index });
        }
      }
    });
    for (const { parent, index } of toRemove.reverse()) {
      parent.children.splice(index, 1);
    }
  };
}

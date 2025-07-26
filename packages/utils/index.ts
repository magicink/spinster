import { visit } from "unist-util-visit";
export default function remarkSpinster() {
  return (tree: any) => {
    visit(tree, "p", (node: any, index: number, parent: any) => {
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
          parent.children.splice(index, 1);
        }
      }
    });
  };
}

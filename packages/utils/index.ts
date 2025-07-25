import { visit } from "unist-util-visit";
export default function remarkSpinster() {
  return (tree: any) => {
    visit(tree, "text", (node) => {
      if (node.value.includes("spinster")) {
        node.value = node.value.replace(/spinster/g, "Spinster");
      }
    });
  };
}

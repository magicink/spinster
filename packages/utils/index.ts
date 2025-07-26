import { visit } from 'unist-util-visit'

interface TextNode {
  type: 'text'
  value: string
}

interface LinkNode {
  type: 'link'
  url: string
  children: TextNode[]
}

type ReplacementNode = TextNode | LinkNode

export default function remarkSpinster() {
  // Matches Harlowe style links [[...]]
  const linkRegex = /\[\[([^\]]+?)\]\]/g

  function parseLink(raw: string): { text: string; target: string } {
    const right = raw.indexOf('->')
    const left = raw.indexOf('<-')
    if (right !== -1) {
      return {
        text: raw.slice(0, right).trim(),
        target: raw.slice(right + 2).trim()
      }
    }
    if (left !== -1) {
      return {
        text: raw.slice(left + 2).trim(),
        target: raw.slice(0, left).trim()
      }
    }
    const trimmed = raw.trim()
    return { text: trimmed, target: trimmed }
  }

  return (tree: any) => {
    visit(tree, 'text', (node: any, index: number | undefined, parent: any) => {
      if (
        typeof node.value !== 'string' ||
        !parent ||
        !Array.isArray(parent.children) ||
        typeof index !== 'number'
      )
        return
      const value: string = node.value
      let match
      linkRegex.lastIndex = 0
      const replacements: ReplacementNode[] = []
      let lastIndex = 0
      while ((match = linkRegex.exec(value))) {
        const start = match.index ?? 0
        if (start > lastIndex) {
          replacements.push({
            type: 'text',
            value: value.slice(lastIndex, start)
          })
        }
        const { text, target } = parseLink(match[1])
        replacements.push({
          type: 'link',
          url: `#${encodeURIComponent(target)}`,
          children: [{ type: 'text', value: text }]
        })
        lastIndex = start + match[0].length
      }
      if (replacements.length) {
        if (lastIndex < value.length) {
          replacements.push({ type: 'text', value: value.slice(lastIndex) })
        }
        parent.children.splice(index, 1, ...replacements)
      }
    })
  }
}

import { describe, it, expect } from 'bun:test'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkStringify from 'remark-stringify'
import remarkSpinster from '../index'

describe('remarkSpinster', () => {
  it('leaves text intact when no special syntax is present', async () => {
    const processor = unified()
      .use(remarkParse)
      .use(remarkSpinster)
      .use(remarkStringify)
    const result = await processor.process('hello spinster world')
    expect(result.toString()).toBe('hello spinster world\n')
  })

  it('transforms basic harlowe link', async () => {
    const processor = unified()
      .use(remarkParse)
      .use(remarkSpinster)
      .use(remarkStringify)
    const result = await processor.process('Go to [[Home]]')
    expect(result.toString()).toBe('Go to [Home](#Home)\n')
  })

  it('transforms harlowe link with arrow', async () => {
    const processor = unified()
      .use(remarkParse)
      .use(remarkSpinster)
      .use(remarkStringify)
    const result = await processor.process('[[Click here->Start]]')
    expect(result.toString()).toBe('[Click here](#Start)\n')
  })

  it('transforms harlowe link with reverse arrow', async () => {
    const processor = unified()
      .use(remarkParse)
      .use(remarkSpinster)
      .use(remarkStringify)
    const result = await processor.process('[[Start<-Click here]]')
    expect(result.toString()).toBe('[Click here](#Start)\n')
  })
})

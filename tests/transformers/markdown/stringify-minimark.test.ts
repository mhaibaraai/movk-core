import type { MinimarkDocument } from '../../../src/transformers/markdown'
import { describe, expect, it } from 'vitest'
import { stringifyMinimark } from '../../../src/transformers/markdown'

describe('stringifyMinimark', () => {
  it('序列化基础 Markdown 块和行内节点', () => {
    const document: MinimarkDocument = {
      value: [
        ['h1', {}, 'Title'],
        ['p', {}, 'Hello ', ['strong', {}, 'world'], ' ', ['em', {}, 'again']],
        ['p', {}, ['a', { href: '/x' }, 'link'], ' ', ['img', { src: '/logo.png', alt: 'Logo', title: 'Brand' }]],
      ],
    }

    expect(stringifyMinimark(document)).toMatchInlineSnapshot(`
      "# Title

      Hello **world** *again*

      [link](/x) ![Logo](/logo.png "Brand")
      "
    `)
  })

  it('将未知标签回退为安全 HTML', () => {
    const document: MinimarkDocument = {
      value: [
        ['span', { title: 'a" onclick="alert(1)&<tag>', hidden: true, inert: false, data: { ok: true } }, 'x'],
        ['div', { class: 'box' }, ['p', {}, 'Hello']],
      ],
    }

    expect(stringifyMinimark(document)).toMatchInlineSnapshot(`
      "<span title="a&quot; onclick=&quot;alert(1)&amp;&lt;tag&gt;" hidden data="{&quot;ok&quot;:true}">x</span><div class="box">
      Hello
      </div>
      "
    `)
  })

  it('转义普通文本中的 Markdown 结构字符', () => {
    const document: MinimarkDocument = {
      value: [
        ['p', {}, '# not heading\n> not quote\n- not list\n1. not ordered\n---'],
      ],
    }

    expect(stringifyMinimark(document)).toMatchInlineSnapshot(`
      "\\# not heading
      \\> not quote
      \\- not list
      1\\. not ordered
      \\---
      "
    `)
  })

  it('根据内容选择行内代码 fence', () => {
    const document: MinimarkDocument = {
      value: [
        ['p', {}, ['code', {}, 'a`b'], ' ', ['code', {}, 'a``b'], ' ', ['code', {}, '`edge`']],
      ],
    }

    expect(stringifyMinimark(document)).toBe('``a`b`` ```a``b``` `` `edge` ``\n')
  })

  it('序列化列表和任务列表且不修改输入 AST', () => {
    const document: MinimarkDocument = {
      value: [
        ['ul', {}, ['li', {}, 'A', ['ul', {}, ['li', {}, 'B']]], ['li', { className: ['task-list-item'] }, ['input', { checked: true }], 'Done'],],
      ],
    }
    const before = structuredClone(document)

    expect(stringifyMinimark(document)).toMatchInlineSnapshot(`
      "- A
        - B
      - [x] Done
      "
    `)
    expect(document).toEqual(before)
  })

  it('序列化表格并转义单元格管道字符', () => {
    const document: MinimarkDocument = {
      value: [
        ['table', {}, ['thead', {}, ['tr', {}, ['th', { style: 'text-align: left' }, 'Name'], ['th', { style: 'text-align: right' }, 'Age']]], ['tbody', {}, ['tr', {}, ['td', {}, 'Alice | Bob'], ['td', {}, '18']]],],
      ],
    }

    expect(stringifyMinimark(document)).toMatchInlineSnapshot(`
      "| Name         | Age |
      | :----------- | --: |
      | Alice \\| Bob | 18  |
      "
    `)
  })

  it('在缺失表头时自动生成表头', () => {
    const document: MinimarkDocument = {
      value: [
        ['table', {}, ['tbody', {}, ['tr', {}, ['td', {}, 'Alice'], ['td', {}, '18']]],],
      ],
    }

    expect(stringifyMinimark(document)).toMatchInlineSnapshot(`
      "| Column 1 | Column 2 |
      | -------- | -------- |
      | Alice    | 18       |
      "
    `)
  })
})

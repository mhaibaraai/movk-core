import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { triggerDownload } from '../../../src/helpers/file'

interface FakeLink {
  href: string
  download: string
  style: Record<string, string>
  click: () => void
}

let clicked: Array<{ href: string, download: string }>
let attached: FakeLink[]

beforeEach(() => {
  clicked = []
  attached = []
  vi.stubGlobal('window', {})
  vi.stubGlobal('document', {
    createElement: (): FakeLink => {
      const link: FakeLink = {
        href: '',
        download: '',
        style: {},
        click: () => clicked.push({ href: link.href, download: link.download })
      }
      return link
    },
    body: {
      appendChild: (el: FakeLink) => attached.push(el),
      removeChild: (el: FakeLink) => attached.splice(attached.indexOf(el), 1)
    }
  })
})

afterEach(() => {
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe('triggerDownload', () => {
  it('blob 来源经 object URL 下载并随后回收', () => {
    const create = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:mock')
    const revoke = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {})

    triggerDownload(new Blob(['x']), 'a.txt')

    expect(create).toHaveBeenCalledOnce()
    expect(clicked).toEqual([{ href: 'blob:mock', download: 'a.txt' }])
    expect(revoke).toHaveBeenCalledWith('blob:mock')
  })

  it('字符串来源（URL / dataURL）直接下载，不创建也不回收 object URL', () => {
    const create = vi.spyOn(URL, 'createObjectURL')
    const revoke = vi.spyOn(URL, 'revokeObjectURL')

    triggerDownload('data:image/png;base64,AAAA', 'map.png')

    expect(create).not.toHaveBeenCalled()
    expect(revoke).not.toHaveBeenCalled()
    expect(clicked).toEqual([{ href: 'data:image/png;base64,AAAA', download: 'map.png' }])
  })

  it('下载后移除临时 a 标签', () => {
    triggerDownload('https://example.com/a.pdf', 'a.pdf')
    expect(attached).toHaveLength(0)
  })
})

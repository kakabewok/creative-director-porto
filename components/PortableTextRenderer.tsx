'use client'

/**
 * Minimal Portable Text renderer.
 * Handles: normal paragraphs, headings, strong/em marks, lists.
 * No external deps beyond React.
 */

type Span = {
  _type: 'span'
  _key?: string
  text: string
  marks?: string[]
}

type Block = {
  _type: 'block'
  _key?: string
  style?: string
  children?: Span[]
  listItem?: string
  level?: number
  markDefs?: { _key: string; _type: string; href?: string }[]
}

function renderSpan(span: Span, markDefs: Block['markDefs'] = []) {
  let content: React.ReactNode = span.text

  if (span.marks && span.marks.length > 0) {
    for (const mark of span.marks) {
      if (mark === 'strong') {
        content = <strong key={mark} className="font-semibold text-white/90">{content}</strong>
      } else if (mark === 'em') {
        content = <em key={mark} className="italic">{content}</em>
      } else {
        // Could be a link markDef key
        const def = markDefs?.find((d) => d._key === mark)
        if (def?._type === 'link' && def.href) {
          content = (
            <a
              key={mark}
              href={def.href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 text-white/70 hover:text-white transition-colors"
            >
              {content}
            </a>
          )
        }
      }
    }
  }

  return content
}

function renderBlock(block: Block, index: number) {
  const children = (block.children ?? []).map((span, i) => (
    <span key={span._key ?? i}>{renderSpan(span, block.markDefs)}</span>
  ))

  const style = block.style ?? 'normal'

  if (block.listItem === 'bullet') {
    return <li key={block._key ?? index} className="ml-4 list-disc">{children}</li>
  }
  if (block.listItem === 'number') {
    return <li key={block._key ?? index} className="ml-4 list-decimal">{children}</li>
  }

  switch (style) {
    case 'h1': return <h1 key={block._key ?? index} className="text-3xl font-light text-white mt-6 mb-3">{children}</h1>
    case 'h2': return <h2 key={block._key ?? index} className="text-2xl font-light text-white mt-5 mb-2">{children}</h2>
    case 'h3': return <h3 key={block._key ?? index} className="text-xl font-light text-white mt-4 mb-2">{children}</h3>
    case 'blockquote':
      return (
        <blockquote key={block._key ?? index} className="border-l-2 border-white/20 pl-4 italic text-white/50 my-4">
          {children}
        </blockquote>
      )
    default:
      return (
        <p key={block._key ?? index} className="text-slate-800 dark:text-white/60 font-light leading-relaxed">
          {children}
        </p>
      )
  }
}

interface Props {
  value: unknown
}

export default function PortableTextRenderer({ value }: Props) {
  if (!Array.isArray(value)) return null

  const elements: React.ReactNode[] = []
  let listBuffer: Block[] = []

  const flushList = (type: 'bullet' | 'number') => {
    if (listBuffer.length === 0) return
    const Tag = type === 'bullet' ? 'ul' : 'ol'
    elements.push(
      <Tag key={`list-${elements.length}`} className="my-3 space-y-1 text-slate-800 dark:text-white/60 font-light">
        {listBuffer.map((b, i) => renderBlock(b, i))}
      </Tag>
    )
    listBuffer = []
  }

  for (let i = 0; i < value.length; i++) {
    const block = value[i] as Block
    if (block._type !== 'block') continue

    if (block.listItem) {
      listBuffer.push(block)
    } else {
      if (listBuffer.length > 0) {
        flushList(listBuffer[0].listItem as 'bullet' | 'number')
      }
      elements.push(renderBlock(block, i))
    }
  }

  if (listBuffer.length > 0) flushList(listBuffer[0].listItem as 'bullet' | 'number')

  return <div className="space-y-4">{elements}</div>
}

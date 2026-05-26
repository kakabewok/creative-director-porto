'use client'

import { PortableText, PortableTextComponents } from '@portabletext/react'

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-slate-800 dark:text-white/60 font-light leading-relaxed">
        {children}
      </p>
    ),
    h1: ({ children }) => <h1 className="text-3xl font-light text-slate-900 dark:text-white mt-6 mb-3">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-light text-slate-900 dark:text-white mt-5 mb-2">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-light text-slate-900 dark:text-white mt-4 mb-2">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-slate-300 dark:border-white/20 pl-4 italic text-slate-600 dark:text-white/50 my-4">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="my-3 space-y-1 ml-4 list-disc text-slate-800 dark:text-white/60 font-light">{children}</ul>,
    number: ({ children }) => <ol className="my-3 space-y-1 ml-4 list-decimal text-slate-800 dark:text-white/60 font-light">{children}</ol>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-slate-900 dark:text-white/90">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-4 text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white transition-colors"
      >
        {children}
      </a>
    ),
  },
}

interface Props {
  value: any
}

export default function PortableTextRenderer({ value }: Props) {
  if (!value) return null
  return (
    <div className="space-y-4">
      <PortableText value={value} components={components} />
    </div>
  )
}

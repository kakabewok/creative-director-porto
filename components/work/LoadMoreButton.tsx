'use client'

interface LoadMoreButtonProps {
  onClick: () => void
  isVisible: boolean
}

export default function LoadMoreButton({ onClick, isVisible }: LoadMoreButtonProps) {
  if (!isVisible) return null

  return (
    <div className="flex justify-center py-7">
      <button
        onClick={onClick}
        className="
          text-sm
          tracking-normal
          uppercase
          text-neutral-700
          dark:text-neutral-300
          hover:opacity-60
          dark:hover:text-white
          transition-all
          duration-400
          cursor-pointer
        "
      >
        Load More
      </button>
    </div>
  )
}

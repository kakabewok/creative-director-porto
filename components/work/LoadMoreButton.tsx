'use client'

interface LoadMoreButtonProps {
  onClick: () => void
  isVisible: boolean
}

export default function LoadMoreButton({ onClick, isVisible }: LoadMoreButtonProps) {
  if (!isVisible) return null

  return (
    <div className="flex justify-center py-5">
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
          transition-opacity
          cursor-pointer
        "
      >
        Load More
      </button>
    </div>
  )
}

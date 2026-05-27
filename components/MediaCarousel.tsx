import { forwardRef, useImperativeHandle, useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import type { GalleryItem } from '@/types'
import { optimizeCloudinaryUrl } from '@/lib/media'
import { toEmbedUrl, getYoutubeThumbnail } from '@/lib/mediaUtils'
import ReactPlayer from 'react-player'
import { ExternalLink } from 'lucide-react' // 1. Pastikan import ikon ini di bagian atas file

export type CarouselMediaItem = GalleryItem & { resolvedUrl?: string }

interface Props {
  items: CarouselMediaItem[]
  onIndexChange?: (index: number) => void
}

export interface MediaCarouselHandle {
  paginate: (dir: number) => void
  canPaginate: boolean
  currentIndex: number
  total: number
}

function resolveImageSrc(item: CarouselMediaItem): string {
  if (item.resolvedUrl) return item.resolvedUrl

  if (item.image?.secure_url) {
    return optimizeCloudinaryUrl(item.image.secure_url)
  }

  return '/mock/project-placeholder.jpg'
}

// function VideoSlide({ videoUrl, caption, isActive }: { videoUrl: string, caption?: string, isActive: boolean }) {
//   const [isPlaying, setIsPlaying] = useState(false)
//   const thumbUrl = getYoutubeThumbnail(videoUrl)

//   useEffect(() => {
//     if (!isActive) setIsPlaying(false)
//   }, [isActive])

//   return (
//     <div className="absolute inset-0 bg-zinc-950 flex items-center justify-center p-0">
//       <div className="relative w-full h-full rounded-none overflow-hidden bg-black group">
//         {!isPlaying ? (
//           <div
//             className="absolute inset-0 cursor-pointer"
//             onClick={() => setIsPlaying(true)}
//           >
//             {thumbUrl ? (
//               <Image src={thumbUrl} fill alt="Video thumbnail" className="object-cover transition-transform duration-700 group-hover:scale-105" />
//             ) : (
//               <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center">
//                 <span className="text-white/20 text-xs tracking-widest uppercase">Video</span>
//               </div>
//             )}
//             <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
//               <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform shadow-2xl">
//                 <svg className="w-6 h-6 text-white ml-1 drop-shadow-md" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <>
//             <ReactPlayer
//               src={videoUrl}
//               width="100%"
//               height="100%"
//               playing={true}
//               controls={true}
//               config={{
//                 youtube: {
//                   playerVars: { modestbranding: 1, rel: 0, showinfo: 0 }
//                 } as any
//               }}
//               className="absolute inset-0"
//             />
//             <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
//           </>
//         )}
//       </div>
//     </div>
//   )
// }

function VideoSlide({ videoUrl, caption, isActive }: { videoUrl: string, caption?: string, isActive: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const thumbUrl = getYoutubeThumbnail(videoUrl)

  useEffect(() => {
    if (!isActive) {
      setIsPlaying(false)
      setHasStarted(false)
    }
  }, [isActive])

  const handlePlayTrigger = () => {
    setIsPlaying(true)
    setHasStarted(true)
  }

  const togglePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsPlaying((prev) => !prev)
  }

  return (
    <div className="absolute inset-0 bg-zinc-950 flex items-center justify-center p-0">
      <div className="relative w-full h-full rounded-none overflow-hidden bg-black group select-none">

        {/* TAMPILAN AWAL: Thumbnail & Tombol Play Besar */}
        {!hasStarted ? (
          <div
            className="absolute inset-0 cursor-pointer z-20"
            onClick={handlePlayTrigger}
          >
            {thumbUrl ? (
              <Image src={thumbUrl} fill alt="Video thumbnail" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            ) : (
              <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center">
                <span className="text-white/20 text-xs tracking-widest uppercase">Video</span>
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
              <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform shadow-2xl">
                <svg className="w-6 h-6 text-white ml-1 drop-shadow-md" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* PLAYER UTAMA */}
            {/* @ts-ignore */}
            <ReactPlayer
              src={videoUrl}
              width="100%"
              height="100%"
              playing={isPlaying}
              controls={false}
              config={{
                youtube: {
                  playerVars: { modestbranding: 1, rel: 0, showinfo: 0 }
                } as any
              }}
              className="absolute inset-0 pointer-events-none"
            />

            {/* ZONA 1: JALUR SWIPE ATAS */}
            < div className="absolute top-0 left-0 right-0 h-[15%] bg-transparent z-30 pointer-events-auto cursor-grab active:cursor-grabbing" />

            {/* ZONA 2: TOMBOL PLAY/PAUSE TENGAH */}
            < div
              className="absolute top-[15%] bottom-[15%] left-0 right-0 bg-transparent z-30 pointer-events-auto flex items-center justify-center cursor-pointer"
              onClick={togglePlayPause}
            >
              {!isPlaying && (
                <div className="w-14 h-14 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-white/20 shadow-xl">
                  <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </div>
              )}
            </div>

            {/* ZONA 3: JALUR SWIPE BAWAH */}
            <div className="absolute bottom-0 left-0 right-0 h-[15%] bg-transparent z-30 pointer-events-auto cursor-grab active:cursor-grabbing" />

            {/* 🛠️ FITUR BARU: TOMBOL DIRECT KE YOUTUBE */}
            {/* Menggunakan z-40 agar berada di lapisan paling atas dan aman untuk diklik di HP/Laptop */}
            <a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-4 right-4 z-40 flex items-center gap-2 px-0 py-0 bg-transparent backdrop-blur-md border border-white/10 rounded-full text-white/80 hover:text-white text-xs tracking-wider uppercase transition-all duration-300 pointer-events-auto cursor-pointer shadow-lg"
              onClick={(e) => e.stopPropagation()} // Mencegah klik tombol ini ikut mem-pause video
            >
              {/* <span>Watch on YouTube</span> */}
              <ExternalLink size={12} className="opacity-70" />
            </a>

            {/* Efek Gradasi Estetik */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-10" />
          </>
        )}
      </div>
    </div >
  )
}

const MediaCarousel = forwardRef<MediaCarouselHandle, Props>(({ items, onIndexChange }, ref) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'center',
    dragFree: false
  })

  const [currentIndex, setCurrentIndex] = useState(0)

  const total = items.length

  const paginate = useCallback(
    (dir: number) => {
      if (!emblaApi) return
      if (dir === 1) {
        emblaApi.scrollNext()
      } else {
        emblaApi.scrollPrev()
      }
    },
    [emblaApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    const newIndex = emblaApi.selectedScrollSnap()
    setCurrentIndex(newIndex)
    onIndexChange?.(newIndex)
  }, [emblaApi, onIndexChange])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    // Initialize correct index on mount
    onSelect()
  }, [emblaApi, onSelect])

  useImperativeHandle(ref, () => ({
    paginate,
    canPaginate: total > 1,
    currentIndex,
    total
  }), [paginate, total, currentIndex])

  if (total === 0) return null

  // aspect-[16/9]

  return (
    <div
      className="relative w-full aspect-[16/9] bg-zinc-950 overflow-hidden select-none"
      role="region"
      aria-label="Project media carousel"
      ref={emblaRef}
    >
      <div className="flex h-full w-full touch-pan-y">
        {items.map((item, index) => {
          const imgSrc = resolveImageSrc(item)
          const isActive = index === currentIndex

          return (
            <div key={item._key || index} className="relative flex-[0_0_100%] min-w-0 h-full">
              {item.type === 'image' ? (
                <Image
                  src={imgSrc}
                  alt={item.caption || "Gallery item"}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  sizes="100vw"
                />
              ) : item.type === 'video' && item.videoUrl ? (
                <VideoSlide
                  videoUrl={item.videoUrl}
                  caption={item.caption}
                  isActive={isActive}
                />
              ) : (
                <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center">
                  <span className="text-white/20 text-xs tracking-widest uppercase">No media</span>
                </div>
              )}

              {/* Bottom gradient for overlay readability */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"
                aria-hidden="true"
              />

              {/* Caption */}
              {item.caption && item.type !== 'video' && (
                <div className="absolute bottom-12 left-4 right-4 pointer-events-none z-10">
                  <p className="text-white/35 text-xs tracking-wider">{item.caption}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
})

MediaCarousel.displayName = 'MediaCarousel'
export default MediaCarousel

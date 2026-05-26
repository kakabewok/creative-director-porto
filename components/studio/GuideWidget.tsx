'use client'

import {
    FiAlertTriangle,
    FiCloud,
    FiVideo,
    FiYoutube,
    FiNavigation,
    FiLayers,
    FiPlusSquare,
    FiEdit3,
    FiUploadCloud,
    FiCheckCircle,
    FiFolder,
    FiLock,
} from 'react-icons/fi'

const guidelines = [
    {
        icon: FiCloud,
        title: 'Cloud Storage Integration',
        body: (
            <>
                Uploading <strong className="text-slate-800">Project Images, Profile Photos, or Hero Videos</strong> opens
                the <strong className="text-slate-800">Cloudinary</strong> media interface. Assets are stored there for optimal performance.
            </>
        ),
    },
    {
        icon: FiFolder,
        title: 'Upload to the Correct Folder',
        body: (
            <>
                Always upload to the designated folder inside Cloudinary:{' '}
                <strong className="text-slate-800">portfolio/profile</strong> for profile photos and{' '}
                <strong className="text-slate-800">portfolio/gallery</strong> for project images.
                Keep your assets organized from the start.
            </>
        ),
    },
    {
        icon: FiLock,
        title: 'Do Not Move Assets After Upload',
        body: (
            <>
                <strong className="text-red-600">Never move or rename</strong> an asset after it has been linked to content.
                Moving files breaks the stored URL in Sanity and will cause images to{' '}
                <strong className="text-slate-800">disappear or crash</strong> on the live website.
            </>
        ),
        warning: true,
    },
    {
        icon: FiVideo,
        title: 'Short Hero Videos',
        body: (
            <>
                Under <strong className="text-slate-800">5 MB</strong>, in{' '}
                <strong className="text-slate-800">MP4 / WebM</strong> format. Ideal duration{' '}
                <strong className="text-slate-800">5–10 seconds</strong>, muted autoplay.
            </>
        ),
    },
    {
        icon: FiYoutube,
        title: 'Long Demo Videos',
        body: (
            <>
                Do <strong className="text-slate-800">not</strong> upload long videos directly. Upload to{' '}
                <strong className="text-slate-800">YouTube</strong> first, then paste the URL into the provided field.
            </>
        ),
    },
]

const steps = [
    {
        icon: FiNavigation,
        text: <>Navigate to the <strong className="text-slate-800">Structure</strong> tab in the top menu bar.</>,
    },
    {
        icon: FiLayers,
        text: <>Select the content type you wish to manage, e.g. <strong className="text-slate-800">Project</strong>.</>,
    },
    {
        icon: FiPlusSquare,
        text: <>Click the <strong className="text-slate-800">Create New</strong> icon, or select an existing item to edit.</>,
    },
    {
        icon: FiEdit3,
        text: <>Fill out all required fields — <strong className="text-slate-800">Title, Description, Slug</strong>, etc.</>,
    },
    {
        icon: FiUploadCloud,
        text: (
            <>
                For media, click the upload trigger, navigate to the{' '}
                <strong className="text-slate-800">correct folder</strong> in the Cloudinary pop-up, then upload or select your file.
            </>
        ),
    },
    {
        icon: FiCheckCircle,
        text: (
            <>
                <span className="font-semibold text-red-500">Critical —</span> Click the green{' '}
                <strong className="text-slate-800">Publish</strong> button to push changes live.
            </>
        ),
        highlight: true,
    },
]

export function GuideWidget() {
    return (
        <div className="w-full bg-white border border-slate-50 p-5 md:p-10" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');`}</style>

            {/* ── HEADER ── */}
            <div className="mb-8 border-b border-slate-200 pb-7">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                    CMS · Admin Guide
                </p>
                <h2 className="mb-2 text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
                    Portfolio Dashboard
                </h2>
                <p className="max-w-lg text-sm font-light leading-relaxed text-slate-500">
                    Use this panel to manage and publish your creative portfolio content.
                </p>
            </div>

            {/* ── MAIN GRID ── */}
            <div className="flex flex-col gap-10 lg:flex-row lg:gap-0">

                {/* LEFT — Guidelines */}
                <div className="flex-1 lg:pr-10">
                    <div className="mb-5 flex items-center gap-2">
                        <FiAlertTriangle size={11} className="text-amber-500" />
                        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                            Asset Guidelines
                        </span>
                    </div>

                    <div className="flex flex-col">
                        {guidelines.map((g, i) => (
                            <div
                                key={i}
                                className={`flex items-start gap-4 py-4 ${i < guidelines.length - 1 ? 'border-b border-slate-100' : ''} ${g.warning ? '-mx-4 bg-red-50 px-4' : ''}`}
                            >
                                <div className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center border ${g.warning ? 'border-red-200 text-red-400' : 'border-slate-200 text-slate-500'}`}>
                                    <g.icon size={13} />
                                </div>
                                <div>
                                    <p className={`mb-1 text-[13px] font-medium ${g.warning ? 'text-red-700' : 'text-slate-800'}`}>
                                        {g.title}
                                    </p>
                                    <p className="text-[12.5px] font-light leading-relaxed text-slate-500">
                                        {g.body}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Vertical divider */}
                <div className="hidden w-px shrink-0 self-stretch bg-slate-200 lg:block" />

                {/* RIGHT — Steps */}
                <div className="flex-1 lg:pl-10">
                    <div className="mb-5 flex items-center gap-2">
                        <span className="text-[10px] text-slate-400">◆</span>
                        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                            Workflow Steps
                        </span>
                    </div>

                    <div className="flex flex-col">
                        {steps.map((s, i) => (
                            <div
                                key={i}
                                className={`flex items-start gap-4 py-3.5
                                    ${i < steps.length - 1 ? 'border-b border-slate-100' : ''}
                                    ${s.highlight ? '-mx-4 bg-red-50 px-4' : ''}
                                `}
                            >
                                <span className="mt-1 min-w-[18px] text-[11px] font-medium text-slate-400">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <div className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center border ${s.highlight ? 'border-red-200 text-red-400' : 'border-slate-200 text-slate-500'}`}>
                                    <s.icon size={13} />
                                </div>
                                <p className="text-[12.5px] font-light leading-relaxed text-slate-600">
                                    {s.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── FOOTER ── */}
            <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-5">
                <p className="text-[11px] font-light tracking-widest text-slate-400">
                    SANITY CMS · CLOUDINARY CDN
                </p>
                <p className="text-[11px] font-light text-slate-400">
                    v1.0
                </p>
            </div>
        </div>
    )
}
'use client'

import PageTransition from '@/components/PageTransition'
import ThemeToggle from '@/components/ThemeToggle'
import ResponsiveNavbar from '@/components/ResponsiveNavbar'
import { useState, useEffect } from 'react'

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const [isMount, setIsMount] = useState<boolean>(false);

    useEffect(() => {
        setIsMount(true)
    }, [])

    if (!isMount) return (
        <div className='h-screen bg-black'>
        </div>
    )

    return (
        <>
            <ResponsiveNavbar />
            <ThemeToggle />
            <PageTransition>
                {children}
            </PageTransition>
        </>
    )
}
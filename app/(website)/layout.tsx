import '../globals.css'
import PageTransition from '@/components/PageTransition'
import ThemeToggle from '@/components/ThemeToggle'
import ResponsiveNavbar from '@/components/ResponsiveNavbar'

export default function MainLayout({ children }: { children: React.ReactNode }) {
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

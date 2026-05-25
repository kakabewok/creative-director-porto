import WorkNavSwitcher from '@/components/WorkNavSwitcher'

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
      <WorkNavSwitcher />
    </div>
  )
}

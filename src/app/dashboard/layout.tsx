import Link from 'next/link';
import { 
  LayoutDashboard, 
  PenTool, 
  FileCheck, 
  FolderOpen, 
  User,
  Bell,
  Search,
  Sparkles,
  History
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" />, href: '/dashboard' },
    { label: 'Analyze JD', icon: <Sparkles className="h-5 w-5" />, href: '/dashboard/analyze' },
    { label: 'History', icon: <History className="h-5 w-5" />, href: '/dashboard/history' },
    { label: 'Practice', icon: <PenTool className="h-5 w-5" />, href: '/dashboard/practice' },
    { label: 'Assessments', icon: <FileCheck className="h-5 w-5" />, href: '/dashboard/assessments' },
    { label: 'Resources', icon: <FolderOpen className="h-5 w-5" />, href: '/dashboard/resources' },
    { label: 'Profile', icon: <User className="h-5 w-5" />, href: '/dashboard/profile' },
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r hidden md:flex flex-col">
        <div className="p-6 flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">P</div>
          <span className="text-xl font-bold tracking-tight text-foreground">Placement Prep</span>
        </div>
        <nav className="flex-grow px-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-primary/5 hover:text-primary transition-standard"
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t">
          <div className="p-4 bg-primary/5 rounded-2xl space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-primary">Pro Feature</p>
            <p className="text-xs text-muted-foreground">Unlock personalized interview coaching.</p>
            <Button size="sm" className="w-full text-xs">Upgrade Now</Button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-8 z-10">
          <div className="flex items-center flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search problems, topics..." 
                className="pl-10 h-10 bg-muted/50 border-none focus-visible:ring-primary"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3 pl-4 border-l">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold">John Doe</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Student</p>
              </div>
              <Avatar className="h-9 w-9 border-2 border-primary/20">
                <AvatarImage src="https://picsum.photos/seed/user/100/100" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

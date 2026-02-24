import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Target, Zap, Clock, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
  const stats = [
    { label: 'Completed Problems', value: '124', icon: <Target className="h-4 w-4" />, color: 'text-indigo-600' },
    { label: 'Assessments Taken', value: '12', icon: <Zap className="h-4 w-4" />, color: 'text-amber-600' },
    { label: 'Practice Hours', value: '45.5h', icon: <Clock className="h-4 w-4" />, color: 'text-emerald-600' },
    { label: 'Overall Percentile', value: '92nd', icon: <TrendingUp className="h-4 w-4" />, color: 'text-primary' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, John! 👋</h1>
        <p className="text-muted-foreground">Here's an overview of your placement preparation.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <Card key={idx} className="border-none shadow-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-none shadow-sm">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">#</div>
                  <div className="flex-1">
                    <p className="text-sm font-bold">Solved "Reverse a Linked List"</p>
                    <p className="text-xs text-muted-foreground">Data Structures • 2 hours ago</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-xs">Review</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle className="text-white">Upcoming Assessment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-white/10 rounded-xl space-y-1">
              <p className="text-sm font-bold">General Aptitude Test</p>
              <p className="text-xs opacity-70">Scheduled: Tomorrow at 10:00 AM</p>
            </div>
            <Button variant="secondary" className="w-full font-bold">Set Reminder</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

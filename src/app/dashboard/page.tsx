'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer 
} from 'recharts';
import { Calendar, ChevronRight, BookOpen, Target } from 'lucide-react';

const radarData = [
  { subject: 'DSA', A: 75, fullMark: 100 },
  { subject: 'System Design', A: 60, fullMark: 100 },
  { subject: 'Communication', A: 80, fullMark: 100 },
  { subject: 'Resume', A: 85, fullMark: 100 },
  { subject: 'Aptitude', A: 70, fullMark: 100 },
];

export default function DashboardPage() {
  const readinessScore = 72;
  const circumference = 2 * Math.PI * 40; // r=40
  const offset = circumference - (readinessScore / 100) * circumference;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Placement Dashboard</h1>
        <p className="text-muted-foreground">Track your preparation and readiness for the upcoming season.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 1. Overall Readiness */}
        <Card className="border-none shadow-sm overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold">Overall Readiness</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-8">
            <div className="relative w-48 h-48">
              {/* Background Circle */}
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-muted/30"
                />
                {/* Progress Circle */}
                <circle
                  cx="96"
                  cy="96"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  className="text-primary transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-extrabold">{readinessScore}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">/ 100</span>
              </div>
            </div>
            <p className="mt-4 text-sm font-medium text-muted-foreground uppercase tracking-widest">Readiness Score</p>
          </CardContent>
        </Card>

        {/* 2. Skill Breakdown */}
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-0">
            <CardTitle className="text-lg font-bold">Skill Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] w-full p-0">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fontWeight: 600, fill: '#6b7280' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Skills"
                  dataKey="A"
                  stroke="hsl(245, 58%, 51%)"
                  fill="hsl(245, 58%, 51%)"
                  fillOpacity={0.5}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 3. Continue Practice */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Continue Practice
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-xl font-bold italic font-headline text-foreground/90">Dynamic Programming</h3>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Optimization Problems</p>
                </div>
                <p className="text-xs font-bold text-primary">3 / 10 Completed</p>
              </div>
              <Progress value={30} className="h-2" />
            </div>
            <Button className="w-full rounded-xl h-12 font-bold uppercase tracking-widest shadow-md hover:shadow-lg transition-all">
              Continue Learning
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* 4. Weekly Goals */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Weekly Goals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-muted-foreground uppercase tracking-widest text-[10px]">Problems Solved</span>
                <span className="font-bold">12 / 20</span>
              </div>
              <Progress value={60} className="h-2" />
              <p className="text-[10px] font-bold text-muted-foreground italic text-right">8 more to hit this week's target!</p>
            </div>
            
            <div className="flex justify-between items-center gap-2 pt-2">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => {
                const isActive = [0, 1, 2, 4].includes(idx); // Simulated activity
                return (
                  <div key={idx} className="flex flex-col items-center gap-2">
                    <div 
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-bold transition-all border-2 
                        ${isActive 
                          ? 'bg-primary border-primary text-primary-foreground shadow-sm' 
                          : 'bg-muted/30 border-muted text-muted-foreground'}`}
                    >
                      {day}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* 5. Upcoming Assessments */}
        <Card className="lg:col-span-2 border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Upcoming Assessments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: 'DSA Mock Test', time: 'Tomorrow, 10:00 AM', status: 'Scheduled' },
                { title: 'System Design Review', time: 'Wed, 2:00 PM', status: 'Review' },
                { title: 'HR Interview Prep', time: 'Friday, 11:00 AM', status: 'Preparation' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-muted/20 rounded-2xl border border-muted/30 hover:border-primary/20 transition-all cursor-default group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary font-bold shadow-sm border border-muted group-hover:bg-primary group-hover:text-white transition-colors">
                      {item.title[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold">{item.title}</p>
                      <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">{item.time}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-[10px] font-bold uppercase tracking-widest hover:text-primary">
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

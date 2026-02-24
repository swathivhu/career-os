'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAnalysisHistory } from '@/hooks/use-analysis-history';
import { format } from 'date-fns';
import { History, ChevronRight, Trash2, Calendar } from 'lucide-react';

export default function HistoryPage() {
  const { history, deleteAnalysis, isLoaded } = useAnalysisHistory();

  if (!isLoaded) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analysis History</h1>
        <p className="text-muted-foreground">Review your past job descriptions and preparation roadmaps.</p>
      </div>

      {history.length === 0 ? (
        <Card className="border-dashed border-2 bg-transparent">
          <CardContent className="flex flex-col items-center justify-center p-12 space-y-4">
            <div className="p-4 bg-muted rounded-full">
              <History className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-bold">No history found</h3>
              <p className="text-sm text-muted-foreground">Start by analyzing a job description.</p>
            </div>
            <Button asChild>
              <Link href="/dashboard/analyze">Analyze Now</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <Card key={item.id} className="border-none shadow-sm hover:ring-1 hover:ring-primary/20 transition-all overflow-hidden group">
              <div className="flex items-center p-6">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                      {item.role || 'Unknown Role'} @ {item.company || 'Unknown Company'}
                    </h3>
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-none">
                      Score: {item.readinessScore}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {format(new Date(item.createdAt), 'PPP')}
                    </span>
                    <span className="truncate max-w-[300px]">
                      {item.jdText.substring(0, 100)}...
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={() => deleteAnalysis(item.id)} className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/dashboard/results?id=${item.id}`}>
                      View Plan
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

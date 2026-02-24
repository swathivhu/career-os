/**
 * @fileOverview Hook for managing hardened analysis history in localStorage.
 * Handles schema validation and corrupted entries.
 */
'use client';

import { useState, useEffect } from 'react';
import { AnalysisResult } from '@/lib/analysis-engine';
import { toast } from '@/hooks/use-toast';

const STORAGE_KEY = 'placement_prep_hardened_history';

export function useAnalysisHistory() {
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (!Array.isArray(parsed)) throw new Error('History is not an array');
        
        // Basic schema check for essential fields
        const valid = parsed.filter(item => 
          item.id && 
          item.createdAt && 
          item.jdText && 
          item.extractedSkills && 
          item.plan7Days
        );

        if (valid.length !== parsed.length) {
          toast({
            title: "Data Recovery",
            description: "Some corrupted entries were ignored. Starting fresh where possible.",
          });
        }
        
        setHistory(valid);
      } catch (e) {
        console.error('Failed to load analysis history', e);
        toast({
          variant: "destructive",
          title: "Storage Error",
          description: "One saved entry couldn't be loaded. Create a new analysis.",
        });
      }
    }
    setIsLoaded(true);
  }, []);

  const saveAnalysis = (result: AnalysisResult) => {
    const updated = [result, ...history];
    setHistory(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const updateAnalysis = (updatedResult: AnalysisResult) => {
    const updated = history.map(item => item.id === updatedResult.id ? updatedResult : item);
    setHistory(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const deleteAnalysis = (id: string) => {
    const updated = history.filter(item => item.id !== id);
    setHistory(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const getAnalysis = (id: string) => {
    return history.find(item => item.id === id) || null;
  };

  return { history, saveAnalysis, updateAnalysis, deleteAnalysis, getAnalysis, isLoaded };
}

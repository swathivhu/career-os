/**
 * @fileOverview Hook for managing analysis history in localStorage.
 */
'use client';

import { useState, useEffect } from 'react';
import { AnalysisResult } from '@/lib/analysis-engine';

const STORAGE_KEY = 'placement_prep_analysis_history';

export function useAnalysisHistory() {
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to load analysis history', e);
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
    return history.find(item => item.id === id);
  };

  return { history, saveAnalysis, updateAnalysis, deleteAnalysis, getAnalysis, isLoaded };
}

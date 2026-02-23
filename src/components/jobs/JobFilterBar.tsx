"use client";

import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface FilterState {
  search: string;
  location: string;
  mode: string;
  experience: string;
  source: string;
}

interface JobFilterBarProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
}

export function JobFilterBar({ filters, setFilters }: JobFilterBarProps) {
  const updateFilter = (key: keyof FilterState, value: string) => {
    setFilters({ ...filters, [key]: value === 'all' ? '' : value });
  };

  return (
    <div className="bg-card border-b border-border/50 p-md space-y-md">
      <div className="flex flex-col md:flex-row gap-md items-end">
        <div className="flex-1 space-y-xs w-full">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Search Roles or Companies</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
            <Input 
              placeholder="e.g. React Developer, Swiggy..." 
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              className="pl-10 rounded-none border-border/60 bg-background/50 h-11 focus:ring-primary"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-sm w-full md:w-auto">
          <div className="space-y-xs">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Location</label>
            <Select onValueChange={(v) => updateFilter('location', v)}>
              <SelectTrigger className="rounded-none h-11 border-border/60 bg-background/50 w-full md:w-32 focus:ring-primary">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any</SelectItem>
                <SelectItem value="Bangalore">Bangalore</SelectItem>
                <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                <SelectItem value="Pune">Pune</SelectItem>
                <SelectItem value="Gurgaon">Gurgaon</SelectItem>
                <SelectItem value="Noida">Noida</SelectItem>
                <SelectItem value="Chennai">Chennai</SelectItem>
                <SelectItem value="Mumbai">Mumbai</SelectItem>
                <SelectItem value="Remote">Remote</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-xs">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Mode</label>
            <Select onValueChange={(v) => updateFilter('mode', v)}>
              <SelectTrigger className="rounded-none h-11 border-border/60 bg-background/50 w-full md:w-32 focus:ring-primary">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any</SelectItem>
                <SelectItem value="Remote">Remote</SelectItem>
                <SelectItem value="Hybrid">Hybrid</SelectItem>
                <SelectItem value="Onsite">Onsite</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-xs">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Exp</label>
            <Select onValueChange={(v) => updateFilter('experience', v)}>
              <SelectTrigger className="rounded-none h-11 border-border/60 bg-background/50 w-full md:w-32 focus:ring-primary">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any</SelectItem>
                <SelectItem value="Fresher">Fresher</SelectItem>
                <SelectItem value="0-1">0-1 Year</SelectItem>
                <SelectItem value="1-3">1-3 Years</SelectItem>
                <SelectItem value="3-5">3-5 Years</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-xs">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Source</label>
            <Select onValueChange={(v) => updateFilter('source', v)}>
              <SelectTrigger className="rounded-none h-11 border-border/60 bg-background/50 w-full md:w-32 focus:ring-primary">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any</SelectItem>
                <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                <SelectItem value="Naukri">Naukri</SelectItem>
                <SelectItem value="Indeed">Indeed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}

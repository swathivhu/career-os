"use client";

import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

interface FilterState {
  search: string;
  location: string;
  mode: string;
  experience: string;
  source: string;
  status: string;
  matchesOnly: boolean;
}

interface JobFilterBarProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
}

export function JobFilterBar({ filters, setFilters }: JobFilterBarProps) {
  const updateFilter = (key: keyof FilterState, value: any) => {
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

        <div className="grid grid-cols-3 md:flex gap-sm w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <div className="space-y-xs">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Location</label>
            <Select value={filters.location || "all"} onValueChange={(v) => updateFilter('location', v)}>
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
            <Select value={filters.mode || "all"} onValueChange={(v) => updateFilter('mode', v)}>
              <SelectTrigger className="rounded-none h-11 border-border/60 bg-background/50 w-full md:w-28 focus:ring-primary">
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
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Status</label>
            <Select value={filters.status || "all"} onValueChange={(v) => updateFilter('status', v)}>
              <SelectTrigger className="rounded-none h-11 border-border/60 bg-background/50 w-full md:w-32 focus:ring-primary">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Not Applied">Not Applied</SelectItem>
                <SelectItem value="Applied">Applied</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
                <SelectItem value="Selected">Selected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2 pt-xs">
        <Switch 
          id="matches-only" 
          checked={filters.matchesOnly}
          onCheckedChange={(checked) => updateFilter('matchesOnly', checked)}
        />
        <Label htmlFor="matches-only" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground cursor-pointer">
          Show Only Matches (Match Score &gt; 0)
        </Label>
      </div>
    </div>
  );
}

import { TopBar } from "@/components/layout/TopBar";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

export default function SettingsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopBar />
      <ContextHeader 
        title="Tracking Preferences" 
        subtitle="Define your professional parameters to refine the discovery algorithm."
      />
      <main className="flex-grow w-full max-w-[1400px] mx-auto px-xl py-xl">
        <div className="max-w-[640px] space-y-xl">
          <section className="space-y-md">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-primary/60 border-b border-primary/10 pb-xs">
              01. Role Architecture
            </h3>
            <div className="space-y-sm">
              <Label htmlFor="keywords" className="text-sm uppercase tracking-widest font-bold opacity-70">
                Professional Keywords
              </Label>
              <Input 
                id="keywords" 
                placeholder="e.g. Senior Product Designer, React Engineer, Lead Architect" 
                className="rounded-none border-border/60 bg-card h-12 focus:ring-primary"
              />
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                Separate multiple roles with commas.
              </p>
            </div>
          </section>

          <section className="space-y-md">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-primary/60 border-b border-primary/10 pb-xs">
              02. Geographical Scope
            </h3>
            <div className="space-y-sm">
              <Label htmlFor="location" className="text-sm uppercase tracking-widest font-bold opacity-70">
                Preferred Locations
              </Label>
              <Input 
                id="location" 
                placeholder="e.g. London, New York, Tokyo" 
                className="rounded-none border-border/60 bg-card h-12 focus:ring-primary"
              />
            </div>
          </section>

          <section className="space-y-md">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-primary/60 border-b border-primary/10 pb-xs">
              03. Operational Mode
            </h3>
            <RadioGroup defaultValue="remote" className="grid grid-cols-3 gap-md pt-xs">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="remote" id="remote" className="border-primary" />
                <Label htmlFor="remote" className="text-xs font-bold uppercase tracking-widest cursor-pointer">Remote</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hybrid" id="hybrid" className="border-primary" />
                <Label htmlFor="hybrid" className="text-xs font-bold uppercase tracking-widest cursor-pointer">Hybrid</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="onsite" id="onsite" className="border-primary" />
                <Label htmlFor="onsite" className="text-xs font-bold uppercase tracking-widest cursor-pointer">Onsite</Label>
              </div>
            </RadioGroup>
          </section>

          <section className="space-y-md">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-primary/60 border-b border-primary/10 pb-xs">
              04. Seniority Level
            </h3>
            <Select>
              <SelectTrigger className="w-full h-12 rounded-none border-border/60 bg-card focus:ring-primary">
                <SelectValue placeholder="Select Experience Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="junior">Junior (0-2 years)</SelectItem>
                <SelectItem value="mid">Mid-Weight (3-5 years)</SelectItem>
                <SelectItem value="senior">Senior (6+ years)</SelectItem>
                <SelectItem value="lead">Lead / Principal</SelectItem>
                <SelectItem value="executive">Executive</SelectItem>
              </SelectContent>
            </Select>
          </section>

          <div className="pt-md">
            <Button className="w-full md:w-auto px-xl h-14 rounded-none bg-foreground text-background font-bold uppercase tracking-[0.2em] hover:bg-foreground/90">
              Apply Configuration
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

import { TopBar } from "@/components/layout/TopBar";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { ProofFooter } from "@/components/layout/ProofFooter";
import { SecondaryPanel } from "@/components/layout/SecondaryPanel";
import { AiAssistant } from "@/components/AiAssistant";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const artifacts = [
    { name: "core_engine.bin", size: "4.2MB", type: "Binary", status: "Verified" },
    { name: "manifest.json", size: "12KB", type: "Config", status: "Ready" },
    { name: "assets_bundle.tar", size: "128MB", type: "Package", status: "Pending" },
    { name: "security_key.pem", size: "2KB", type: "Security", status: "Verified" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background pb-32">
      <TopBar />
      
      <ContextHeader 
        title="Initialize System Architecture" 
        subtitle="Configure the primary workspace and establish build parameters for the KodNest Premium enterprise suite."
      />

      <main className="flex-grow w-full max-w-[1400px] mx-auto px-xl mt-xl flex gap-xl">
        {/* Primary Workspace (70%) */}
        <div className="w-[70%] space-y-xl">
          <section>
            <h2 className="text-2xl font-headline mb-md">System Artifacts</h2>
            <Card className="rounded-none border-border shadow-none bg-card">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="font-bold uppercase tracking-widest text-[10px]">Artifact Name</TableHead>
                    <TableHead className="font-bold uppercase tracking-widest text-[10px]">Dimension</TableHead>
                    <TableHead className="font-bold uppercase tracking-widest text-[10px]">Classification</TableHead>
                    <TableHead className="font-bold uppercase tracking-widest text-[10px] text-right">Integrity Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {artifacts.map((item) => (
                    <TableRow key={item.name} className="border-border hover:bg-accent/5 transition-standard">
                      <TableCell className="font-semibold text-sm">{item.name}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{item.size}</TableCell>
                      <TableCell className="text-sm font-medium">{item.type}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant="outline" className={`rounded-none px-2 py-0 border-transparent font-bold uppercase tracking-tighter text-[9px] ${
                          item.status === 'Verified' ? 'text-green-700 bg-green-50' : 
                          item.status === 'Pending' ? 'text-amber-700 bg-amber-50' : 
                          'text-primary bg-primary/5'
                        }`}>
                          {item.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-headline mb-md">Operational Logs</h2>
            <div className="bg-card border border-border p-md font-code text-xs text-muted-foreground leading-relaxed h-48 overflow-y-auto">
              [SYSTEM] initializing secure tunnel...<br/>
              [AUTH] principal identified as Enterprise Manager<br/>
              [BUILD] loading manifest v1.0.4<br/>
              [BUILD] dependencies verified (48/48)<br/>
              [WARN] network latency detected (45ms)<br/>
              [INFO] workspace ready for interaction<br/>
              _
            </div>
          </section>
        </div>

        {/* Secondary Panel (30%) */}
        <aside className="w-[30%] space-y-xl border-l border-border/50 pl-xl">
          <SecondaryPanel />
          <div className="pt-xl border-t border-border/30">
            <AiAssistant />
          </div>
        </aside>
      </main>

      <ProofFooter />
    </div>
  );
}

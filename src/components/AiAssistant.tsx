"use client";

import { useState } from "react";
import { aiErrorResolutionAssistant, AiErrorResolutionAssistantOutput } from "@/ai/flows/ai-error-resolution-assistant-flow";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AlertCircle, Loader2, Sparkles } from "lucide-react";

export function AiAssistant() {
  const [errorInput, setErrorInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiErrorResolutionAssistantOutput | null>(null);

  const handleResolve = async () => {
    if (!errorInput.trim()) return;
    setLoading(true);
    try {
      const response = await aiErrorResolutionAssistant({
        errorMessage: errorInput,
        context: "KodNest Build System Main Interface"
      });
      setResult(response);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-md">
      <section>
        <h3 className="text-sm font-bold uppercase tracking-widest mb-xs text-muted-foreground">Failure Diagnostic</h3>
        <div className="space-y-xs">
          <textarea
            value={errorInput}
            onChange={(e) => setErrorInput(e.target.value)}
            placeholder="Paste error message here..."
            className="w-full bg-background border border-border p-sm text-sm focus:outline-none focus:ring-1 focus:ring-primary min-h-[100px] font-code"
          />
          <Button 
            onClick={handleResolve} 
            disabled={loading || !errorInput}
            className="w-full rounded-none bg-foreground text-background font-bold uppercase tracking-widest hover:bg-foreground/90"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
            Analyze with AI
          </Button>
        </div>
      </section>

      {result && (
        <Card className="rounded-none border-primary/20 bg-primary/[0.02]">
          <CardHeader className="pb-xs">
            <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-xs">
              <AlertCircle className="h-4 w-4 text-primary" />
              AI Resolution Strategy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-sm">
            <p className="text-sm text-foreground/90 leading-relaxed italic border-l-2 border-primary pl-xs">
              {result.explanation}
            </p>
            <div className="space-y-xs">
              {result.resolutionSteps.map((step, idx) => (
                <div key={idx} className="flex gap-sm text-sm">
                  <span className="font-bold text-primary">{idx + 1}.</span>
                  <span className="text-muted-foreground font-medium">{step}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

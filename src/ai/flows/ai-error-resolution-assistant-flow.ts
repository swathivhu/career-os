'use server';
/**
 * @fileOverview An AI assistant for resolving errors in the KodNest Premium Build System.
 *
 * - aiErrorResolutionAssistant - A function that handles the error resolution process.
 * - AiErrorResolutionAssistantInput - The input type for the aiErrorResolutionAssistant function.
 * - AiErrorResolutionAssistantOutput - The return type for the aiErrorResolutionAssistant function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AiErrorResolutionAssistantInputSchema = z.object({
  errorMessage: z.string().describe('A detailed error message encountered by the user.'),
  context: z.string().optional().describe('Optional: Additional context about where the error occurred or what the user was trying to do.'),
});
export type AiErrorResolutionAssistantInput = z.infer<typeof AiErrorResolutionAssistantInputSchema>;

const AiErrorResolutionAssistantOutputSchema = z.object({
  explanation: z.string().describe('A clear explanation of what went wrong, without blaming the user.'),
  resolutionSteps: z.array(z.string()).describe('A list of concrete, actionable steps to resolve the error.'),
});
export type AiErrorResolutionAssistantOutput = z.infer<typeof AiErrorResolutionAssistantOutputSchema>;

export async function aiErrorResolutionAssistant(input: AiErrorResolutionAssistantInput): Promise<AiErrorResolutionAssistantOutput> {
  return aiErrorResolutionAssistantFlow(input);
}

const aiErrorResolutionAssistantPrompt = ai.definePrompt({
  name: 'aiErrorResolutionAssistantPrompt',
  input: { schema: AiErrorResolutionAssistantInputSchema },
  output: { schema: AiErrorResolutionAssistantOutputSchema },
  prompt: `You are an AI Error Resolution Assistant for the KodNest Premium Build System. Your goal is to help users quickly understand and fix errors.

When an error occurs, you will:
1. Explain clearly and concisely what went wrong. Do NOT blame the user.
2. Provide a list of concrete, actionable steps the user can take to resolve the issue.

Error Message: {{{errorMessage}}}

{{#if context}}
Context: {{{context}}}
{{/if}}`,
});

const aiErrorResolutionAssistantFlow = ai.defineFlow(
  {
    name: 'aiErrorResolutionAssistantFlow',
    inputSchema: AiErrorResolutionAssistantInputSchema,
    outputSchema: AiErrorResolutionAssistantOutputSchema,
  },
  async (input) => {
    const { output } = await aiErrorResolutionAssistantPrompt(input);
    return output!;
  }
);

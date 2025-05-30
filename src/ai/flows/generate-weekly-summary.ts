'use server';

/**
 * @fileOverview Generates a weekly summary of work based on commits and Jira updates.
 *
 * - generateWeeklySummary - A function that generates the weekly summary.
 * - GenerateWeeklySummaryInput - The input type for the generateWeeklySummary function.
 * - GenerateWeeklySummaryOutput - The return type for the generateWeeklySummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateWeeklySummaryInputSchema = z.object({
  commits: z.string().describe('A summary of commits for the week.'),
  jiraUpdates: z.string().describe('A summary of Jira updates for the week.'),
  manualLogs: z.string().optional().describe('Optional manual logs for the week.'),
});
export type GenerateWeeklySummaryInput = z.infer<typeof GenerateWeeklySummaryInputSchema>;

const GenerateWeeklySummaryOutputSchema = z.object({
  summary: z.string().describe('The generated weekly summary.'),
});
export type GenerateWeeklySummaryOutput = z.infer<typeof GenerateWeeklySummaryOutputSchema>;

export async function generateWeeklySummary(input: GenerateWeeklySummaryInput): Promise<GenerateWeeklySummaryOutput> {
  return generateWeeklySummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateWeeklySummaryPrompt',
  input: {schema: GenerateWeeklySummaryInputSchema},
  output: {schema: GenerateWeeklySummaryOutputSchema},
  prompt: `You are an AI assistant that generates weekly summaries of work.

  Here's a summary of commits for the week: {{{commits}}}
  Here's a summary of Jira updates for the week: {{{jiraUpdates}}}
  Here are the manual logs for the week: {{{manualLogs}}}

  Please generate a concise and informative weekly summary based on the information provided. Focus on accomplishments and areas needing attention.
  `,
});

const generateWeeklySummaryFlow = ai.defineFlow(
  {
    name: 'generateWeeklySummaryFlow',
    inputSchema: GenerateWeeklySummaryInputSchema,
    outputSchema: GenerateWeeklySummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

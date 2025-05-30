'use server';

/**
 * @fileOverview This file defines a Genkit flow for improving commit messages using GenAI.
 *
 * It takes an initial commit message as input and returns an improved version of the message
 * that is clearer and more informative for other developers.
 *
 * @fileOverview
 * - `improveCommitMessage`: A function that takes an initial commit message and returns an improved version.
 * - `ImproveCommitMessageInput`: The input type for the `improveCommitMessage` function.
 * - `ImproveCommitMessageOutput`: The output type for the `improveCommitMessage` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImproveCommitMessageInputSchema = z.object({
  initialCommitMessage: z
    .string()
    .describe('The initial commit message that needs improvement.'),
});
export type ImproveCommitMessageInput = z.infer<typeof ImproveCommitMessageInputSchema>;

const ImproveCommitMessageOutputSchema = z.object({
  improvedCommitMessage: z
    .string()
    .describe('The improved commit message that is clearer and more informative.'),
});
export type ImproveCommitMessageOutput = z.infer<typeof ImproveCommitMessageOutputSchema>;

export async function improveCommitMessage(
  input: ImproveCommitMessageInput
): Promise<ImproveCommitMessageOutput> {
  return improveCommitMessageFlow(input);
}

const improveCommitMessagePrompt = ai.definePrompt({
  name: 'improveCommitMessagePrompt',
  input: {schema: ImproveCommitMessageInputSchema},
  output: {schema: ImproveCommitMessageOutputSchema},
  prompt: `You are an AI that improves commit messages.

  Your goal is to make the commit message clearer and more informative for other developers.
  You should focus on explaining the changes made in the commit and why they were made.
  The improved commit message should be concise and easy to understand.

  Here is the initial commit message:
  {{initialCommitMessage}}

  Now, generate an improved commit message:
  `,
});

const improveCommitMessageFlow = ai.defineFlow(
  {
    name: 'improveCommitMessageFlow',
    inputSchema: ImproveCommitMessageInputSchema,
    outputSchema: ImproveCommitMessageOutputSchema,
  },
  async input => {
    const {output} = await improveCommitMessagePrompt(input);
    return output!;
  }
);

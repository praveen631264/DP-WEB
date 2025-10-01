import { Injectable } from '@angular/core';

export interface Kvp {
  key: string;
  value: string;
}

@Injectable({
  providedIn: 'root'
})
export class KvpService {

  constructor() { }

  extractKvps(docContent: string, prompt: string): Kvp[] {
    console.log('Extracting KVPs from document with prompt:', prompt);

    const allKvps: Kvp[] = [];
    const lines = docContent.split('\n');

    for (const line of lines) {
      const parts = line.split(':');
      if (parts.length === 2) {
        const key = parts[0].trim();
        const value = parts[1].trim();
        allKvps.push({ key, value });
      }
    }

    const lowerCasePrompt = prompt.toLowerCase();
    
    // If prompt is generic, return all found KVPs
    if (lowerCasePrompt.includes('all') || lowerCasePrompt.includes('everything') || lowerCasePrompt.includes('extract')) {
      return allKvps;
    }

    // Otherwise, filter for KVPs mentioned in the prompt
    const requestedKvps = allKvps.filter(kvp => 
      lowerCasePrompt.includes(kvp.key.toLowerCase().replace('#', ''))
    );
    
    if (requestedKvps.length > 0) {
      return requestedKvps;
    }
    
    // If no specific keys were matched from the prompt, return an empty array.
    return [];
  }
}

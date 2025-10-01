export interface ChatHistory {
  messages: {
    author: 'user' | 'ai';
    text: string;
  }[];
}
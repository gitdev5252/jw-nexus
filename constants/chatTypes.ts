export interface ChatMessage {
  id: string;
  text: string;
  sender: 'me' | 'them';
  timestamp: string;
}

export interface Contact {
  id: string;
  name: string;
  lastMessage: string;
  messages: ChatMessage[];
}

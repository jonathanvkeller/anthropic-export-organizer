export interface ChatMessage {
  id: string;
  type: string;
  role: string;
  content: { type: string; text: string }[];
  model: string;
  stop_reason?: string | null;
  stop_sequence?: string | null;
  usage?: {
    input_tokens: number;
    output_tokens: number;
  };
}

export interface ChatEntry {
  id: string;
  title: string;
  messages: ChatMessage[];
  deleted?: boolean;
  folderId?: string;
}

export interface ChatFolder {
  id: string;
  name: string;
}

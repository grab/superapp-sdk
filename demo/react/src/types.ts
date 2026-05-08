export type PageState =
  | { status: 'loading'; message: string }
  | { status: 'error';   message: string; type: 'error' | 'warning' }
  | { status: 'ready' };

export type MessageType = 'success' | 'error' | 'warning';
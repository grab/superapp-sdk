export type MessageType = 'success' | 'error' | 'warning';

interface StatusMessageProps {
  message: string;
  type: MessageType;
}

export function StatusMessage({ message, type }: StatusMessageProps) {
  const colorClass = type === 'success' ? 'text-green-500' : type === 'error' ? 'text-red-500' : 'text-yellow-500';
  return <p className={colorClass}>{message}</p>;
}
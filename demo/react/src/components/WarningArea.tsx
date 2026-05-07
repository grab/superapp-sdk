import { StatusMessage } from './StatusMessage';

interface WarningAreaProps {
  warning: string | null;
}

export function WarningArea({ warning }: WarningAreaProps) {
  if (!warning) return null;
  return <div className="mb-4"><StatusMessage message={warning} type="warning" /></div>;
}
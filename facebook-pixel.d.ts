declare global {
  interface Window {
    fbq: (command: string, ...args: any[]) => void;
  }
}
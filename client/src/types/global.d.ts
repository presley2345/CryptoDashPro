
// Global type declarations
declare global {
  interface Window {
    smartsupp: {
      (command: string, ...args: any[]): void;
      _: any[];
    } | undefined;
  }
}

export {};

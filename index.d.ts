export {};

declare module '*.svg' {
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

declare global {
  interface Window {
    msCrypto?: any;
  }
  interface Crypto {
    webkitSubtle?: any;
  }
}

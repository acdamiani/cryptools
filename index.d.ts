declare module '*.svg' {
  import React from 'react';
  const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}

declare interface Window {
  msCrypto?: any;
}

declare interface Crypto {
  webkitSubtle?: any;
}

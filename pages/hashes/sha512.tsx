import Area from '@/components/Area/area';
import Hash from '@/components/Hash/hash';
import BrowserHash from '@/src/hashes/browser';

export default function SHA512() {
  const sha512 = new BrowserHash(`sha512`);

  return (
    <>
      <h1>SHA-512 Hash Generator Online</h1>
      <Area>
        <Hash
          hash={sha512.hash.bind(sha512)}
          hashName="sha512"
          outputRows={2}
        />
      </Area>
    </>
  );
}

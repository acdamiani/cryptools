import Area from '@/components/Area/area';
import Hash from '@/components/Hash/hash';
import BrowserHash from '@/src/hashes/browser';

export default function SHA256() {
  const sha256 = new BrowserHash(`sha256`);

  return (
    <>
      <h1>SHA-256 Hash Generator Online</h1>
      <Area>
        <Hash
          hash={sha256.hash.bind(sha256)}
          hashBytes={sha256.hashBytes.bind(sha256)}
          hashName="sha256"
        />
      </Area>
    </>
  );
}

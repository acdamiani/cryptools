import Area from '@/components/Area/area';
import Hash from '@/components/Hash/hash';
import BrowserHash from '@/src/hashes/browser';

export default function SHA384() {
  const sha384 = new BrowserHash(`sha384`);

  return (
    <>
      <h1>SHA-384 Hash Generator Online</h1>
      <Area>
        <Hash
          hash={sha384.hash.bind(sha384)}
          hashBytes={sha384.hashBytes.bind(sha384)}
          hashName="sha384"
        />
      </Area>
    </>
  );
}

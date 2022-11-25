import Area from '@/components/Area/area';
import Hash from '@/components/Hash/hash';
import BrowserHash from '@/src/hashes/browserHash';

export default function MD5() {
  const sha256 = new BrowserHash(`sha256`);

  return (
    <>
      <h1>SHA-256 Hash Generator Online</h1>
      <Area>
        <Hash hash={sha256.hash.bind(sha256)} hashName="sha256" />
      </Area>
    </>
  );
}

import Area from '@/components/Area/area';
import Hash from '@/components/Hash/hash';
import BrowserHash from '@/src/hashes/browserHash';

export default function MD5() {
  const sha384 = new BrowserHash(`sha384`);

  return (
    <>
      <h1>SHA-384 Hash Generator Online</h1>
      <Area>
        <Hash hash={sha384.hash.bind(sha384)} hashName="sha384" />
      </Area>
    </>
  );
}

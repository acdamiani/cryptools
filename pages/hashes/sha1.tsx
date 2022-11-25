import Area from '@/components/Area/area';
import Hash from '@/components/Hash/hash';
import BrowserHash from '@/src/hashes/browser';

export default function SHA1() {
  const sha1 = new BrowserHash(`sha1`);

  return (
    <>
      <h1>SHA-1 Hash Generator Online</h1>
      <Area>
        <Hash hash={sha1.hash.bind(sha1)} hashName="sha1" />
      </Area>
    </>
  );
}

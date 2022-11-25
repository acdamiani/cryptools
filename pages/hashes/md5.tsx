import Area from '@/components/Area/area';
import Hash from '@/components/Hash/hash';
import MD5Hash from '@/src/hashes/md5';

export default function MD5() {
  const md5 = new MD5Hash();

  return (
    <>
      <h1>MD5 Hash Generator Online</h1>
      <Area>
        <Hash hash={md5.hash.bind(md5)} hashName="md5" />
      </Area>
    </>
  );
}

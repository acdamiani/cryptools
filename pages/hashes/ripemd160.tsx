import Area from '@/components/Area/area';
import Hash from '@/components/Hash/hash';
import RIPEMD160 from '@/src/hashes/ripemd160';

export default function Ripemd160() {
  const ripemd160 = new RIPEMD160();

  return (
    <>
      <h1>RIPEMD-160 Hash Generator Online</h1>
      <Area>
        <Hash hash={ripemd160.hash.bind(ripemd160)} />
      </Area>
    </>
  );
}

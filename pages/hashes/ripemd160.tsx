import Area from '@/components/Area/area';
import Hash from '@/components/Hash/hash';
import RIPEMD160Hash from '@/src/hashes/ripemd160';

export default function RIPEMD160() {
  const ripemd160 = new RIPEMD160Hash();

  return (
    <>
      <h1>RIPEMD-160 Hash Generator Online</h1>
      <Area>
        <Hash
          hash={ripemd160.hash.bind(ripemd160)}
          hashBytes={ripemd160.hashBytes.bind(ripemd160)}
          hashName="ripemd160"
        />
      </Area>
    </>
  );
}

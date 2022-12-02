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
      <main>
        <h2>The RIPEMD-160 Hash Algorithm</h2>
        <p>
          The RIPEMD-160 hashing algorithm is part of a family of algorithms
          developed in 1996. The original RIPEMD algorithm (created in 1992) was
          based off of the popular hashing algorithm of the time&mdash;MD4. It
          was designed to be a more secure version of MD4, suitable for projects
          that required higher levels of security.
        </p>
        <p>
          After a number of security weaknesses were discovered with the
          original algorithm (most notably a hash collision), a small group of
          programmers created strenghtened versions of the original algorithm.
          RIPEMD-160 was one of them, and remains the most widely used.
        </p>
        <h3>RIPEMD-160 Uses</h3>
        <p>
          Like other hashing algorithms, RIPEMD-160 takes an arbitrary input of
          bytes and produces a 20 byte (160 bit) output. It can be used to store
          passwords, credit cards, and other sensitive information. However,
          RIPEMD-160 is much slower than both MD5 and the SHA-2 family of
          algorithms. Notably, Bitcoin used RIPEMD-160 hashes for their older
          addresses as RIPEMD-160 is one of the shortest unique hash algorithms.
        </p>
      </main>
    </>
  );
}

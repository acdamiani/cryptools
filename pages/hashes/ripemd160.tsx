import Area from '@/components/Area/area';
import Hash from '@/components/Hash/hash';
import RIPEMD160Hash from '@/src/hashes/ripemd160';
import CodeBlock, { CodeBlockHTML } from '@/components/CodeBlock/code-block';
import highlight from '@/src/code';
import Meta, { OpenGraph } from '@/components/Meta/meta';

const title = `RIPEMD-160 Hash Generator - Cryptools`;
const description = `RIPEMD-160 hash generator from a string or bytes, with C#, Python, Javascript, Ruby, and Go code samples.`;
const og: OpenGraph = { url: `https://cryptools.dev/hashes/ripemd160` };

const CODE_SNIPPETS: CodeBlockHTML = {
  csharp: `using System;
using System.Text;
using System.Security.Cryptography;

string message = "Hello World";
RIPEMD160 hash = RIPEMD160.Create();

string hashed = String.Empty;
byte[] bytes = hash.ComputeHash(Encoding.ASCII.GetBytes(message));

foreach (byte b in bytes) {
  hashed += b.ToString("x2");
}

Console.WriteLine($"Computed hash of {message}: {hashed}");`,
  javascript: `// using Node.js crypto
const crypto = require("crypto");

const message = "Hello World";

const hash = crypto.createHash("ripemd160")
  .update(message)
  .digest("hex");

console.log(\`Computed hash of \${message}: \${hash}\`);`,
  ruby: `require 'digest'

message = 'Hello World'
hash = Digest::RMD160.hexdigest(message)

puts "Computed hash of #{message}: #{hash}"`,
  python: `from hashlib import new

message = "Hello World"
hash = new("ripemd160", message.encode("utf-8")).hexdigest()

print(f"Computed hash of {message}: {hash}")`,
};

export default function RIPEMD160({ code }: { code: CodeBlockHTML }) {
  const ripemd160 = new RIPEMD160Hash();

  return (
    <>
      <Meta title={title} description={description} og={og} />
      <h1>RIPEMD-160 Hash Generator</h1>
      <Area>
        <Hash
          hash={ripemd160.hash.bind(ripemd160)}
          hashBytes={ripemd160.hashBytes.bind(ripemd160)}
          hashName="ripemd160"
        />
        <CodeBlock snippets={code} />
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

export async function getStaticProps() {
  return {
    props: { code: await highlight(CODE_SNIPPETS) },
  };
}

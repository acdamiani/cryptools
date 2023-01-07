import Area from '@/components/Area/area';
import Hash from '@/components/Hash/hash';
import MD5Hash from '@/src/hashes/md5';
import Link from '@/components/Link/link';
import CodeBlock, { CodeBlockHTML } from '@/components/CodeBlock/code-block';
import highlight from '@/src/code';
import Meta, { OpenGraph } from '@/components/Meta/meta';

const title = `MD5 Hash Generator - Cryptools`;
const description = `MD5 hash generator from a string or bytes, with C#, Python, Javascript, Ruby, and Go code samples.`;
const og: OpenGraph = { url: `https://cryptools.dev/hashes/md5` };

const COLLISIONS = [
  `4dc968ff0ee35c209572d4777b721587d36fa7b21bdc56b74a3dc0783e7b9518afbfa200a82` +
    `84bf36e8e4b55b35f427593d849676da0d1555d8360fb5f07fea2`,
  `4dc968ff0ee35c209572d4777b721587d36fa7b21bdc56b74a3dc0783e7b9518afbfa202a828` +
    `4bf36e8e4b55b35f427593d849676da0d1d55d8360fb5f07fea2`,
];

const CODE_SNIPPETS: CodeBlockHTML = {
  csharp: `using System;
using System.Text;
using System.Security.Cryptography;

string message = "Hello World";
MD5 hash = MD5.Create();

string hashed = String.Empty;
byte[] bytes = hash.ComputeHash(Encoding.ASCII.GetBytes(message));

foreach (byte b in bytes) {
  hashed += b.ToString("x2");
}

Console.WriteLine($"Computed hash of {message}: {hashed}");`,
  ruby: `require 'digest'

message = 'Hello World'
hash = Digest::MD5.hexdigest(message);

puts "Computed hash of #{message}: #{hash}"`,
  javascript: `// using Node.js crypto
const crypto = require("crypto");

const message = "Hello World";

const hash = crypto.createHash("md5")
  .update(message)
  .digest("hex");

console.log(\`Computed hash of \${message}: \${hash}\`);`,
  go: `package main

import (
	"crypto/md5"
	"encoding/hex"
	"fmt"
)

func main() {
	message := "Hello World"
	digest := md5.New()
	digest.Write([]byte(message))
	hash := hex.EncodeToString(digest.Sum(nil))

	fmt.Println(fmt.Sprintf("Computed hash of %s: %s", message, hash))
}`,
  python: `from hashlib import md5
  
message = "Hello World"
hash = md5(message.encode("utf-8")).hexdigest()

print(f"Computed hash of {message}: {hash}")`,
};

export default function MD5({ code }: { code: CodeBlockHTML }) {
  const md5 = new MD5Hash();

  return (
    <>
      <Meta title={title} description={description} og={og} />
      <h1>MD5 Hash Generator</h1>
      <Area>
        <Hash
          hash={md5.hash.bind(md5)}
          hashBytes={md5.hashBytes.bind(md5)}
          hashName="md5"
        />
        <CodeBlock snippets={code} />
      </Area>
      <main>
        <h2>The MD5 Hash</h2>
        <p>
          MD5 is a hashing algorihtm capable of producing a 128-bit (16 byte)
          hash from an arbitrary input of bytes. It has been found
          crypographically broken and unsuitable for further use, due to the
          ease of finding hash collisions. Collisions are two different input
          buffers that produce the same output. Attackers can exploit this to
          validate malicious data (called a collision attack), and tamper with
          machines.
        </p>
        <p>
          The following bytes, for example, produce the same MD5 hash, even
          though they have <em>slightly</em> different values.
        </p>
        <ul>
          <li>
            <code>{COLLISIONS[0]}</code>
          </li>
          <li>
            <code>{COLLISIONS[1]}</code>
          </li>
        </ul>
        <h3>Uses for MD5</h3>
        <p>
          Hashing algorithms like MD5 are useful because they always produce the
          same output for the same input, but make it nearly impossible to
          reverse-engineer a given hash to its original input. They can be used
          to store passwords, banking information, and other sensitive data so
          that in the event of a data leak, users&apos; information would remain
          safe.
        </p>
        <p>
          Despite its proven insecurity, the hash is still widely used. In older
          Unix systems, for example, passwords are stored (hashed) in the{` `}
          publicly available <code>/etc/passwd</code> file using the MD5
          algorithm. The SHA-2 family of algorithms are much more secure, and
          some of them&mdash;
          <Link href="/hashes/sha256">SHA-256</Link>,{` `}
          <Link href="/hashes/sha384">SHA-384</Link>, and{` `}
          <Link href="/hashes/sha512">SHA-512</Link>&mdash;are on this website
          for you to try out.
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

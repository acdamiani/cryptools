import Area from '@/components/Area/area';
import Hash from '@/components/Hash/hash';
import CodeBlock, { CodeBlockHTML } from '@/components/CodeBlock/code-block';
import BrowserHash from '@/src/hashes/browser';
import highlight from '@/src/code';
import Link from '@/components/Link/link';
import Meta, { OpenGraph } from '@/components/Meta/meta';

const title = `SHA-384 Hash Generator - Cryptools`;
const description = `SHA-384 hash generator from a string or bytes, with C#, Python, Javascript, Ruby, and Go code samples.`;
const og: OpenGraph = { url: `https://cryptools.dev/hashes/sha384` };

const CODE_SNIPPETS: CodeBlockHTML = {
  csharp: `using System;
using System.Text;
using System.Security.Cryptography;

string message = "Hello World";
SHA384 hash = SHA384.Create();

string hashed = String.Empty;
byte[] bytes = hash.ComputeHash(Encoding.ASCII.GetBytes(message));

foreach (byte b in bytes) {
  hashed += b.ToString("x2");
}

Console.WriteLine($"Computed hash of {message}: {hashed}");`,
  javascript: `// using Node.js crypto
const crypto = require("crypto");

const message = "Hello World";

const hash = crypto.createHash("sha384")
  .update(message)
  .digest("hex");

console.log(\`Computed hash of \${message}: \${hash}\`);`,
  ruby: `require 'digest'

message = 'Hello World'
hash = Digest::SHA384.hexdigest(message);

puts "Computed hash of #{message}: #{hash}"`,
  python: `from hashlib import sha384
  
message = "Hello World"
hash = sha384(message.encode("utf-8")).hexdigest()

print(f"Computed hash of {message}: {hash}")`,
  go: `package main

import (
	"crypto/sha512"
	"encoding/hex"
	"fmt"
)

func main() {
	message := "Hello World"
	digest := sha512.New384()
	digest.Write([]byte(message))
	hash := hex.EncodeToString(digest.Sum(nil))

	fmt.Println(fmt.Sprintf("Computed hash of %s: %s", message, hash))
}`,
};

export default function SHA384({ code }: { code: CodeBlockHTML }) {
  const sha384 = new BrowserHash(`sha384`);

  return (
    <>
      <Meta title={title} description={description} og={og} />
      <h1>SHA-384 Hash Generator</h1>
      <Area>
        <Hash
          hash={sha384.hash.bind(sha384)}
          hashBytes={sha384.hashBytes.bind(sha384)}
          hashName="sha384"
        />
        <CodeBlock snippets={code} />
      </Area>
      <main>
        <h2>The SHA-384 hash</h2>
        <p>
          SHA-384 is a hashing function part of the SHA-2 family. It produces a
          384 bit hash from an arbitrary inptu of bytes. Whitle not as popular
          as <Link href="/hashes/sha256">SHA-256</Link> or{` `}
          <Link href="/hashes/sha512">SHA-512</Link>, it is still useful in the
          event that a longer, more secure hash is required, while being shorter
          than 512 bits.
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

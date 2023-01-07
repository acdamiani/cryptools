import Area from '@/components/Area/area';
import Hash from '@/components/Hash/hash';
import CodeBlock, { CodeBlockHTML } from '@/components/CodeBlock/code-block';
import BrowserHash from '@/src/hashes/browser';
import highlight from '@/src/code';
import Meta, { OpenGraph } from '@/components/Meta/meta';
import Link from '@/components/Link/link';

const title = `SHA-512 Hash Generator - Cryptools`;
const description = `SHA-512 hash generator from a string or bytes, with C#, Python, Javascript, Ruby, and Go code samples.`;
const og: OpenGraph = { url: `https://cryptools.dev/hashes/sha512` };

const CODE_SNIPPETS: CodeBlockHTML = {
  csharp: `using System;
using System.Text;
using System.Security.Cryptography;

string message = "Hello World";
SHA512 hash = SHA512.Create();

string hashed = String.Empty;
byte[] bytes = hash.ComputeHash(Encoding.ASCII.GetBytes(message));

foreach (byte b in bytes) {
  hashed += b.ToString("x2");
}

Console.WriteLine($"Computed hash of {message}: {hashed}");`,
  javascript: `// using Node.js crypto
const crypto = require("crypto");

const message = "Hello World";

const hash = crypto.createHash("sha512")
  .update(message)
  .digest("hex");

console.log(\`Computed hash of \${message}: \${hash}\`);`,
  ruby: `require 'digest'

message = 'Hello World'
hash = Digest::SHA512.hexdigest(message);

puts "Computed hash of #{message}: #{hash}"`,
  python: `from hashlib import sha512
  
message = "Hello World"
hash = sha512(message.encode("utf-8")).hexdigest()

print(f"Computed hash of {message}: {hash}")`,
  go: `package main

import (
	"crypto/sha512"
	"encoding/hex"
	"fmt"
)

func main() {
	message := "Hello World"
	digest := sha512.New()
	digest.Write([]byte(message))
	hash := hex.EncodeToString(digest.Sum(nil))

	fmt.Println(fmt.Sprintf("Computed hash of %s: %s", message, hash))
}`,
};

export default function SHA512({ code }: { code: CodeBlockHTML }) {
  const sha512 = new BrowserHash(`sha512`);

  return (
    <>
      <Meta title={title} description={description} og={og} />
      <h1>SHA-512 Hash Generator</h1>
      <Area>
        <Hash
          hash={sha512.hash.bind(sha512)}
          hashBytes={sha512.hashBytes.bind(sha512)}
          hashName="sha512"
          outputRows={2}
        />
        <CodeBlock snippets={code} />
      </Area>
      <main>
        <h2>The SHA-512 hash</h2>
        <p>
          SHA-512 is part of the SHA-2 hash algorithm family. It is a hash
          function that takes an arbitrary inputs of bytes and produces a 64
          byte output (512 bit). This algorithm, along with{` `}
          <Link href="/hashes/sha256">SHA-256</Link>, are used extensively
          thoughout the internet, government applications, operating systems,
          and almost every area of modern life.
        </p>
        <p>
          After the weaknesses of the SHA-1 algorithm was exposed, the NSA began
          developing the SHA-2 family of hashing functions.
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

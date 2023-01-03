import Area from '@/components/Area/area';
import CodeBlock, { CodeBlockHTML } from '@/components/CodeBlock/code-block';
import Hash from '@/components/Hash/hash';
import highlight from '@/src/code';
import BrowserHash from '@/src/hashes/browser';
import Meta, { OpenGraph } from '@/components/Meta/meta';
import Link from '@/components/Link/link';

const title = `SHA-1 Hash Generator - Cryptools`;
const description = `SHA-1 hash generator from a string or bytes, with C#, Python, Javascript, Ruby, and Go code samples.`;
const og: OpenGraph = { url: `https://cryptools.dev/hashes/sha1` };

const CODE_SNIPPETS: CodeBlockHTML = {
  csharp: `using System;
using System.Text;
using System.Security.Cryptography;

string message = "Hello World";
SHA1 hash = SHA1.Create();

string hashed = String.Empty;
byte[] bytes = hash.ComputeHash(Encoding.ASCII.GetBytes(message));

foreach (byte b in bytes) {
  hashed += b.ToString("x2");
}

Console.WriteLine($"Computed hash of {message}: {hashed}");`,
  javascript: `// using Node.js crypto
const crypto = require("crypto");

const message = "Hello World";

const hash = crypto.createHash("sha1")
  .update(message)
  .digest("hex");

console.log(\`Computed hash of \${message}: \${hash}\`);`,
  ruby: `require 'digest'

message = 'Hello World'
hash = Digest::SHA1.hexdigest(message);

puts "Computed hash of #{message}: #{hash}"`,
  python: `from hashlib import sha1
  
message = "Hello World"
hash = sha1(message.encode("utf-8")).hexdigest()

print(f"Computed hash of {message}: {hash}")`,
  go: `package main

import (
	"crypto/sha1"
	"encoding/hex"
	"fmt"
)

func main() {
	message := "Hello World"
	digest := sha1.New()
	digest.Write([]byte(message))
	hash := hex.EncodeToString(digest.Sum(nil))

	fmt.Println(fmt.Sprintf("Computed hash of %s: %s", message, hash))
}`,
};

export default function SHA1({ code }: { code: CodeBlockHTML }) {
  const sha1 = new BrowserHash(`sha1`);

  return (
    <>
      <Meta title={title} description={description} og={og} />
      <h1>SHA-1 Hash Generator</h1>
      <Area>
        <Hash
          hash={sha1.hash.bind(sha1)}
          hashBytes={sha1.hashBytes.bind(sha1)}
          hashName="sha1"
        />
        <strong>Code Snippets</strong>
        <CodeBlock snippets={code} />
      </Area>
      <main>
        <h2>The SHA-1 hash</h2>
        <p>
          The SHA-1 hash is a broken but widely used hashing algorithm developed
          by the United States government in 1995. Like most hashing functions,
          it takes an input of arbitrary bytes and performes a number of bitwise
          operations on those bytes to produce a unique digest.
        </p>
        <p>
          It is an insecure algorithm not recommended for modern use, having
          been superseded by the SHA-2 algorithm family.
        </p>
        <h2>SHAttered</h2>
        <p>
          In 2017, Google and the Centrum Wiskunde & Informatica (CWI) announced
          what they called <Link href="https://shattered.io/">SHAttered</Link>,
          where they generated two different PDFs with the same SHA-1 digest.
          Until this point, SHA-1 was already on its way out, but no proven
          collision had yet been generated.
        </p>
        <p>
          According to Google, this attack took &quot;the equivalent processing
          power of 6,500 years of single-CPU computations and 110 years of
          single-GPU computations.&quot;
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

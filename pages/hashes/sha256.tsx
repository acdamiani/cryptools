import Area from '@/components/Area/area';
import Hash from '@/components/Hash/hash';
import BrowserHash from '@/src/hashes/browser';
import Link from '@/components/Link/link';
import CodeBlock, { Snippets } from '@/components/CodeBlock/code-block';

const CODE_SNIPPETS: Snippets = {
  csharp: `using System;
using System.Text;
using System.Security.Cryptography;

string message = "Hello World";
SHA256Managed hash = new SHA256Managed();

string hashed = String.Empty;
byte[] bytes = hash.ComputeHash(Encoding.ASCII.GetBytes(message));

foreach (byte b in bytes)
{
  hashed += b.ToString("x2");
}

Console.WriteLine("Computed hash of {0}: {1}", message, hashed);`,
  javascript: `// using Node.js crypto
const crypto = require('crypto');

const message = 'Hello World';

const hash = crypto.createHash('sha256')
  .update(message)
  .digest('hex');

console.log(\`Computed hash of \${message}: \${hash}\`);`,
  ruby: `require 'digest'

message = 'Hello World'
hash = Digest::SHA256.hexdigest(message);

puts "Computed hash of #{message}: #{hash}"`,
  python: `from hashlib import sha256
  
message = 'Hello World'
hash = sha256(message.encode('utf-8')).hexdigest()

print(f'Computed hash of {message}: {hash}')`,
  java: `import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.nio.charset.StandardCharsets;

String message = "Hello World";

try {
  byte[] bytes = MessageDigest
      .getInstance("SHA-256")
      .digest(message.getBytes(StandardCharsets.UTF_8));

  String hash = "";
      
  for (byte b: bytes)
  {
      hash += String.format("%02x", b);
  }
  
  System.out.println(String.format("Computed hash of %s: %s", message, hash));
}
catch (NoSuchAlgorithmException e) {
  System.out.println("No such algorithm: " + e);
}`,
  go: `package main

import (
	"crypto/sha256"
	"encoding/hex"
	"fmt"
)

func main() {
	message := "Hello World"
	digest := sha256.New()
	digest.Write([]byte(message))
	hash := hex.EncodeToString(digest.Sum(nil))

	fmt.Println(fmt.Sprintf("Computed hash of %s: %s", message, hash))
}`,
};

export default function SHA256() {
  const sha256 = new BrowserHash(`sha256`);

  return (
    <>
      <h1>SHA-256 Hash Generator Online</h1>
      <Area>
        <Hash
          hash={sha256.hash.bind(sha256)}
          hashBytes={sha256.hashBytes.bind(sha256)}
          hashName="sha256"
        />
        <strong>Code Examples</strong>
        <CodeBlock snippets={CODE_SNIPPETS} />
      </Area>
      <h2>SHA-256 Hash Algorithm</h2>
      <p>
        SHA-256 is part of the SHA-2 hash algorithm family. It is a hash
        function that takes an arbitrary inputs of bytes and produces a 32 byte
        output (256 bit). This algorithm, along with{` `}
        <Link href="/hashes/sha512">SHA-512</Link>, are used extensively
        thoughout the internet, government applications, operating systems, and
        almost every area of modern life.
      </p>
      <p>
        After the weaknesses of the SHA-1 algorithm was exposed, the NSA began
        developing the SHA-2 family of hashing functions.
      </p>
    </>
  );
}

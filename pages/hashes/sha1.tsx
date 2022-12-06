import Area from '@/components/Area/area';
import CodeBlock, { Snippets } from '@/components/CodeBlock/code-block';
import Hash from '@/components/Hash/hash';
import BrowserHash from '@/src/hashes/browser';

const CODE_SNIPPETS: Snippets = {
  csharp: `using System;
using System.Text;
using System.Security.Cryptography;

string message = "Hello World";
SHA1Managed hash = new SHA1Managed();

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

const hash = crypto.createHash('sha1')
  .update(message)
  .digest('hex');

console.log(\`Computed hash of \${message}: \${hash}\`);`,
  ruby: `require 'digest'

message = 'Hello World'
hash = Digest::SHA1.hexdigest(message);

puts "Computed hash of #{message}: #{hash}"`,
  python: `from hashlib import sha1
  
message = 'Hello World'
hash = sha1(message.encode('utf-8')).hexdigest()

print(f'Computed hash of {message}: {hash}')`,
  java: `import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.nio.charset.StandardCharsets;

String message = "Hello World";

try {
  byte[] bytes = MessageDigest
      .getInstance("SHA-1")
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

export default function SHA1() {
  const sha1 = new BrowserHash(`sha1`);

  return (
    <>
      <h1>SHA-1 Hash Generator Online</h1>
      <Area>
        <Hash
          hash={sha1.hash.bind(sha1)}
          hashBytes={sha1.hashBytes.bind(sha1)}
          hashName="sha1"
        />
        <strong>Code Snippets</strong>
        <CodeBlock snippets={CODE_SNIPPETS} />
      </Area>
    </>
  );
}

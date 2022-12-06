import Area from '@/components/Area/area';
import Hash from '@/components/Hash/hash';
import CodeBlock, { Snippets } from '@/components/CodeBlock/code-block';
import BrowserHash from '@/src/hashes/browser';

const CODE_SNIPPETS: Snippets = {
  csharp: `using System;
using System.Text;
using System.Security.Cryptography;

string message = "Hello World";
SHA512Managed hash = new SHA512Managed();

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

const hash = crypto.createHash('sha512')
  .update(message)
  .digest('hex');

console.log(\`Computed hash of \${message}: \${hash}\`);`,
  ruby: `require 'digest'

message = 'Hello World'
hash = Digest::SHA512.hexdigest(message);

puts "Computed hash of #{message}: #{hash}"`,
  python: `from hashlib import sha512
  
message = 'Hello World'
hash = sha512(message.encode('utf-8')).hexdigest()

print(f'Computed hash of {message}: {hash}')`,
  java: `import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.nio.charset.StandardCharsets;

String message = "Hello World";

try {
  byte[] bytes = MessageDigest
      .getInstance("SHA-512")
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

export default function SHA512() {
  const sha512 = new BrowserHash(`sha512`);

  return (
    <>
      <h1>SHA-512 Hash Generator Online</h1>
      <Area>
        <Hash
          hash={sha512.hash.bind(sha512)}
          hashBytes={sha512.hashBytes.bind(sha512)}
          hashName="sha512"
          outputRows={2}
        />
        <CodeBlock snippets={CODE_SNIPPETS} />
      </Area>
    </>
  );
}

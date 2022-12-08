import Area from '@/components/Area/area';
import Hash from '@/components/Hash/hash';
import CodeBlock, { CodeBlockHTML } from '@/components/CodeBlock/code-block';
import BrowserHash from '@/src/hashes/browser';
import highlight from '@/src/code';

const CODE_SNIPPETS: CodeBlockHTML = {
  csharp: `using System;
using System.Text;
using System.Security.Cryptography;

string message = "Hello World";
SHA384Managed hash = new SHA384Managed();

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

const hash = crypto.createHash('sha384')
  .update(message)
  .digest('hex');

console.log(\`Computed hash of \${message}: \${hash}\`);`,
  ruby: `require 'digest'

message = 'Hello World'
hash = Digest::SHA384.hexdigest(message);

puts "Computed hash of #{message}: #{hash}"`,
  python: `from hashlib import sha384
  
message = 'Hello World'
hash = sha384(message.encode('utf-8')).hexdigest()

print(f'Computed hash of {message}: {hash}')`,
  java: `import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.nio.charset.StandardCharsets;

String message = "Hello World";

try {
  byte[] bytes = MessageDigest
      .getInstance("SHA-384")
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
      <h1>SHA-384 Hash Generator Online</h1>
      <Area>
        <Hash
          hash={sha384.hash.bind(sha384)}
          hashBytes={sha384.hashBytes.bind(sha384)}
          hashName="sha384"
        />
        <CodeBlock snippets={code} />
      </Area>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: { code: await highlight(CODE_SNIPPETS) },
  };
}

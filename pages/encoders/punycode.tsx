import Area from '@/components/Area/area';
import CodeBlock, { CodeBlockHTML } from '@/components/CodeBlock/code-block';
import Encoder from '@/components/Encoder/encoder';
import LabeledElement from '@/components/LabeledElement/labeled-element';
import Meta, { OpenGraph } from '@/components/Meta/meta';
import highlight from '@/src/code';
import PunycodeEncoder from '@/src/encoders/punycode';

const title = `Punycode Encode and Decode Online - Cryptools`;
const description = `Online punycode encoder and decoder, with C#, Python, Javascript, Ruby, and Go code samples.`;
const og: OpenGraph = { url: `https://cryptools.dev/encoders/punycode` };

const CODE_SNIPPETS: CodeBlockHTML = {
  csharp: `using System;
using System.Globalization;
  
IdnMapping mapping = new IdnMapping();

string domain = "mañana.com";

string ascii = mapping.GetAscii(domain);
string unicode = mapping.GetUnicode(ascii);

Console.WriteLine($"Punycode mapping of {domain}: {ascii}");
Console.WriteLine($"Unicode mapping of {ascii}: {unicode}");`,
  go: `package main

// Using supplementary [idna](https://pkg.go.dev/golang.org/x/net/idna) package
import (
	"fmt"
	"golang.org/x/net/idna"
)

func main() {
	domain := "mañana.com"

	ascii, _ := idna.ToASCII(domain)
	unicode, _ := idna.ToUnicode(ascii)

	fmt.Printf("Puncyode mapping of %s: %s\\n", domain, ascii)
	fmt.Printf("Unicode maping of %s: %s\\n", ascii, unicode)
}`,
  javascript: `// Using the [punycode.js](https://github.com/mathiasbynens/punycode.js) library
const punycode = require("punycode/");

const domain = "mañana.com";

const ascii = punycode.toASCII(domain);
const unicode = punycode.toUnicode(ascii);

console.log(\`Punycode mapping of \${domain}: \${ascii}\`);
console.log(\`Unicode mapping of \${ascii}: \${domain}\`);`,
  ruby: `# Using the [simpleidn](https://github.com/mmriis/simpleidn) gem
require 'simpleidn'

domain = 'mañana.com'

ascii = SimpleIDN.to_ascii(domain)
unicode = SimpleIDN.to_unicode(ascii)

puts "Punycode mapping of #{domain}: #{ascii}"
puts "Unicode mapping of #{ascii}: #{unicode}"`,
  python: `# Using the [idna](https://pypi.org/project/idna) package
import idna

domain = "mañana.com"

ascii = idna.encode(domain).decode("utf-8")
unicode = idna.decode(domain)

print(f"Punycode mapping of {domain}: {ascii}")
print(f"Unicode mapping of {ascii}: {unicode}")`,
};

export default function Punycode({ code }: { code: CodeBlockHTML }) {
  const punycode = new PunycodeEncoder();

  return (
    <>
      <Meta title={title} description={description} og={og} />
      <h1>Punycode Encode and Decode Online</h1>
      <Area>
        <Encoder
          encode={punycode.encode.bind(punycode)}
          decode={punycode.decode.bind(punycode)}
          encoderName="punycode"
        />
        <LabeledElement content={<strong>Code Snippets</strong>}>
          <CodeBlock snippets={code} />
        </LabeledElement>
      </Area>
      <h2>The Punycode encoding</h2>
      <p>
        Punycode is a specialized representation of Unicode with a limited
        character set, specifically designed for domain names. DNS (Domain Name
        Resolution), while it technically can handle all Unicode characters,
        favors a limited character set called letter-digit-hyphen (LDH).
        Punycode seeks to encode arbitray Unicode domain names into this
        character set.
      </p>
      <p>
        Punycode is a specific algorithm based off of the more general
        Bootstring algorithm, which composes strings of smaller sets of basic
        code points from any larger set.
      </p>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: { code: await highlight(CODE_SNIPPETS) },
  };
}

import { useState } from 'react';

import Area from '@/components/Area/area';
import TextArea from '@/components/TextArea/text-area';
import CodeBlock, { Snippets } from '@/components/CodeBlock/code-block';

const CODE_SNIPPETS: Snippets = {
  csharp: `using System.Web;
 
string url = "Hello World"
string encoded = HttpUtility.UrlEncode(url);
 
// Outputs "Hello+World"
Console.WriteLine(encoded);`,
  javascript: `const url = "Hello World";
const encoded = encodeURIComponent(url);
 
// Outputs Hello%20World
console.log(encoded);`,
  php: `<?php
 
$url = "Hello World";
$encoded = urlencode($url);
 
// Outputs "Hello+World"
echo $encoded;`,
  ruby: `require "cgi"
 
url = "Hello World";
encoded = CGI.escape(url);
 
# Outputs "Hello+World"
puts encoded;`,
};

export default function Url() {
  const [text, setText] = useState(``);

  return (
    <>
      <h1>URL Encoder and Decoder</h1>
      <p>
        In need of URL encoding? Use this tool to encode or decode your text
        data. Take advantage of the provided code snippets if you want to
        implement this in your own application.
      </p>
      <Area>
        <TextArea value={text} onChange={(e) => setText(e.target.value)} />
        <strong>Code Snippets</strong>
        <CodeBlock snippets={CODE_SNIPPETS} />
      </Area>
    </>
  );
}

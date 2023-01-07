import Area from '@/components/Area/area';
import Encoder from '@/components/Encoder/encoder';
import UrlEncoder from '@/src/encoders/url';
import CodeBlock, { CodeBlockHTML } from '@/components/CodeBlock/code-block';
import highlight from '@/src/code';
import Table from '@/components/Table/table';
import Meta, { OpenGraph } from '@/components/Meta/meta';

const title = `URL Encode and Decode Online - Cryptools`;
const description = `Online URL encoder and decoder, with C#, Python, Javascript, Ruby, and Go code samples.`;
const og: OpenGraph = { url: `https://cryptools.dev/encoders/url` };

const CODE_SNIPPETS: CodeBlockHTML = {
  csharp: `using System;

string message = "Hello World";

string escaped = Uri.EscapeDataString(message);
string unescaped = Uri.UnescapeDataString(escaped);

Console.WriteLine($"Escaping {message}: {escaped}");
Console.WriteLine($"Unescaping {escaped}: {unescaped}");`,
  ruby: `require 'cgi'

message = 'Hello World'

# CGI.escape uses a '+' character instead of '%20' to encode spaces
escaped = CGI.escape message
unescaped = CGI.unescape escaped

puts "Escaping #{message}: #{escaped}"
puts "Unescaping #{escaped}: #{unescaped}"`,
  javascript: `const message = "Hello World";

const escaped = encodeURIComponent(message);
const unescaped = decodeURIComponent(message);

console.log(\`Escaping \${message}: \${escaped}\`);
console.log(\`Unescaping \${escaped}: \${unescaped}\`);`,
  go: `package main

import (
	"fmt"
	"net/url"
)

func main() {
	message := "Hello World"

	// url.QueryEscape uses a '+' character instead of '%20' to encode spaces
	escaped := url.QueryEscape(message)
	unescaped, _ := url.QueryUnescape(escaped)

	fmt.Printf("Escaping %s: %s\\n", message, escaped)
	fmt.Printf("Unescaping %s: %s\\n", escaped, unescaped)
}`,
  python: `from urllib.parse import quote, unquote

message = "Hello World"

escaped = quote(message)
unescaped = unquote(escaped)

print(f"Escaping {message}: {escaped}")
print(f"Unescaping {escaped}: {unescaped}")`,
};

export default function Url({ code }: { code: CodeBlockHTML }) {
  const url = new UrlEncoder();

  return (
    <>
      <Meta title={title} description={description} og={og} />
      <h1>URL Encoder and Decoder</h1>
      <Area>
        <Encoder
          encode={url.encode.bind(url)}
          decode={url.decode.bind(url)}
          encoderName="url"
        />
        <CodeBlock snippets={code} />
      </Area>
      <main>
        <h2>The URL encoding</h2>
        <p>
          URL encoding, often known as percent-encoding, is a way to insert
          reserved characters into a URI. There are a number of reserved
          characters in the URI scheme. For example, the {` `}
          <code>/</code> character is used to separate different parts of the
          URL. When a user finds it necessary to insert that character into the
          URI, percent-encoding is used.
        </p>
        <Table nohead>
          <caption>
            Reserved characters, defined by RFC 2986 section 2.2 (January 2005)
          </caption>
          <tbody>
            <tr>
              <td>
                <code>!</code>
              </td>
              <td>
                <code>#</code>
              </td>
              <td>
                <code>$</code>
              </td>
              <td>
                <code>&</code>
              </td>
              <td>
                <code>&quot;</code>
              </td>
              <td>
                <code>(</code>
              </td>
              <td>
                <code>)</code>
              </td>
              <td>
                <code>*</code>
              </td>
              <td>
                <code>+</code>
              </td>
              <td>
                <code>,</code>
              </td>
              <td>
                <code>/</code>
              </td>
              <td>
                <code>:</code>
              </td>
              <td>
                <code>;</code>
              </td>
              <td>
                <code>=</code>
              </td>
              <td>
                <code>?</code>
              </td>
              <td>
                <code>@</code>
              </td>
              <td>
                <code>[</code>
              </td>
              <td>
                <code>]</code>
              </td>
            </tr>
          </tbody>
        </Table>
        <p>
          To percent-encode an arbitrary US-ASCII character, simply get its
          hexadecimal bytes and prefix them with a <code>%</code>. For example,
          the forward slash <code>/</code> has a hex code of <code>2f</code>, so
          its percent-encoding is <code>%2f</code>. To encode Unicode
          characters, the same process is applied for each byte, creating
          multiple groups of prefixed hexadecimal characters.
        </p>
        <Table nohead>
          <caption>Reserved characters after percent-encoding</caption>
          <tbody>
            <tr>
              <td>
                <code>␣</code>
              </td>
              <td>
                <code>!</code>
              </td>
              <td>
                <code>#</code>
              </td>
              <td>
                <code>$</code>
              </td>
              <td>
                <code>%</code>
              </td>
              <td>
                <code>&</code>
              </td>
              <td>
                <code>&apos;</code>
              </td>
              <td>
                <code>(</code>
              </td>
              <td>
                <code>)</code>
              </td>
              <td>
                <code>*</code>
              </td>
              <td>
                <code>+</code>
              </td>
              <td>
                <code>,</code>
              </td>
              <td>
                <code>/</code>
              </td>
              <td>
                <code>:</code>
              </td>
              <td>
                <code>;</code>
              </td>
              <td>
                <code>=</code>
              </td>
              <td>
                <code>?</code>
              </td>
              <td>
                <code>@</code>
              </td>
              <td>
                <code>[</code>
              </td>
              <td>
                <code>]</code>
              </td>
            </tr>
            <tr>
              <td>
                <code>%20</code>
              </td>
              <td>
                <code>%21</code>
              </td>
              <td>
                <code>%23</code>
              </td>
              <td>
                <code>%24</code>
              </td>
              <td>
                <code>%25</code>
              </td>
              <td>
                <code>%26</code>
              </td>
              <td>
                <code>%27</code>
              </td>
              <td>
                <code>%28</code>
              </td>
              <td>
                <code>%29</code>
              </td>
              <td>
                <code>%2A</code>
              </td>
              <td>
                <code>%2B</code>
              </td>
              <td>
                <code>%2C</code>
              </td>
              <td>
                <code>%2F</code>
              </td>
              <td>
                <code>%3A</code>
              </td>
              <td>
                <code>%3B</code>
              </td>
              <td>
                <code>%3D</code>
              </td>
              <td>
                <code>%3F</code>
              </td>
              <td>
                <code>%40</code>
              </td>
              <td>
                <code>%5B</code>
              </td>
              <td>
                <code>%5D</code>
              </td>
            </tr>
          </tbody>
        </Table>
        <h3>Spaces in the application/x-www-form-urlencoded media type</h3>
        <p>
          Spaces are encoded differently when encoded as part of the
          application/x-www-form-urlencoded media type. Instead of being encoded
          as <code>%20</code>, they will be encoded as <code>+</code>
          {` `}
          characters. This same syntax can be used in a query string of a
          request URI. Both are valid ways to represent spaces in URIs.
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

import Area from '@/components/Area/area';
import Encoder from '@/components/Encoder/encoder';
import LabeledElement from '@/components/LabeledElement/labeled-element';
import Select from '@/components/Select/select';
import Base64Encoder, {
  Base64Variant,
  VARIANT_LABELS,
} from '@/src/encoders/base64';
import { useId } from 'react';
import CodeBlock, { CodeBlockHTML } from '@/components/CodeBlock/code-block';
import highlight from '@/src/code';
import Link from '@/components/Link/link';
import Table from '@/components/Table/table';
import Meta, { OpenGraph } from '@/components/Meta/meta';

const title = `Base64 Encode and Decode Online - Cryptools`;
const description = `Online Base64 encoder and decoder, with C#, Python, Javascript, Ruby, and Go code samples.`;
const og: OpenGraph = { url: `https://cryptools.dev/encoders/base64` };

const CODE_SNIPPETS: CodeBlockHTML = {};

export default function Base64({ code }: { code: CodeBlockHTML }) {
  const variantId = useId();

  return (
    <>
      <Meta title={title} description={description} og={og} />
      <h1>Base64 Encoder and Decoder</h1>
      <Area>
        <Encoder
          construct={(e) => {
            const target = e.target as typeof e.target & {
              variant: { value: Base64Variant };
            };
            return new Base64Encoder(target.variant.value);
          }}
          encode={(input: string, e: Base64Encoder) => e.encode(input)}
          decode={(input: string, e: Base64Encoder) => e.decode(input)}
          outputRows={3}
          encoderName="base64"
        >
          <LabeledElement htmlFor={variantId} content="Variant">
            <Select name="variant" id={variantId}>
              {Base64Encoder.getVariantsAsArray().map((x) => (
                <option key={x} value={x}>
                  {VARIANT_LABELS[x as Base64Variant]}
                </option>
              ))}
            </Select>
          </LabeledElement>
        </Encoder>
        <LabeledElement content={<strong>Code Snippets</strong>}>
          <CodeBlock snippets={code} />
        </LabeledElement>
      </Area>
      <main>
        <h2>The Base64 encoding</h2>
        <p>
          Like <Link href="/encoders/base32">Base32</Link>, Base64 is anencoding
          designed to represent arbitrary binary data in a consitently
          text-based format. This is useful when tramsitting data in ways that
          may require a text-based representation. A common use case of Base64
          is the encoding of binary assets like images or executables in text
          files.
        </p>
        <p>
          Base64 uses an alphabet with 64 possible values, encoding 6-bit (2
          <sup>6</sup>) values. This means that Base64 will encode 4 values for
          each group of 3 bytes. The most common Base64 alphabet, defined by RFC
          4648 §4, is shown below. Other common variants include{` `}
          <Link href="?variant=base64url">Base64url</Link>, the{` `}
          <Link href="?variant=rfc2045">MIME transfer encoding</Link>, and the
          obsolete{` `}
          <Link href="?variant=rfc1421">Base64 for Privacy-Enhanced Mail</Link>.
        </p>
        <Table>
          <caption>Base64 alphabet defined by RFC 4648 §4</caption>
          <thead>
            <tr>
              <th>Value</th>
              <th>Mark</th>
              <th rowSpan={16} />
              <th>Value</th>
              <th>Mark</th>
              <th rowSpan={16} />
              <th>Value</th>
              <th>Mark</th>
              <th rowSpan={16} />
              <th>Value</th>
              <th>Mark</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0</td>
              <td>A</td>
              <td />
              <td>16</td>
              <td>Q</td>
              <td />
              <td>32</td>
              <td>g</td>
              <td />
              <td>48</td>
              <td>w</td>
            </tr>
            <tr>
              <td>1</td>
              <td>B</td>
              <td />
              <td>17</td>
              <td>R</td>
              <td />
              <td>33</td>
              <td>h</td>
              <td />
              <td>49</td>
              <td>x</td>
            </tr>
            <tr>
              <td>2</td>
              <td>C</td>
              <td />
              <td>18</td>
              <td>S</td>
              <td />
              <td>34</td>
              <td>i</td>
              <td />
              <td>50</td>
              <td>y</td>
            </tr>
            <tr>
              <td>3</td>
              <td>D</td>
              <td />
              <td>19</td>
              <td>T</td>
              <td />
              <td>35</td>
              <td>j</td>
              <td />
              <td>50</td>
              <td>y</td>
            </tr>
            <tr>
              <td>4</td>
              <td>E</td>
              <td />
              <td>20</td>
              <td>U</td>
              <td />
              <td>36</td>
              <td>k</td>
              <td />
              <td>51</td>
              <td>z</td>
            </tr>
            <tr>
              <td>5</td>
              <td>F</td>
              <td />
              <td>21</td>
              <td>V</td>
              <td />
              <td>37</td>
              <td>l</td>
              <td />
              <td>52</td>
              <td>0</td>
            </tr>
            <tr>
              <td>6</td>
              <td>G</td>
              <td />
              <td>22</td>
              <td>W</td>
              <td />
              <td>38</td>
              <td>m</td>
              <td />
              <td>54</td>
              <td>2</td>
            </tr>
            <tr>
              <td>7</td>
              <td>H</td>
              <td />
              <td>23</td>
              <td>X</td>
              <td />
              <td>39</td>
              <td>n</td>
              <td />
              <td>55</td>
              <td>3</td>
            </tr>
            <tr>
              <td>8</td>
              <td>I</td>
              <td />
              <td>24</td>
              <td>Y</td>
              <td />
              <td>40</td>
              <td>o</td>
              <td />
              <td>56</td>
              <td>4</td>
            </tr>
            <tr>
              <td>9</td>
              <td>J</td>
              <td />
              <td>25</td>
              <td>Z</td>
              <td />
              <td>41</td>
              <td>p</td>
              <td />
              <td>57</td>
              <td>5</td>
            </tr>
            <tr>
              <td>10</td>
              <td>K</td>
              <td />
              <td>26</td>
              <td>a</td>
              <td />
              <td>42</td>
              <td>q</td>
              <td />
              <td>58</td>
              <td>6</td>
            </tr>
            <tr>
              <td>11</td>
              <td>L</td>
              <td />
              <td>27</td>
              <td>b</td>
              <td />
              <td>43</td>
              <td>r</td>
              <td />
              <td>59</td>
              <td>7</td>
            </tr>
            <tr>
              <td>12</td>
              <td>M</td>
              <td />
              <td>28</td>
              <td>c</td>
              <td />
              <td>44</td>
              <td>s</td>
              <td />
              <td>60</td>
              <td>8</td>
            </tr>
            <tr>
              <td>13</td>
              <td>N</td>
              <td />
              <td>29</td>
              <td>d</td>
              <td />
              <td>45</td>
              <td>t</td>
              <td />
              <td>61</td>
              <td>9</td>
            </tr>
            <tr>
              <td>14</td>
              <td>O</td>
              <td />
              <td>30</td>
              <td>e</td>
              <td />
              <td>46</td>
              <td>u</td>
              <td />
              <td>62</td>
              <td>+</td>
            </tr>
            <tr>
              <td>15</td>
              <td>P</td>
              <td />
              <td>31</td>
              <td>f</td>
              <td />
              <td>47</td>
              <td>v</td>
              <td />
              <td>63</td>
              <td>/</td>
            </tr>
            <tr>
              <td>padding</td>
              <td>=</td>
              <td colSpan={9} />
            </tr>
          </tbody>
        </Table>
      </main>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: { code: await highlight(CODE_SNIPPETS) },
  };
}

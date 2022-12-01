import Area from '@/components/Area/area';
import Counter from '@/components/Counter/counter';
import LabeledElement from '@/components/LabeledElement/labeled-element';
import Row from '@/components/Row/row';
import TextArea from '@/components/TextArea/text-area';
import Toggle from '@/components/Toggle/toggle';
import ToggleSwitch from '@/components/ToggleSwitch/toggle-switch';
import Tool from '@/components/Tool/tool';
import CaesarCipher from '@/src/ciphers/caesar';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { FormEvent, useEffect, useId, useState } from 'react';
import Link from '@/components/Link/link';

export default function Caesar() {
  const inputId = useId();
  const keyId = useId();
  const alphabetId = useId();

  const [alphabet, setAlpahbet] = useState(`abcdefghijklmnopqrstuvwxyz`);

  const doConvert = (e: FormEvent<HTMLFormElement>) => {
    const target = e.target as typeof e.target & {
      input: { value: string };
      alphabet: { value: string };
      'insert-invalid': { checked: boolean };
      key: { value: number };
      mode: { checked: boolean };
    };

    const c = new CaesarCipher(
      target.key.value,
      target.alphabet.value,
      target[`insert-invalid`].checked,
    );

    return target.mode.checked
      ? c.encode(target.input.value)
      : c.decode(target.input.value);
  };

  return (
    <>
      <h1>Caesar Cipher Encode and Decode Online</h1>
      <Area>
        <Tool generateOutput={doConvert}>
          <Row>
            <LabeledElement content="Key" flexBasis={false} htmlFor={keyId}>
              <Counter
                min={0}
                max={alphabet.length - 1}
                id={keyId}
                suffix={(k) => (alphabet ? `a->${alphabet[k]}` : ``)}
                suffixStyle={{ fontVariantLigatures: `normal` }}
                name="key"
              />
            </LabeledElement>
            <LabeledElement content="Alphabet" htmlFor={alphabetId}>
              <TextArea
                id={alphabetId}
                defaultValue="abcdefghijklmnopqrstuvwxyz"
                onChange={(e) => setAlpahbet(e.target.value)}
                name="alphabet"
                spellCheck={false}
              />
            </LabeledElement>
          </Row>
          <ToggleSwitch
            leftContent="Decode"
            rightContent="Encode"
            initialValue={true}
            name="mode"
          />
          <LabeledElement content={<strong>Input</strong>}>
            <TextArea rows={3} id={inputId} name="input" spellCheck="false" />
          </LabeledElement>
          <Toggle
            name="insert-invalid"
            label="Insert Invalid"
            initialValue={true}
          />
        </Tool>
      </Area>
      <h2>The Caesar cipher</h2>
      <main>
        <p>
          The Caesar Cipher is one of the most famous encryption methods, named
          after Julius Caesar, who used it to obsure his private
          correspondences. It's method for ecncryption and decryption is
          extremely simple. It requires a key, which can be any integer,
          positive or negative, representing the shift of each letter in the
          alphabet. As an example, shown in the below table, the default
          alphabet (A-Z) is shifted by both 3 and 7, resulting in the ciphered
          alphabet.
        </p>
        <table>
          <thead style={{}}>
            <tr>
              <th style={{ textAlign: 'left' }}>Alphabet</th>
              <th>A</th>
              <th>B</th>
              <th>C</th>
              <th>D</th>
              <th>E</th>
              <th>F</th>
              <th>G</th>
              <th>H</th>
              <th>I</th>
              <th>J</th>
              <th>K</th>
              <th>L</th>
              <th>M</th>
              <th>N</th>
              <th>O</th>
              <th>P</th>
              <th>Q</th>
              <th>R</th>
              <th>S</th>
              <th>T</th>
              <th>U</th>
              <th>V</th>
              <th>W</th>
              <th>X</th>
              <th>Y</th>
              <th>Z</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ textAlign: 'left' }}>Shift: +3</td>
              <td>D</td>
              <td>E</td>
              <td>F</td>
              <td>G</td>
              <td>H</td>
              <td>I</td>
              <td>J</td>
              <td>K</td>
              <td>L</td>
              <td>M</td>
              <td>N</td>
              <td>O</td>
              <td>P</td>
              <td>Q</td>
              <td>R</td>
              <td>S</td>
              <td>T</td>
              <td>U</td>
              <td>V</td>
              <td>W</td>
              <td>X</td>
              <td>Y</td>
              <td>Z</td>
              <td>A</td>
              <td>B</td>
              <td>C</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'left' }}>Shift: +7</td>
              <td>H</td>
              <td>I</td>
              <td>J</td>
              <td>K</td>
              <td>L</td>
              <td>M</td>
              <td>N</td>
              <td>O</td>
              <td>P</td>
              <td>Q</td>
              <td>R</td>
              <td>S</td>
              <td>T</td>
              <td>U</td>
              <td>V</td>
              <td>W</td>
              <td>X</td>
              <td>Y</td>
              <td>Z</td>
              <td>A</td>
              <td>B</td>
              <td>C</td>
              <td>D</td>
              <td>E</td>
              <td>F</td>
              <td>G</td>
            </tr>
          </tbody>
        </table>
        <p>
          The Message "Hello World" encoded using the second row would be "Khoor
          Zruog", while encoding it using the third row would result in the
          ciphered message "Olssv Dvysk"
        </p>
        <MathJaxContext>
          <p>
            The mathmatical operation for encoding a character{' '}
            <MathJax inline>{'\\(C\\)'}</MathJax> with a given key{' '}
            <MathJax inline>{'\\(S\\)'}</MathJax> is shown below.{' '}
            <MathJax inline>{'\\(C\\)'}</MathJax> is equal to the character's
            index in the caesar alphabet.
          </p>
          <MathJax>{'\\(E_S(C)=(C+S)\\mod 26\\)'}</MathJax>
          <p>
            Decryption is performed by subtracting the shift value instead of
            adding it.
          </p>
          <MathJax>{'\\(D_S(C)=(C-S)\\mod 26\\)'}</MathJax>
        </MathJaxContext>
        <h3>Applications</h3>
        <p>
          The Caesar cipher offers virtually no cryptographic security, only
          hiding information from cursory glances. However, it is an excellent
          introduction to the cryptography concept of symmetric encryption, as
          it introduces the concept of a key (the "shift"), and the data (the
          message you want to obscure).
        </p>
        <p>
          A more complex version of the Caesar cipher is the{' '}
          <Link href="/ciphers/vigenere">Vigenere cipher</Link>, which is
          essentially a Caesar cipher applied to two dimensions. The{' '}
          <Link href="/ciphers/rot13">ROT-13 cipher</Link> is a Caesar cipher
          with a shift value of 13, and since there are 26 letters in the Latin
          alphabet, its encryption process is also its decryption process.
        </p>
      </main>
    </>
  );
}

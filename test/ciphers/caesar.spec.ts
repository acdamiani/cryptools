import CaesarCipher from '@/src/ciphers/caesar';
import { NamedConstructorParameters } from '../util';
import { describe } from 'mocha';
import CipherTestHelper, { CipherTestVector } from './helper';

type CaesarProps = NamedConstructorParameters<
  typeof CaesarCipher,
  ['key', 'alphabet', 'insertInvalid', 'preserveCase']
>;

const vector: CipherTestVector<CaesarProps> = [
  {
    key: 7,
    content: `The quick brown fox jumps over the lazy dog.`,
    encrypted: `Aol xbpjr iyvdu mve qbtwz vcly aol shgf kvn.`,
  },
  {
    key: 7,
    content: `The quick brown fox jumps over the lazy dog.`,
    encrypted: `aolxbpjriyvdumveqbtwzvclyaolshgfkvn`,
    decrypted: `thequickbrownfoxjumpsoverthelazydog`,
    insertInvalid: false,
    preserveCase: false,
  },
  {
    key: -7,
    content: `The quick brown fox jumps over the lazy dog.`,
    encrypted: `Max jnbvd ukhpg yhq cnfil hoxk max etsr whz.`,
  },
  {
    key: 1000,
    content: `The quick brown fox jumps over the lazy dog.`,
    encrypted: `Ftq cguow ndaiz raj vgybe ahqd ftq xmlk pas.`,
  },
  {
    key: 0,
    content: `The quick brown fox jumps over the lazy dog.`,
    encrypted: `The quick brown fox jumps over the lazy dog.`,
  },
];

describe(`Caesar Cipher`, () =>
  CipherTestHelper.test<CaesarProps>(
    (props) =>
      new CaesarCipher(
        props.key,
        props.alphabet,
        props.insertInvalid,
        props.preserveCase,
      ),
    vector,
    [`key`, `insertInvalid`, `preserveCase`],
  ));

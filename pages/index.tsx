import styles from '@/styles/Home.module.css';
import Area from '@/components/Area/area';
import { SyncIcon, TypographyIcon, WorkflowIcon } from '@primer/octicons-react';
import InlineInput from '@/components/InlineInput/inline-input';
import Link from '@/components/Link/link';
import { useRouter } from 'next/router';
import Meta, { OpenGraph } from '@/components/Meta/meta';

const title = `Conversion, ciphers, and encoders online - Cryptools`;
const description =
  `Reference website for common cryptography operations, including encoders,` +
  ` ciphers, hashes, and converters. Open source!`;
const og: OpenGraph = {
  url: `https://cryptools.dev`,
};

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Meta
        title={title}
        description={description}
        og={og}
        ogInheritTitle={true}
        ogInheritDescription={true}
      />
      <h1>Online Tools for Developers</h1>
      <p>
        Cryptools is a reference website for common cryptography and computer
        science operations. Source code for common programming languages is
        included, in case you need implementation details for many of these
        operations. If you have suggestions for the website, a bug to report, or
        anything else you&apos;d like to tell me about, feel free to create a
        new{` `}
        <Link href="https://github.com/acdamiani/cryptools/issues/new/choose">
          issue
        </Link>
        {` `}
        on Github.
      </p>
      <h2>Popular</h2>
      <div className={styles.popular}>
        <Area>
          <h3 className={styles.popularHeader}>MD5 Hash</h3>
          <span>A MD5 hash generator that hashes either text or bytes.</span>
          <InlineInput
            buttonText="Hash"
            buttonIcon={<WorkflowIcon />}
            onClick={(e, v) =>
              router.push({ pathname: `/hashes/md5`, query: { input: v } })
            }
          />
        </Area>
        <Area>
          <h3 className={styles.popularHeader}>Base64 Encode</h3>
          <span>Encode arbitrary text into its Base64 representation.</span>
          <InlineInput
            buttonText="Encode"
            buttonIcon={<TypographyIcon />}
            onClick={(e, v) =>
              router.push({ pathname: `/encoders/base64`, query: { input: v } })
            }
          />
        </Area>
        <Area>
          <h3 className={styles.popularHeader}>Text to Hex</h3>
          <span>Convert Unicode characters into UTF-8 hex bytes.</span>
          <InlineInput
            buttonText="Encode"
            buttonIcon={<SyncIcon />}
            onClick={(e, v) =>
              router.push({
                pathname: `/converters/ascii-to-hex`,
                query: { input: v },
              })
            }
          />
        </Area>
        <Area>
          <h3 className={styles.popularHeader}>Vigenère Cipher</h3>
          <span>Cipher some text using a Vigenère cipher.</span>
          <InlineInput
            buttonText="Cipher"
            buttonIcon={<SyncIcon />}
            onClick={(e, v) =>
              router.push({
                pathname: `/ciphers/vigenere`,
                query: { input: v },
              })
            }
          />
        </Area>
        <h3></h3>
      </div>
    </>
  );
}

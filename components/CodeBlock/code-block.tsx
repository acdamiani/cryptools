import { useState } from 'react';

import classNames from 'classnames';
import Prism from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-c';

import styles from '@/components/CodeBlock/code-block.module.css';
import copy from 'copy-to-clipboard';

interface InternalProps {
  snippets: Snippets;
}

export type Snippets = Record<string, string>;

export type Props = InternalProps;

export default function CodeBlock({ snippets }: Props) {
  const [lang, setLang] = useState(Object.keys(snippets)[0]);
  const [copied, setCopied] = useState(false);

  const copyClick = () => {
    copy(snippets[lang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={styles.block}>
      <button
        className={classNames(styles.copy, copied ? styles.copied : ``)}
        onClick={copyClick}
      />
      <select
        className={styles.lang}
        value={lang}
        onChange={(e) => setLang(e.target.value)}
      >
        {Object.keys(snippets).map((x) => (
          <option value={x} key={x}>
            {x}
          </option>
        ))}
      </select>
      <pre className={`language-${lang}`}>
        <code
          dangerouslySetInnerHTML={{
            __html: Prism.highlight(
              snippets[lang],
              Prism.languages[lang],
              lang,
            ),
          }}
        ></code>
      </pre>
    </div>
  );
}

import { useRef, useState } from 'react';
import classNames from 'classnames';
import Prism from 'prismjs';
import { PasteIcon, CheckCircleIcon } from '@primer/octicons-react';

import styles from '@/components/CodeBlock/code-block.module.css';
import copy from 'copy-to-clipboard';

interface InternalProps {
  snippets: Snippets;
}

export type CodeBlockLanguage =
  | 'csharp'
  | 'javascript'
  | 'ruby'
  | 'python'
  | 'go'
  | 'java';

export type Snippets = Partial<Record<CodeBlockLanguage, string>>;

export type Props = InternalProps;

export default function CodeBlock({ snippets }: Props) {
  const keys: CodeBlockLanguage[] = Object.keys(snippets).sort((a, b) =>
    a.localeCompare(b),
  ) as CodeBlockLanguage[];

  const [lang, setLang] = useState<CodeBlockLanguage>(
    keys.includes(`javascript`) ? `javascript` : keys[0],
  );
  const [copied, setCopied] = useState(false);
  const code = useRef<HTMLPreElement>(null);

  const copyClick = () => {
    if (copied || !code.current) {
      return;
    }

    copy(code.current.textContent || ``);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={styles.block}>
      <button
        className={classNames(styles.copy, copied ? styles.copied : ``)}
        onClick={copyClick}
      >
        {copied ? (
          <CheckCircleIcon fill="#999999" size={16} className={styles.icon} />
        ) : (
          <PasteIcon fill="#999999" size={16} className={styles.icon} />
        )}
      </button>
      <select
        className={styles.lang}
        value={lang}
        onChange={(e) => setLang(e.target.value as CodeBlockLanguage)}
      >
        {keys.map((x) => (
          <option value={x} key={x}>
            {x}
          </option>
        ))}
      </select>
      <pre className={classNames(`language-${lang}`, styles.pre)} ref={code}>
        <code
          className={styles.code}
          dangerouslySetInnerHTML={{
            __html: Prism.highlight(
              snippets[lang] || ``,
              Prism.languages[lang],
              lang,
            ),
          }}
        ></code>
      </pre>
    </div>
  );
}

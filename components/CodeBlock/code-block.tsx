import { useRef, useState } from 'react';
import classNames from 'classnames';
import { PasteIcon, CheckCircleIcon } from '@primer/octicons-react';

import styles from '@/components/CodeBlock/code-block.module.css';
import copy from 'copy-to-clipboard';
import { CodeLanguage } from '@/src/code';

interface InternalProps {
  snippets: CodeBlockHTML;
}

export type CodeBlockHTML = Partial<Record<CodeLanguage, string>>;

export type Props = InternalProps;

export default function CodeBlock({ snippets }: Props) {
  const keys: CodeLanguage[] = snippets
    ? (Object.keys(snippets).sort((a, b) =>
        a.localeCompare(b),
      ) as CodeLanguage[])
    : [];

  const [lang, setLang] = useState<CodeLanguage>(
    keys.includes(`javascript`) ? `javascript` : keys[0],
  );
  const [copied, setCopied] = useState(false);
  const code = useRef<HTMLDivElement>(null);

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
        onChange={(e) => setLang(e.target.value as CodeLanguage)}
      >
        {keys.map((x) => (
          <option value={x} key={x}>
            {x}
          </option>
        ))}
      </select>
      <div
        className={styles.codeBlock}
        dangerouslySetInnerHTML={{ __html: snippets?.[lang] || `` }}
        ref={code}
      />
    </div>
  );
}

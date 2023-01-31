export type CodeLanguage =
  | 'csharp'
  | 'javascript'
  | 'ruby'
  | 'python'
  | 'go'
  | 'java';

export type HighlighterCode = Partial<Record<CodeLanguage, string>>;

export default async function highlight(
  code: HighlighterCode,
): Promise<HighlighterCode> {
  const shiki = await import(`shiki`);
  const cheerio = await import(`cheerio`);

  const linkRe = /(?<=(\/\/|#).*)\[([^\]]+)\]\(([^)]+)\)/g;

  const highlighter = await shiki.getHighlighter({
    theme: `material-theme-palenight`,
  });

  const ret: HighlighterCode = {};
  const keys = Object.keys(code);

  if (keys.length === 0) {
    ret.javascript = highlighter.codeToHtml(`// No valid code`, {
      lang: `javascript`,
    });
  }

  for (const key of keys as CodeLanguage[]) {
    const html = highlighter.codeToHtml(code[key] || ``, { lang: key });
    const $ = cheerio.load(html);

    $(`.line`).each(function (this: any) {
      for (const match of $(this).text().matchAll(linkRe)) {
        $(this).html(
          $(this)
            .html()!
            .replace(match[0], `<a href=${match[3]}>${match[2]}</a>`),
        );
      }
    });

    ret[key] = $.html();
  }

  return ret;
}

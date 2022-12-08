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

  const linkRe = /(?<=\/\/.*)\[([^\]]+)\]\(([^)]+)\)/g;

  const highlighter = await shiki.getHighlighter({
    theme: `material-palenight`,
  });

  const ret: HighlighterCode = {};

  for (const key of Object.keys(code) as CodeLanguage[]) {
    const html = highlighter.codeToHtml(code[key] || ``, { lang: key });
    const $ = cheerio.load(html);

    $(`.line`).each(function (this: any) {
      for (const match of $(this).text().matchAll(linkRe)) {
        $(this).html(
          $(this)
            .html()!
            .replace(match[0], `<a href=${match[2]}>${match[1]}</a>`),
        );
      }
    });

    ret[key] = $.html();
  }

  return ret;
}

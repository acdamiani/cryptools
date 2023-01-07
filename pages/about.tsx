import Link from '@/components/Link/link';
import Meta, { OpenGraph } from '@/components/Meta/meta';

const title = `About - Cryptools`;
const description = `About the Cryptools website.`;
const og: OpenGraph = { url: `https://cryptools.dev/about` };

export default function Legal() {
  return (
    <>
      <Meta title={title} description={description} og={og} />
      <h1>About This Website</h1>
      <p>
        Cryptools is an open source cryptography reference website, intended to
        provide means to execute common computer science operations. Sample code
        for most of these operations are included throughout the webiste,
        intended to be short snippets that can be further built upon to provide
        full functionality.
      </p>
      <h2>Open Source</h2>
      <p>
        The entirety of this website, including page content, source code for
        the operations, and styling is hosted on{` `}
        <Link href="https://github.com/acdamiani/cryptools">GitHub</Link>. The
        source code is licensed under the{` `}
        <Link href="https://github.com/acdamiani/cryptools/blob/main/LICENSE.md">
          MIT
        </Link>
        {` `}
        license, which allows the following:
      </p>
      <ul>
        <li>Commerciial use</li>
        <li>Modification</li>
        <li>Distribution</li>
        <li>Private use</li>
      </ul>
      <p>
        If you&apos;d like to modify any of these pages, or otherwise improve
        any aspect of the website, submit a pull request to the GitHub
        repository.
      </p>
      <h2>Software</h2>
      <p>
        Cryptools is built using <Link href="https://reactjs.org/">React</Link>,
        a Javascript library for building user interfaces. Cryptools uses the
        {` `}
        <Link href="https://nextjs.org/">Next.js</Link> React framework to
        provide static file serving, font optimization, routing and layouts,
        among other things. Cryptools is hosted on Vercel.
      </p>
      <p>
        All operations on this website&mdash;hashes, converters, ciphers, and
        encoders&mdash; use no external dependencies and are either implemented
        in Typescript or utilize built in browser APIs. This is done to minimize
        bundle size and serve these pages as quickly as possible.
      </p>
    </>
  );
}

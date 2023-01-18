import Link from '@/components/Link/link';
import Meta, { OpenGraph } from '@/components/Meta/meta';

const title = `Legal Notice - Cryptools`;
const description = `Cryptools legal notice and copyright information`;
const og: OpenGraph = { url: `https://cryptools.dev/legal` };

function Legal() {
  return (
    <>
      <Meta title={title} description={description} og={og} />
      <h1>Cryptools Legal Notice</h1>
      <h2>Disclaimer</h2>
      <h3>Content</h3>
      <p>
        The author reserves the right to not be responsible for the topicality,
        correctness, completeness or quality of the information provided.
        Liability claims regarding damage caused by the use of any information
        provided, including any kind of information which is incomplete or
        incorrect, will therefore be rejected.
      </p>
      <p>
        All offers are non-binding and without obligation. Parts of the pages or
        the complete publication including all offers and information might be
        extended, changed or partly or completely deleted by the author without
        separate announcement.
      </p>
      <h3>Referrals and links</h3>
      <p>
        The author is not responsible for any contents linked or referred to
        from his pages.
      </p>
      <h3>Legal validity of this disclaimer</h3>
      <p>
        This disclaimer is to be regarded as part of the internet publication
        from which you were referred. If sections or individual terms of this
        statement are not legal or correct, the content or validity of the other
        parts remain uninfluenced by this fact.
      </p>
      <h2>Acknowledgements</h2>
      <h3>Fonts</h3>
      <p>
        Unless otherwise specified, fonts on this page use the{` `}
        <Link href="https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL">
          SIL Open Font License (OFL) - 1.1
        </Link>
      </p>
      <ul>
        <li>
          Inter (
          <Link href="https://fonts.google.com/specimen/Inter/about">
            view on Google Fonts
          </Link>
          )
        </li>
      </ul>
      <h2>Copyright</h2>
      <p>© August Damiani 2023</p>
      <p>
        Unless otherwise indicated, the content on cryptools.dev, excluding
        software, is licensed under the{` `}
        <Link href="http://creativecommons.org/licenses/by/4.0/">
          Creative Commons Attribution 4.0 International (CC BY 4.0)
        </Link>
        {` `}
        licence. This means that reuse is allowed, provided appropriate credit
        (name of the creator, license notice, and link to the material) is given
        and changes are indicated. You can view the{` `}
        <Link href="https://github.com/acdamiani/cryptools/blob/main/LICENSE.md">
          software license
        </Link>
        {` `}
        on GitHub.
      </p>
    </>
  );
}

Legal.displayName = `Legal`;
Legal.useAds = false;

export default Legal;

<p align="center">
  <img src="https://user-images.githubusercontent.com/65556364/208544992-7a8cbc62-e836-4f89-825a-962f300bc91a.png" alt="">
</p>

<div align="center"><strong>Cryptography reference website built using Next.js</strong></div>
<div align="center">
  Developed by August Damiani
</div>

<br />

<div align="center">
  <img src="https://img.shields.io/static/v1?label=PRs&message=welcome&style=flat-square&color=FB2576&labelColor=000000" alt="PRs welcome!" />
  <img alt="License" src="https://img.shields.io/github/license/acdamiani/cryptools?style=flat-square&color=FB2576&labelColor=000000">
  <img alt="Language" src="https://img.shields.io/github/languages/top/acdamiani/cryptools?style=flat-square&color=FB2576&labelColor=000000">
</div>

<br />

## Getting Started

Clone the repository by running the following command:

```bash
git clone git@github.com:acdamiani/cryptools.git
```

Then, install its dependencies using [pnpm](https://pnpm.io/).

```bash
pnpm install
```

And run!

```bash
# Dev server
pnpm dev

# Build server
pnpm build && pnpm start
```

Open `http://localhost:3000` with your browser to see the result.

### Requirements

- Node.js >= 12.22.0
- pnpm 7

### Directory Structure

- [`.github`](.github) — GitHub configuration including the CI workflow.<br>
- [`.husky`](.husky) — Husky configuration and hooks.<br>
- [`components`](./components) — React component library, including buttons, toggles, etc.<br>
- [`hooks`](./hooks) — Custom react hooks.<br>
- [`layouts`](./layouts) — Next.js page layouts and styles.<br>
- [`pages`](./pages) — Next.js tsx page components.<br>
- [`public`](./public) — Static assets including images and SVGs.<br>
- [`src`](./src) — App logic and operations, including converters, hashes, encoders, etc.<br>
- [`styles`](./styles) — Styles for specific pages.<br>
- [`test`](./test) — [Mocha](https://mochajs.org/) test directory. (WIP)</br>

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for more information.

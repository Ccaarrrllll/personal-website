# CLAUDE.md

Running notes for working on this repo. Claude maintains this file: update it whenever something here changes or a non-obvious lesson is learned, without waiting to be asked.

## Project
Personal Jekyll site (Ccaarrrllll), deployed via GitHub Pages at https://ccaarrrllll.com. Forked from the Indigo theme.

## Local dev
- Serve: `bundle exec jekyll serve --livereload` (http://127.0.0.1:4000)
- One-off build to a scratch dir: `bundle exec jekyll build -d <dir>` (keeps a running server's `_site` untouched)
- Platform is Windows; Ruby gems include `wdm`, `webrick`, `csv`, `bigdecimal`.
- To check a styling refactor didn't change output, build to a scratch dir before and after and diff the `<style>` contents.

## Styling (Sass)
- Dart Sass via `jekyll-sass-converter` 3.x. Uses `@use`, not `@import` (migrated 2026-11-17, no deprecation warnings).
- Entry points: `_includes/style.scss` (light) and `_includes/style-dark.scss` (dark); partials in `_sass/`.
- Any partial that uses variables needs `@use "../base/variables" as *` at the top.
- `_sass/base/variables.sass` values are `!default`. `variables-dark.sass` does `@forward "variables" with (...)` (only the values that differ) and must be the first `@use` in `style-dark.scss`, so partials see the dark values.
- New color/size variable: add to `variables.sass`, override in `variables-dark.sass` if it differs.
- Inline `code` uses `$epsilon` bg / `$beta` text so it follows the theme; `pre > code` keeps `color: inherit`.
- Unused-but-kept: `.spoiler` component (`_sass/components/spoiler.sass`), deliberately left for future posts. Rouge syntax token classes (`.c1`, `.nb`, ...) look unused but are generated at build time.

## Dark mode and toggle
- `dark-theme: auto` in `_config.yml`. `_layouts/default.html` compiles light and dark in separate `scssify` calls (`@use` can't be nested in a media query, and one module can't have two configurations).
- The dark sheet is its own `<style id="sheet-dark" media="(prefers-color-scheme: dark)">`. An inline script sets that tag's `media` to `all` / `not all` to force dark / light, and stores the choice in `localStorage` under `theme`. With no stored choice the site follows the system setting.
- The toggle button (`.theme-toggle`) is in `_includes/nav.html`: last item in the nav list on normal pages, and its own top-right `.nav` on the home page (whose links are centered). It only renders when `dark-theme == "auto"`.
- Tried a fixed bottom-right circle button and went back to top-right.

## Code block copy button
- `assets/js/copy-code.js` adds a button to every `div.highlighter-rouge` (Rouge's wrapper: `div.highlighter-rouge > div.highlight > pre > code`) and copies the `pre` text. Loaded at the end of `_layouts/default.html` via `relative_url` so it works on the local dev server too.
- Styles are in `_sass/components/copy-code.sass` (registered in both `style.scss` and `style-dark.scss`). Hidden until hover where hover exists; always visible on touch.
- Inline SVG icons, no visible text, only `aria-label`s ("Copy code" / "Copied"), so no site copy needed.

## Security and CI
- `Gemfile.lock` is tracked (it used to be gitignored, so CI resolved fresh gems on every build). Platforms: `x64-mingw-ucrt` and `x86_64-linux`; keep both when regenerating (`bundle lock --add-platform x86_64-linux`).
- Update gems with `bundle update --patch` for stability; check advisories with `bundle-audit check --update` (`gem install bundler-audit`). Last audit (2026-11-17): clean after nokogiri 1.19.4 -> 1.19.7.
- Workflows (`.github/workflows/`): `deploy.yml` builds and deploys on push to `main`; `ci.yml` builds with `--strict_front_matter` and runs bundler-audit on PRs and weekly. Actions are pinned to full commit SHAs with the version in a trailing comment, `persist-credentials: false` on checkout, and permissions are least-privilege per job (only `deploy` gets `pages: write` / `id-token: write`).
- `.github/dependabot.yml` covers bundler and github-actions weekly with a 7-day cooldown. Its PRs are validated by `ci.yml` (build + audit); merge with squash, use `@dependabot rebase` if a PR goes stale after another merge. Caveat: `ci.yml` does not exercise `upload-pages-artifact` or `deploy-pages`, so bumps to those are only tested by the real deploy after merge. Bump them together and watch the Actions tab.
- Current state (2026-11-17, all Dependabot PRs merged): checkout v7.0.1, setup-ruby v1.339.0, upload-pages-artifact v5.0.0, deploy-pages v5.0.1, Jekyll 4.4.1, jekyll-seo-tag 2.9.1, nokogiri 1.19.7. Audit clean.
- The repo's **Pull requests** feature must be enabled (Settings > General > Features). It was off at first, so Dependabot pushed branches but could not open PRs. Creation is set to "Collaborators only".
- `_config.yml` `exclude` must list internal files (`CLAUDE.md`, `README.md`, `Gemfile*`), because Jekyll publishes any non-dotfile in the repo root. CLAUDE.md was briefly published by accident; it was caught before pushing.
- External requests: only Google Tag Manager and the Font Awesome kit script. The kit loader can't use SRI.

## Backlog (ideas not yet done)
- Image `loading="lazy"` (no quality loss; only changes when the browser downloads). Avoid resizing/recompressing unless quality is confirmed acceptable.
- Sitemap (`jekyll-sitemap`), per-post social preview images (`image:` front matter, `jekyll-seo-tag` is installed), TOC on long posts, three-way theme control (auto/light/dark), `theme-color` meta, accessibility pass (alt text, focus styles, `$alpha` contrast on dark), syntax colors in dark mode (`syntax.sass` has hardcoded colors).

## Conventions
- Site copy (about, bio, posts) is the owner's own words. Don't draft or rewrite it unprompted.
- Commit only when asked; leave unrelated working-tree changes (e.g. `about.md`) out of commits.

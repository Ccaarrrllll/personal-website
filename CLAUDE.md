# CLAUDE.md

Running notes for working on this repo. Add to it as things are learned.

## Project
Personal Jekyll site (Ccaarrrllll), deployed via GitHub Pages at https://ccaarrrllll.com.

## Local dev
- Serve: `bundle exec jekyll serve --livereload` (http://127.0.0.1:4000)
- One-off build to a scratch dir: `bundle exec jekyll build -d <dir>` (keeps the running server's `_site` untouched)
- Platform is Windows; Ruby gems include `wdm`, `webrick`, `csv`, `bigdecimal`.

## Styling (Sass)
- Compiled with Dart Sass via `jekyll-sass-converter` 3.x. Uses `@use`, not `@import` (migrated 2026-11-17).
- Entry points are `_includes/style.scss` (light) and `_includes/style-dark.scss` (dark); partials live in `_sass/`.
- Any partial that uses variables needs `@use "../base/variables" as *` at the top.
- `_sass/base/variables.sass` values are `!default`. `variables-dark.sass` does `@forward "variables" with (...)` and must be the first `@use` in `style-dark.scss`, so partials see the dark values.
- `dark-theme: auto` in `_config.yml`: `_layouts/default.html` compiles light and dark in separate `scssify` calls and wraps the dark output in `@media (prefers-color-scheme: dark)`. Don't merge them back into one compile; `@use` can't be nested and one module can't have two configurations.
- If a new color/size variable is added, add it to `variables.sass` and override it in `variables-dark.sass` if it differs.

## Conventions
- Site copy (about, bio, posts) is the owner's own words. Don't draft or rewrite it unprompted.

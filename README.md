# Francesca Ervin — portfolio

A single-page professional portfolio, built as plain HTML and CSS so it can be
hosted on GitHub Pages with no build step and no dependencies.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The whole page. All copy lives here. |
| `styles.css` | All styling, including the colour and type tokens at the top. |
| `script.js` | Scroll reveals, the colour-changing top bar, the footer year. |
| `FNErvin_Resume.pdf` | Served by the "Download resume" button. Redacted copy: the home address and phone number were removed from the file, not just hidden. |
| `.nojekyll` | Tells GitHub Pages to serve the files as-is. |

## Publishing it

1. Push this branch to GitHub (`femalephenom/femalephenom.github.io`).
2. In the repository, open **Settings → Pages**.
3. Under **Source**, choose **Deploy from a branch**, pick `main` and `/ (root)`, and save.
4. Give it a minute. The site appears at `https://femalephenom.github.io`.

Because the repository is named after the account, it serves from the root
address rather than a `/subpath`.

## Editing it

**Text.** Open `index.html` and edit between the tags. Each job is one `<li class="entry">`
block: copy an existing one to add a role, delete one to remove a role.

**Links.** The email address appears in the hero and the contact section, so change
it in both places. The LinkedIn button is the `btn-quiet` link in the contact section.

**Colours and type** are the custom properties at the top of `styles.css`, under `:root`.
Changing `--rust` recolours the hero, the contact band, and every accent at once.
The values are in OKLCH; the contrast pairings were checked against WCAG AA, so
if you swap them, keep light text on dark grounds and re-check readability.

**A photo.** The page is typographic on purpose and carries no portrait. If you want
one, the natural spot is beside the statement paragraph in the `.statement` section.

## Notes

- Fonts are Archivo and Karla, loaded from Google Fonts.
- Content stays readable with JavaScript disabled; the script only adds motion.
- Animations are skipped for visitors who set "reduce motion" in their OS.
- The page prints and exports to PDF cleanly.

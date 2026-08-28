# Korean Language Selector Design

## Goal

Add a complete Korean version of the AIYA website and replace the current two-language toggle with a compact three-language selector that preserves the existing header layout.

## Confirmed Scope

- Support English, Simplified Chinese, and Korean across the homepage, navigation, mega menus, Products, Services, Solutions, News, sign-in, and all detail pages.
- Keep English as the default language.
- Keep the selector in the current language-button position on desktop.
- Place the selector inside the expanded navigation on mobile.
- Preserve the selected language while users move between pages.
- Preserve the current page and its other query parameters when changing languages.
- Do not redesign the surrounding header, navigation, pages, or content hierarchy.

## Interaction Design

The existing `EN`/`中文` cycling button becomes one compact selector. Its closed state displays the active language and a downward chevron:

- `English ▾`
- `中文 ▾`
- `한국어 ▾`

Clicking or tapping opens a small menu with all three choices. The current choice is visibly marked and unavailable as a redundant action. Selecting another language reloads the same page in that language. Clicking outside, pressing Escape, or selecting a language closes the menu.

The menu uses the current cream, orange, and dark neutral visual language. It remains keyboard accessible through a real button, menu options, `aria-expanded`, focus styles, and Escape handling.

## Approaches Considered

1. **Compact dropdown — selected.** Clear with three languages, scalable, and uses nearly the same header width as the current control.
2. **Three-part segmented control.** Faster single-click switching but too wide and visually busy beside Sign in and Talk to our team.
3. **Repeated cycling button.** Smallest implementation, but users cannot see all available languages or predict the next language.

## Language Architecture

The existing English text remains the source text. `i18n.js` continues to own language detection, translation application, catalog localization, and selector injection.

- `?lang=zh` selects Simplified Chinese.
- `?lang=ko` selects Korean.
- No `lang` parameter selects English.
- The existing `aiya-language-v2` local-storage value accepts `en`, `zh`, or `ko`.
- Unknown language values fall back to English.
- Missing Korean translations fall back to the English source text rather than rendering empty content.

The Korean dictionary will cover visible page copy, navigation, controls, accessibility labels, document titles, metadata, catalog content, product/service capabilities, use cases, solution detail content, and generated detail-page content. Brand names and established technical abbreviations such as AIYA, API, CRM, B2B, SEO, AI, UX, and UI remain unchanged where appropriate.

For Korean pages, the document language becomes `ko`. The font stack uses installed system Korean fonts (`Apple SD Gothic Neo`, `Malgun Gothic`, `Noto Sans KR`) before the existing sans-serif fallback. Only targeted line-height and word-breaking adjustments will be added where Korean text needs them.

## Data Flow

1. On page load, read a valid `lang` query value; otherwise read the stored language; otherwise use English.
2. Localize the shared catalog before product, service, solution, and mega-menu rendering consumes it.
3. Translate the current document text and translatable attributes.
4. Apply locale-specific generated content for catalog and detail pages.
5. Inject desktop and mobile language selectors showing the active language.
6. On selection, save the language, update only the `lang` query parameter, and reload the same URL.

## Error Handling

- Invalid or unsupported language values resolve to English.
- Missing translation keys preserve the English source text.
- The menu remains usable if local storage is unavailable.
- Existing links, hash navigation, and non-language query parameters remain intact.

## Verification

1. English, Chinese, and Korean can be selected from the desktop and mobile menus.
2. The selector displays the active language and closes on selection, outside click, or Escape.
3. `lang=ko` sets `<html lang="ko">` and renders Korean across every page family.
4. Language selection persists across homepage and second-level navigation.
5. English and Chinese behavior remain unchanged.
6. Unsupported language values fall back to English without errors.
7. No mojibake, blank labels, clipped navigation, or new horizontal overflow appears at desktop or mobile widths.
8. Existing page interactions and navigation continue to work.

## Deployment

After local verification, merge the change into local `main`, push it to GitHub, and verify the new commit on GitHub Pages. This does not modify the separate AWS/CloudFront deployment behind `www.aiya.us`.

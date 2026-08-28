# Korean Language Selector Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add complete Korean localization and replace the English/Chinese cycling button with an accessible English/Chinese/Korean dropdown.

**Architecture:** Extend the existing English-source translation pipeline in `i18n.js` so language parsing, dictionary lookup, catalog normalization, document metadata, and selector rendering support `en`, `zh`, and `ko`. Keep translation data with the existing i18n implementation to avoid changing script order across every page, and add only scoped selector and Korean typography rules to `styles.css`.

**Tech Stack:** Static HTML/CSS, browser JavaScript, PowerShell, headless Chrome, GitHub Pages

## Global Constraints

- English remains the default language; `?lang=zh` selects Chinese and `?lang=ko` selects Korean.
- The existing `aiya-language-v2` local-storage key stores `en`, `zh`, or `ko`.
- Missing translations and invalid language values fall back to English.
- Preserve every non-language query parameter, hash, link, page layout, and existing English/Chinese behavior.
- Desktop control stays in `.header-actions`; mobile control stays inside `.main-nav`.
- Do not add external libraries or fonts.
- Do not modify the separate AWS/CloudFront deployment behind `www.aiya.us`.
- Do not commit the untracked `debug.log` file.

---

### Task 1: Add a failing browser regression test

**Files:**
- Create: `tests/validate-korean-language-selector.ps1`

**Interfaces:**
- Consumes: local HTML pages, `i18n.js`, `styles.css`, and installed Chrome
- Produces: a reusable browser-level pass/fail check for Korean localization, selector behavior, persistence, fallback, and responsive overflow

- [ ] **Step 1: Create the test harness**

Create a PowerShell test following the existing headless-Chrome fixture pattern. It must load `index.html`, `products/aiya-commerce.html`, `services/software-engineering.html`, `solutions/retail.html`, `news.html`, and `signin.html` with `?lang=ko`; inject assertions before `</body>`; and verify these exact conditions:

```javascript
assert(document.documentElement.lang === 'ko', 'document language is not Korean');
assert(document.querySelector('.language-selector'), 'language selector is missing');
assert(document.querySelector('.language-switch').textContent.includes('한국어'), 'active language label is wrong');
assert([...document.querySelectorAll('.language-menu [data-language]')].map(item => item.dataset.language).join(',') === 'en,zh,ko', 'language options are incomplete');
assert(document.querySelector('.language-menu [data-language="ko"]').getAttribute('aria-current') === 'true', 'Korean option is not marked active');
assert(document.body.textContent.includes('제품'), 'representative Korean page copy is missing');
assert(document.documentElement.scrollWidth === document.documentElement.clientWidth, 'horizontal overflow detected');
```

For the homepage fixture, also click the trigger, assert `aria-expanded="true"`, dispatch Escape, assert it closes, set a second query parameter and hash, select Chinese, and assert the resulting URL preserves that parameter and hash while changing only `lang`. Load `?lang=fr` in a separate fixture and assert English fallback.

- [ ] **Step 2: Run the test and confirm RED**

Run: `powershell -NoProfile -ExecutionPolicy Bypass -File tests/validate-korean-language-selector.ps1`

Expected: FAIL because `lang=ko` currently resolves to English and `.language-selector` does not exist.

- [ ] **Step 3: Commit the failing test**

```powershell
git -c core.longpaths=true add tests/validate-korean-language-selector.ps1
git -c core.longpaths=true commit -m "test: define Korean localization behavior"
```

---

### Task 2: Generalize locale selection and build the dropdown

**Files:**
- Modify: `i18n.js:1-8,382-408`
- Modify: `styles.css:164,190`
- Test: `tests/validate-korean-language-selector.ps1`

**Interfaces:**
- Consumes: URL `lang`, local storage, `.header-actions`, `.main-nav`, and `.site-header`
- Produces: `window.aiyaI18n.language`, `window.aiyaI18n.switchLanguage(next)`, desktop/mobile `.language-selector` controls, and accessible open/close behavior

- [ ] **Step 1: Support three valid language codes**

Replace binary language parsing with this behavior:

```javascript
const supportedLanguages = new Set(['en', 'zh', 'ko']);
const requested = params.get('lang');
let stored = '';
try { stored = window.localStorage.getItem('aiya-language-v2'); } catch (_) {}
const language = supportedLanguages.has(requested)
  ? requested
  : (supportedLanguages.has(stored) ? stored : 'en');
```

- [ ] **Step 2: Preserve page state when switching**

Implement `switchLanguage(next)` so unsupported values become English, `en` removes only `lang`, `zh`/`ko` set only `lang`, local storage is updated, and the URL hash and every other query parameter remain untouched.

- [ ] **Step 3: Replace cycling buttons with selectors**

Build `makeSelector(extraClass)` that returns:

```html
<div class="language-selector language-selector-desktop">
  <button class="language-switch" type="button" aria-haspopup="listbox" aria-expanded="false">한국어 <span aria-hidden="true">⌄</span></button>
  <div class="language-menu" role="listbox" hidden>
    <button type="button" role="option" data-language="en">English</button>
    <button type="button" role="option" data-language="zh">中文</button>
    <button type="button" role="option" data-language="ko" aria-current="true">한국어</button>
  </div>
</div>
```

Use active-language labels `{ en: 'English', zh: '中文', ko: '한국어' }`. Toggle the menu on trigger click, close on outside pointer interaction and Escape, restore focus to the trigger after Escape, and call `switchLanguage(option.dataset.language)` on option selection. Inject desktop, mobile, and standalone variants at the same host locations used by the old buttons.

- [ ] **Step 4: Style the selector without changing the header layout**

Keep the existing button colors and dimensions, add a positioned cream dropdown with three full-width options, orange hover/focus/current states, and a rotated chevron while open. At `max-width:760px`, hide the desktop selector and display the mobile selector as a full-width navigation item; ensure its menu is positioned in normal flow so it cannot be clipped.

- [ ] **Step 5: Run the focused test**

Run: `powershell -NoProfile -ExecutionPolicy Bypass -File tests/validate-korean-language-selector.ps1`

Expected: selector interaction assertions pass; Korean-content assertions may still fail until Task 3.

- [ ] **Step 6: Commit the selector foundation**

```powershell
git -c core.longpaths=true add i18n.js styles.css
git -c core.longpaths=true commit -m "feat: add three-language selector"
```

---

### Task 3: Add Korean document and catalog localization

**Files:**
- Modify: `i18n.js:8-381`
- Test: `tests/validate-korean-language-selector.ps1`

**Interfaces:**
- Consumes: the English source strings already used by the DOM and `window.aiyaCatalog`
- Produces: a `ko` translation dictionary, locale-aware `translate(value)`, Korean document metadata, and Korean catalog/detail-page content

- [ ] **Step 1: Add the Korean dictionary and generic lookup**

Add a `ko` dictionary alongside `zh`, covering every English key already supported by Chinese plus all current catalog titles, summaries, labels, accessibility text, and document copy. Use professional business Korean. Required representative mappings include:

```javascript
'Home': '홈',
'Products': '제품',
'Services': '서비스',
'Solutions': '솔루션',
'News': '뉴스',
'Company': '회사 소개',
'Contact': '문의',
'Sign in': '로그인',
'Talk to our team': '팀에 문의하기',
'AI-Powered Software': 'AI 기반 소프트웨어',
'Built for Real Business': '실제 비즈니스를 위한 설계',
'Connected Payments': '연결형 결제',
'Powerful Integrations': '강력한 시스템 연동',
'Scalable Platforms': '확장 가능한 플랫폼',
'Ready for Growth': '성장을 위한 준비',
'Under Construction': '준비 중',
'Switch language': '언어 변경'
```

Change `translate(value)` and `translateCatalog(value)` to use `const dictionary = { zh, ko }[language]`; English returns its source unchanged, and an absent dictionary key also returns its source unchanged. Preserve the existing whitespace and arrow-affix behavior.

- [ ] **Step 2: Add Korean catalog normalization**

Add `normalizeKoreanCatalog(catalog)` parallel to the existing Chinese normalization. Localize product/service category metadata, generated summaries, capabilities, deliverables, use cases, solution headlines/outcomes, product/service codes, and visual labels. Keep AIYA and established abbreviations unchanged. Call only the normalizer matching the active locale so English and Chinese catalog data are unchanged.

- [ ] **Step 3: Localize Korean document metadata and detail pages**

Generalize `applyDocument()` and solution/detail-page title handling so `ko` sets `document.documentElement.lang = 'ko'`, translates body text and attributes through `ko`, and assigns Korean page titles for home, solutions, sign-in, News, event/story/article, and the financial-services integration page. Preserve the existing Chinese title values exactly.

- [ ] **Step 4: Add Korean typography**

Add:

```css
html[lang="ko"] body{font-family:"Apple SD Gothic Neo","Malgun Gothic","Noto Sans KR",Inter,"Segoe UI",Arial,sans-serif}
html[lang="ko"] .mega-menu-copy strong,
html[lang="ko"] .mega-menu-copy small{word-break:keep-all}
```

Add only targeted Korean line-height/word-break rules revealed by the browser test; do not resize unrelated English/Chinese components.

- [ ] **Step 5: Run the focused test and confirm GREEN**

Run: `powershell -NoProfile -ExecutionPolicy Bypass -File tests/validate-korean-language-selector.ps1`

Expected: PASS for every page family at desktop and mobile widths.

- [ ] **Step 6: Commit Korean localization**

```powershell
git -c core.longpaths=true add i18n.js styles.css tests/validate-korean-language-selector.ps1
git -c core.longpaths=true commit -m "feat: add Korean website localization"
```

---

### Task 4: Regression verification and deployment

**Files:**
- Verify: `i18n.js`
- Verify: `styles.css`
- Verify: `tests/validate-korean-language-selector.ps1`

**Interfaces:**
- Consumes: completed three-language implementation
- Produces: verified local `main` and a successful GitHub Pages deployment

- [ ] **Step 1: Run focused i18n verification**

Run: `powershell -NoProfile -ExecutionPolicy Bypass -File tests/validate-korean-language-selector.ps1`

Expected: PASS with Korean selector and page-family checks at both viewports.

- [ ] **Step 2: Run unaffected static validation**

Run: `powershell -NoProfile -ExecutionPolicy Bypass -File tests/validate-news-placeholder.ps1`

Expected: `News placeholder validation passed.`

- [ ] **Step 3: Inspect the final diff**

Run: `git -c core.longpaths=true diff main...HEAD -- i18n.js styles.css tests/validate-korean-language-selector.ps1`

Expected: only language parsing, Korean localization, selector behavior/styles, and its test are changed.

- [ ] **Step 4: Merge into local main and rerun both focused tests**

Run both commands from local `main` after a fast-forward merge. Both must exit `0` before pushing.

- [ ] **Step 5: Push and verify GitHub Pages**

```powershell
git -c core.longpaths=true push origin main
```

Expected: the Pages workflow succeeds for the new head SHA, and `index.html?lang=ko` returns `200`, `<html lang="ko">`, Korean navigation, and the three-language selector without horizontal overflow.

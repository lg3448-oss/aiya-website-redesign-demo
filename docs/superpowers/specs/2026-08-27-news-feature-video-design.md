# News Feature Video Design

## Goal

Replace the placeholder artwork in the main feature on `news.html` with the supplied MP4 video. The video should use its own opening frame as the visual cover and play only when the visitor chooses to play it.

## Scope

- Copy the supplied video into the site's `assets` directory with a stable, descriptive filename.
- Replace only the main News feature placeholder with a native HTML5 `<video>` element.
- Show standard browser playback controls and do not autoplay or loop the video.
- Preserve the current main-feature dimensions and responsive behavior.
- Remove the main feature's `Under Construction` label and `01` marker.
- Leave the Events and Stories cards unchanged.
- Leave the connected-business article detail page unchanged.

## Implementation

The video element will use `controls` and `playsinline`, with metadata preloading to avoid eagerly downloading the entire approximately 72.5 MB file. Its surrounding class will retain the existing feature-media sizing. A narrowly scoped CSS rule will make the video fill that area with `object-fit: cover`, use a dark fallback background while loading, and remain responsive on mobile.

No JavaScript is needed. The browser's native player provides keyboard access, playback state, volume, seeking, and fullscreen support.

## Verification

- Confirm the copied MP4 exists in `assets` and matches the source file size.
- Confirm the main feature contains the video and no longer contains `Under Construction` or `01`.
- Confirm the two lower cards still contain their existing placeholders and copy.
- Confirm the video is not configured to autoplay or loop and has native controls.
- Load the News page at desktop and mobile widths and verify that the video remains contained within the main feature without changing the lower cards.

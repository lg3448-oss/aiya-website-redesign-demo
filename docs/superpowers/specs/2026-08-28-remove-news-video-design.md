# Remove News Feature Video Design

## Goal

Restore the News homepage feature area to its pre-video `Under Construction` placeholder state.

## Scope

- Revert only commit `74a1b739534ff2b0d34be88618b44ecbcced809d` (`Add video to News feature`).
- Restore the linked `news-feature-image news-placeholder` element and its `Under Construction` label in `news.html`.
- Restore the previous News stylesheet cache version and remove only the video-specific CSS rules.
- Delete `assets/aiya-news-connected-business.mp4` and `tests/validate-news-feature-video.ps1`.
- Preserve the News hub, article/event/story placeholder pages, navigation, and every earlier or unrelated update.

## Verification

1. The News feature contains the original linked construction placeholder and no `<video>` element.
2. The MP4 asset and video-only test file no longer exist.
3. No `news-feature-video` or video asset reference remains in tracked public files.
4. The resulting diff is the exact inverse of commit `74a1b73`.
5. GitHub Pages deploys the new revert commit successfully.

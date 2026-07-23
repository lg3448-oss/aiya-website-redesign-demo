from pathlib import Path

from PIL import Image


SOURCE_DIR = Path(r"C:\Users\Work Station 303\Downloads")
SOURCE_NUMBERS = (6, 7, 8, 9, 10, 11)
ARTICLE_BOX = (760, 82, 2120, 1650)
SCROLL_OFFSETS = (0, 1074, 2060, 3094, 3880, 4828)
SOURCE_SIZE = (2880, 1800)
CANVAS_SIZE = (1360, 6396)
OUTPUT_SIZE = (1080, 5079)
OUTPUT_PATH = Path("output/wechat/aiya-wechat-long-image.jpg")


def load_sources() -> list[Image.Image]:
    sources = []
    for number in SOURCE_NUMBERS:
        path = SOURCE_DIR / f"Image ({number}).jpg"
        if not path.exists():
            raise FileNotFoundError(f"Missing source image: {path}")

        image = Image.open(path).convert("RGB")
        if image.width != SOURCE_SIZE[0] or image.height not in (1786, 1798, 1800):
            raise ValueError(
                f"Unexpected source dimensions for {path}: "
                f"{image.width}x{image.height}"
            )
        sources.append(image)
    return sources


def build_long_image(sources: list[Image.Image]) -> Image.Image:
    canvas = Image.new("RGB", CANVAS_SIZE, "white")
    for source, offset in zip(sources, SCROLL_OFFSETS, strict=True):
        article_view = source.crop(ARTICLE_BOX)
        canvas.paste(article_view, (0, offset))

    return canvas.resize(OUTPUT_SIZE, Image.Resampling.LANCZOS)


def main() -> None:
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    long_image = build_long_image(load_sources())
    long_image.save(
        OUTPUT_PATH,
        "JPEG",
        quality=95,
        subsampling=0,
        optimize=True,
    )
    print(f"Created {OUTPUT_PATH} ({long_image.width}x{long_image.height})")


if __name__ == "__main__":
    main()

export function getNewsImageSrc(image: any) {
  return (
    image?.sizes?.news_slider_image ||
    image?.sizes?.medium_large ||
    image?.sizes?.large ||
    image?.sizes?.medium ||
    image?.url ||
    image?.src ||
    ""
  );
}

export function isWordPressUploadImage(src: unknown) {
  return (
    typeof src === "string" &&
    src.includes("dovp7.sg-host.com/wp-content/uploads/")
  );
}

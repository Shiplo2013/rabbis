const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

const CreateShimmerDataUrl = (w: number, h: number) => {
  const shimmer = `
    <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#e7dcc6" offset="20%" />
          <stop stop-color="#f6efe3" offset="50%" />
          <stop stop-color="#e7dcc6" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#e7dcc6" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1.2s" repeatCount="indefinite"  />
    </svg>
  `;

  return `data:image/svg+xml;base64,${toBase64(shimmer)}`;
};

export default CreateShimmerDataUrl;

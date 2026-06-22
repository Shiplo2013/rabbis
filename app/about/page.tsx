export default async function Page() {
  const data = await fetch("https://api.vercel.app/blog");
  const posts = await data.json();
  return (
    <ul>
      {posts.forEach((post: any) => (
        <li key={post.id}>{post.title.rendered}</li>
      ))}
    </ul>
  );
}

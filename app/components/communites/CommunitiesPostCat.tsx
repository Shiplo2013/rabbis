import SingleCommunityPost from "./SingleCommunityPost";

interface ChildProps {
  key?: number;
  className: string;
  postsContent: SectionData | null;
}

type SectionData = {
  categoryId: number;
  categoryTitle: string;
  posts: {
    [x: string]: any;
    id: number;
    slug: string;
    link: string;
    title: string;
    content: string;
    excerpt: string;
    date: string | undefined;
    modified: string | undefined;
    acf: Record<string, unknown> | unknown[] | null;
  };
};

export default function CommunitiesPostCat(props: ChildProps) {
  const postData = props.postsContent as SectionData | null;

  return (
    <div dir="rtl" className={`community-cat-section ${props.className}`}>
      <div className="community-cat-title mb-10.5">
        <h2 className="text-[30px] sm:text-[40px] lg:text-[55px] leading-[0.7em] text-(--theme-color)">
          {postData?.categoryTitle || ""}
        </h2>
      </div>
      <div className="posts-wrapper h-auto flex gap-[5vh] lg:gap-[5vw] flex-col lg:flex-row">
        {postData?.posts &&
          postData?.posts?.map((item: any, index: number) => (
            <SingleCommunityPost key={index} data={item} />
          ))}
      </div>
    </div>
  );
}

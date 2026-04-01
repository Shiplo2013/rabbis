import SingleCommunittyPost from "./SingleCommunittyPost";

interface ChildProps {
  className: string;
  postsContent: {
    sectionTitle: string;
    sectionContent: { title: string; content: string; image: any }[];
  }[];
}

export default function CommunitesPostCat(props: ChildProps) {
  return (
    <section dir="rtl" className={`community-cat-section ${props.className}`}>
      <div className="community-cat-title mb-10.5">
        <h2 className="text-[55px] leading-[0.7em] text-(--theme-color)">
          {props?.postsContent?.[0]?.sectionTitle}
        </h2>
      </div>
      <div className="posts-wrapper h-auto flex gap-[5vw]">
        {props?.postsContent?.[0]?.sectionContent.map((item, index) => (
          <SingleCommunittyPost
            key={index}
            title={item.title}
            content={item.content}
            image={item.image}
          />
        ))}
      </div>
    </section>
  );
}

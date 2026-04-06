import { StaticImageData } from "next/image";
import SingleZatzelGraduate from "./SingleZatzelGraduate";

interface PostData {
  title: string;
  content: string;
  image: StaticImageData;
}

interface ChildProps {
  className: string;
  postsContent: {
    catTitle: string;
    catPosts: PostData[];
  };
}

export default function ZatzelPostCat(props: ChildProps) {
  return (
    <section
      dir="rtl"
      className={`zatzel-cat-section ${props.className} will-change-transform`}
    >
      <div className="zatzel-cat-title mb-10.5">
        <h2 className="text-[55px] leading-[0.7em] text-(--theme-color)">
          {props?.postsContent?.catTitle}
        </h2>
      </div>
      <div className="posts-wrapper h-auto flex gap-[5vw]">
        {props?.postsContent?.catPosts.map((item, index) => (
          <SingleZatzelGraduate
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

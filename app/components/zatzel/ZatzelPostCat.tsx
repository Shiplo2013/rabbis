import parse from "html-react-parser";
import SingleZatzelGraduate from "./SingleZatzelGraduate";

interface ZatzelPost {
  title: string;
  image: any;
  yearOfDeath: string;
}
interface PostData {
  sectionTitle: string;
  sectionContent: ZatzelPost[];
}

interface ChildProps {
  className: string;
  dataIndex: number;
  postsContent: PostData;
}

export default function ZatzelPostCat(props: ChildProps) {
  const zatzelCatData = props.postsContent;
  return (
    <section
      dir="rtl"
      data-index={props.dataIndex}
      className={`zatzel-cat-section ${props.className} will-change-transform`}
    >
      <div className="zatzel-cat-title mb-10.5">
        <h2 className="text-[55px] leading-[0.7em] text-(--theme-color)">
          {parse(zatzelCatData?.sectionTitle || "כותרת קטגוריה")}
        </h2>
      </div>
      <div className="posts-wrapper h-auto flex gap-[5vw]">
        {zatzelCatData?.sectionContent?.map(
          (item: ZatzelPost, index: number) => (
            <SingleZatzelGraduate key={index} dataIndex={index} data={item} />
          ),
        )}
      </div>
    </section>
  );
}

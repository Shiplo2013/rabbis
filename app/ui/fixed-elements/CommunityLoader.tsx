import { useAppState } from "@/app/components/AppContext";
import parse from "html-react-parser";

export default function CommunityLoader() {
  // Selectors
  const { currentCommunitiesPost } = useAppState();
  return (
    <div
      id="community-loader"
      className="community-loader fixed top-0 left-0 w-full h-full bg-[#C3A13F] flex items-center justify-center z-999 text-[#091B24]"
    >
      <div className="loader-content max-w-full w-full lg:w-195 h-auto">
        <h2 className="loader-heading text-[60px] sm:text-[90px] lg:text-[130px] leading-[80%] font-bold text-center">
          {parse(currentCommunitiesPost?.title || "")}
        </h2>
        {currentCommunitiesPost?.subtitle && (
          <h4 className="text-[22px] sm:text-[32px] lg:text-[44px] leading-[1em] mt-3 text-center">
            {parse(currentCommunitiesPost?.subtitle || "")}
          </h4>
        )}
      </div>
    </div>
  );
}

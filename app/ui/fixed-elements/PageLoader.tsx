import LoadingAnimation from "@/app/assets/icons/LoadingAnimation";

export default function PageLoader() {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-99 bg-black">
      <div className="text-center">
        {/* <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-500 mx-auto mb-4" />
            <p>Loading...</p> */}
        <div className="loading-icon w-50 h-auto">
          <LoadingAnimation />
        </div>
      </div>
    </div>
  );
}

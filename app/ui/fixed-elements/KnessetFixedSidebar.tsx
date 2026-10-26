import { useAppState } from "@/app/components/AppContext";
import Sidebar from "@/app/components/knesset/Sidebar";
import SubscribeForm from "@/app/components/sheets/SubscribeForm";
import { useState } from "react";

export default function KnessetFixedSidebar() {
  // Selectors
  const {
    knessetCategoryData,
    knessetActiveCategory,
    knessetSearchQuery,
    setKnessetActiveCategory,
    setKnessetSearchQuery,
  } = useAppState();
  const [knessetSearchQueryLocal, setKnessetSearchQueryLocal] = useState("");

  return (
    <div
      id="knesset-sidebar"
      className="knesset-sidebar fixed top-0 right-15 w-70 h-full bg-[#FBF4E6] flex flex-col z-50 border-l border-[#D1CECE]"
    >
      <div className="knesset-sidebar-wrapper mt-auto mb-auto pl-5 pr-5">
        <Sidebar
          activeCategory={knessetActiveCategory || null}
          categories={knessetCategoryData || []}
          onCategorySelect={(id) => {
            setKnessetActiveCategory(id);
          }}
          searchQuery={knessetSearchQueryLocal || ""}
          onSearchChange={setKnessetSearchQueryLocal}
          onSearchSubmit={setKnessetSearchQuery}
        />
      </div>
      <SubscribeForm mode="dark" />
    </div>
  );
}

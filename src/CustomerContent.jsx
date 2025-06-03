import { useState, useEffect } from "react";
import TpHeader02 from "./components/TpHeader02";
import TpBanner04 from "./components/TpBanner04";
import AnimatedPage from "./components/AnimatedPage";

// ✅ 등록된 컴포넌트 매핑
const componentMap = {
  배너04: TpBanner04,
};

// ✅ 등록된 헤더 타입 매핑
const headerMap = {
  헤더02: TpHeader02,
};

export default function CustomerContent({ pageData }) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPageIndex]);

  const currentPage = pageData?.pages?.[currentPageIndex] || { components: [] };
  const isValidComponents =
    Array.isArray(currentPage.components) && currentPage.components.length > 0;

  const HeaderComponent = headerMap[pageData.headerType];

  return (
    <main style={{ background: "#000", color: "#fff", margin: 0, padding: 0 }}>
      {HeaderComponent && (
        <HeaderComponent
          isPreview
          setCurrentPageIndex={setCurrentPageIndex}
          currentPageIndex={currentPageIndex}
          menuItems={pageData.menuItems || []}
        />
      )}

      <AnimatedPage key={currentPageIndex} index={currentPageIndex}>
        {isValidComponents ? (
          currentPage.components.map((comp, i) => {
            const Comp = componentMap[comp.type];
            return Comp ? (
              <Comp key={i} {...comp} isPreview />
            ) : (
              <div key={i} style={{ padding: "60px", background: "#111" }}>
                ⚠️ 알 수 없는 컴포넌트: <strong>{comp.type}</strong>
              </div>
            );
          })
        ) : (
          <div style={{ padding: "100px", textAlign: "center" }}>
            ❌ 페이지 구성 요소가 없습니다
          </div>
        )}
      </AnimatedPage>
    </main>
  );
}

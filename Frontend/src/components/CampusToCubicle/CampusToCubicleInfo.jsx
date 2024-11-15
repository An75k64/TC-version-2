import React, { Suspense, memo } from "react";
import Hero from "./hero"; // Ensure Hero is optimized as it loads immediately

// Lazy load the remaining components
const College = React.lazy(() => import("./college"));
const Company = React.lazy(() => import("./Company"));
const CTCSection3 = React.lazy(() => import("./CTCsection3"));
const CTCSection4 = React.lazy(() => import("./CTCsection4"));

// Memoize static components to prevent unnecessary re-renders
const MemoizedCollege = memo(College);
const MemoizedCompany = memo(Company);
const MemoizedCTCSection3 = memo(CTCSection3);
const MemoizedCTCSection4 = memo(CTCSection4);

export default function CampusToCubicleInfo() {
  return (
    <>
      {/* Critical component loaded immediately */}
      <Hero />

      {/* Lazy loaded components wrapped in Suspense */}
      <Suspense fallback={<div>Loading...</div>}>
        <MemoizedCollege />
        <MemoizedCompany />
        <MemoizedCTCSection3 />
        <div>
          <MemoizedCTCSection4 />
        </div>
      </Suspense>
    </>
  );
}

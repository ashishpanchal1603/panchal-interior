"use client";

import dynamic from "next/dynamic";

const InteriorEstimator = dynamic(() => import("./InteriorEstimator"), {
  ssr: false,
  loading: () => (
    <div className="py-24 bg-stone-50 text-center text-sm font-semibold text-stone-500">
      Loading Cost Estimator...
    </div>
  ),
});

export default function EstimatorWrapper() {
  return <InteriorEstimator />;
}

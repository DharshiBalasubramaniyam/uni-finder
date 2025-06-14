import { Suspense } from "react";
import ResultsPage from "./ResultsPage";

export default function ResultsWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultsPage />
    </Suspense>
  );
}

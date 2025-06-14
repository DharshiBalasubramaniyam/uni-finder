import { Suspense } from "react";
import ResultsPage from "./ResultsPage";
import Loading from "../components/common/Loading";

export default function ResultsWrapper() {
  return (
    <Suspense fallback={<Loading/>}>
      <ResultsPage />
    </Suspense>
  );
}

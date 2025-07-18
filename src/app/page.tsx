"use client";
import React from "react";
import { useState, useContext } from "react";
import TextInput from "./components/form/TextInput";
import SelectInput from "./components/form/SelectInput";
import Label from "./components/form/Label";
import { useRouter } from "next/navigation";
import Header from "./components/common/Header";
import { OptionType } from "./types/Types";
import Footer from "./components/common/Footer";
import { DataStoreContext } from "./contexts/DataStore";

export default function Home() {

  const router = useRouter();
  const [stream, setStream] = useState<OptionType | null>(null);
  const [district, setDistrict] = useState<OptionType | null>(null);
  const [selectedSubjects, setSelectedSubjects] = useState<OptionType[]>([]);
  const [zscore, setZscore] = useState("");
  const { subjects, streams, districts } = useContext(DataStoreContext)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted with:", {
      zscore,
      district,
      stream,
      subjects: selectedSubjects,
    });
    if (!validate(zscore, district, stream, selectedSubjects)) {
      return;
    }
    router.push(`/results?zscore=${zscore}&district=${district?.value}&stream=${stream?.value}&subjects=${selectedSubjects.map(s => s.value)}`)
  };

  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <div className="w-full p-2 flex justify-center items-start mt-36 min-h-screen">
        <form className="p-4 w-full max-w-2xl rounded border border-gray-700" onSubmit={onSubmit}>
          <div className="w-full flex flex-wrap gap-3 *:flex-1 *:min-w-[200px] *:mt-2">
            <div>
              <Label htmlFor="zscore" text="Z-score" />
              <TextInput
                id="zscore"
                value={zscore}
                onChange={(e) => setZscore(e.target.value)}
                placeholder="Enter your Z-score"
                required={true}
                className="bg-gray-800 h-10"
              />
            </div>
            <div>
              <Label htmlFor="district" text="District" />
              <SelectInput
                isMultiple={false}
                id="district"
                options={districts}
                value={district}
                onChange={(selectedOption) => setDistrict(selectedOption as OptionType | null)}
                placeholder="Select district"
                required={true}
              />
            </div>
            <div>
              <Label htmlFor="stream" text="Stream" />
              <SelectInput
                isMultiple={false}
                id="stream"
                options={streams}
                value={stream}
                onChange={(selectedOption) => setStream(selectedOption as OptionType | null)}
                placeholder="Select stream"
                required={true}
              />
            </div>
          </div>
          <div className="mt-4">
            <Label htmlFor="subjects" text="Subjects" />
            <SelectInput
              isMultiple={true}
              id="subjects"
              options={subjects}
              value={selectedSubjects}
              onChange={(selectedOptions) => setSelectedSubjects(selectedOptions as OptionType[])}
              placeholder="Select subjects"
              required={true}
              isOptionDisabled={() => selectedSubjects.length >= 3}
            />
          </div>
          <button
            type="submit"
            className="w-full mt-6 bg-cyan-500 text-white p-2 rounded hover:bg-cyan-600"
          >
            Search
          </button>
        </form>
      </div>
      <Footer/>
    </main>
  );
}

function validate(zscore: string, district: OptionType | null, stream: OptionType | null, subjects: OptionType[]) {

  if (!zscore) {
    alert("Z-score is required.");
    return false
  } else if (!/^\d+(\.\d{4})?$/.test(zscore)) {
    alert("Z-score must have four decimal places.");
    return false
  } else if (parseFloat(zscore) < 0 || parseFloat(zscore) > 4.0000) {
    alert("Z-score must be between 0.0000 and 4.0000.");
    return false
  }

  if (!district) {
    alert("District is required.");
    return false
  }

  if (!stream) {
    alert("Stream is required.");
    return false
  }

  if (subjects.length != 3) {
    alert("You must select 3 subjects.");
    return false
  }
  return true;

}

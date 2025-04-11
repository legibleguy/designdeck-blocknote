"use client";

import TextareaAutosize from "react-textarea-autosize";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import ProjectTags from "../_components/projectTags";

const EditorDocument = () => {
  const Editor = useMemo(
    () => dynamic(() => import("../_components/editor"), { ssr: false }),
    []
  );
  return (
    <main className="min-h-screen">
      <div className="flex flex-col px-24 py-10 w-full">

        {/* project title */}
        <TextareaAutosize
          placeholder="Untitled"
          className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
        />

        {/* document */}
        <Editor onChange={function (): void {}} />
      </div>
      <ProjectTags />
    </main>
  );
};

export default EditorDocument;

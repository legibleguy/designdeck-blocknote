"use client";

import TextareaAutosize from "react-textarea-autosize";
import dynamic from "next/dynamic";
import {useMemo} from "react";

const EditorDocument = () => {
    const Editor = useMemo(
        () => dynamic(() => import("../_components/editor"), {ssr:false}), []);
  return (
    <main className="min-h-screen">
      <div className="flex flex-col px-24 py-10 w-full">
        <TextareaAutosize
          placeholder="Untitled"
          className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
        />
        <Editor onChange={function (): void {}} />
      </div>
    </main>
  );
};

export default EditorDocument;

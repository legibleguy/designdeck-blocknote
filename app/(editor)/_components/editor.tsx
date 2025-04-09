"use client";

import { BlockNoteEditor, PartialBlock } from "@blocknote/core";

import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";

import { useCreateBlockNote } from "@blocknote/react";
import React from "react";

import "@blocknote/core/fonts/inter.css";

interface EditorProps {
  onChange: () => void;
  initialContent?: string;
  editable?: boolean;
}

const Editor: React.FC<EditorProps> = ({
  onChange,
  initialContent,
  editable,
}) => {
  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
  });
  return (
    <div className="-mx-[54px] my-4">
      <BlockNoteView
        editor={editor}
        editable={editable}
        theme="light"
        onChange={onChange}
      />
    </div>
  );
};

export default Editor;

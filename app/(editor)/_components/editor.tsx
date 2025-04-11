"use client";

import { BlockNoteEditor, PartialBlock } from "@blocknote/core";

import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";

import { useCreateBlockNote } from "@blocknote/react";
import React from "react";

import "@blocknote/core/fonts/inter.css";

interface EditorProps {
  onChange: (content: string) => void;
  initialContent?: string;
  editable?: boolean;
  onEditorReady?: (editor: BlockNoteEditor | undefined) => void;
}

const Editor: React.FC<EditorProps> = ({
  onChange,
  initialContent,
  editable,
  onEditorReady
}) => {
  const editor: BlockNoteEditor | undefined = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
  });

  // Notify parent component when the editor is ready
  React.useEffect(() => {
    if (onEditorReady) {
      onEditorReady(editor);
    }
  }, [editor, onEditorReady]);

  return (
    <div className="-mx-[54px] my-4">
      <BlockNoteView
        editor={editor}
        editable={editable}
        theme="light"
        onChange={async () => onChange(await editor?.blocksToFullHTML(editor.document) || "")}
      />
    </div>
  );
};

export default Editor;

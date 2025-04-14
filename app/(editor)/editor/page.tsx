"use client";

import TextareaAutosize from "react-textarea-autosize";
import dynamic from "next/dynamic";
import { SetStateAction, useMemo, useEffect, useContext } from "react";
import ProjectTags from "../_components/projectTags";
import { useState } from "react";
import { BlockNoteEditor } from "@blocknote/core";
import { Tag } from "../context/projectTagsContext";
import { ProjectTagsContext } from "../context/projectTagsContext";

const EditorDocument = () => {
  const [editorContent, setEditorContent] = useState("Default content for the editor.");
  const [editorInstance, setEditorInstance] = useState<BlockNoteEditor | null>(null);
  const [projectTitle, setProjectTitle] = useState("");
  const { tags, setAllTags } = useContext(ProjectTagsContext);

  const Editor = useMemo(
    () => dynamic(() => import("../_components/editor"), { ssr: false }),
    []
  );

  const handleLLMIntegration = async (tag: any) => {
    if (!editorInstance) {
      console.error("Editor instance is not ready.");
      return;
    }

    try {
      const response = await fetch("/api/openrouter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tag: {
            id: tag.id,
            title: tag.title,
            description: tag.description,
            longDescription: tag.longDescription, // Include longDescription
            solvedProblems: tag.solvedProblems, // Include solvedProblems
          },
          documentContent: editorContent,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch LLM integration");
      }

      const data = await response.json();
      const markdownResponse = data.choices[0].message.content;

      // Clear the editor content
      editorInstance.replaceBlocks(editorInstance.document, []);

      // Convert HTML to blocks and update the editor content
      editorInstance.pasteHTML(markdownResponse);
    } catch (error) {
      console.error("Error during LLM integration:", error);
    }
  };

  const saveContent = () => {
    const dataToSave = {
      title: projectTitle,
      content: editorContent,
      tags: tags, // Use tags from context
    };
    const blob = new Blob([JSON.stringify(dataToSave, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "project.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const loadContent = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";
    input.onchange = (event) => {
      const target = event.target as HTMLInputElement | null;
      const file = target?.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const savedData = JSON.parse(e.target?.result as string);
            const { title, content, tags } = savedData;
            setProjectTitle(title);
            setEditorContent(content);
            setAllTags(tags || []); // Update context for sidebar and panel
            if (editorInstance) {
              editorInstance.replaceBlocks(editorInstance.document, []);
              editorInstance.pasteHTML(content);
            }
            alert("Project loaded successfully!");
          } catch (error) {
            alert("Failed to load project: Invalid file format.");
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  useEffect(() => {
    // Sync project title with TextareaAutosize
    setProjectTitle(document.querySelector("textarea")?.value || "");
  }, []);

  return (
    <main className="min-h-screen">
      <div className="flex flex-col px-24 py-10 w-full max-w-4xl">
        {/* project title */}
        <TextareaAutosize
          placeholder="Untitled"
          className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
          value={projectTitle}
          onChange={(e) => setProjectTitle(e.target.value)}
        />

        {/* document */}
        <Editor
          onChange={(content: SetStateAction<string>) => setEditorContent(content)}
          onEditorReady={(editor) => editor && setEditorInstance(editor)}
        />
      </div>
      <div className="absolute top-4 right-4 flex space-x-2">
        <button
          onClick={saveContent}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save
        </button>
        <button
          onClick={loadContent}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Load
        </button>
      </div>
      <ProjectTags onBrainstorm={handleLLMIntegration} onTagsChange={setAllTags} />
    </main>
  );
};

export default EditorDocument;

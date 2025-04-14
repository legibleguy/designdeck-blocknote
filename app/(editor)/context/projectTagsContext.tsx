"use client";

import React, { createContext, useState } from "react";

export interface Tag {
  id: string;
  title: string;
  description: string;
  longDescription?: string; // Added optional field for long description
  solvedProblems?: string; // Added optional field for solved problems
}

interface ProjectTagsContextProps {
  tags: Tag[];
  hiddenTags: string[];
  addTag: (tag: Tag) => void;
  removeTag: (id: string) => void;
  isTagHidden: (id: string) => boolean;
  updateTag: (id: string, description: string) => void;
  setAllTags: (tags: Tag[]) => void; // Add this line
}

export const ProjectTagsContext = createContext<ProjectTagsContextProps>(null!);

export const ProjectTagsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [hiddenTags, setHiddenTags] = useState<string[]>([]);

  const addTag = (tag: Tag) => {
    setTags((prevTags) => [...prevTags, tag]);
    setHiddenTags((prevHidden) => [...prevHidden, tag.id]);
  };

  const removeTag = (id: string) => {
    setTags((prevTags) => prevTags.filter((tag) => tag.id !== id));
    setHiddenTags((prevHidden) => prevHidden.filter((hiddenId) => hiddenId !== id));
  };

  const isTagHidden = (id: string) => hiddenTags.includes(id);

  const updateTag = (id: string, description: string) => {
    setTags((prevTags) =>
      prevTags.map((tag) => (tag.id === id ? { ...tag, description } : tag))
    );
  };

  const setAllTags = (tags: Tag[]) => {
    setTags(tags);
    setHiddenTags(tags.map((tag) => tag.id));
  };

  return (
    <ProjectTagsContext.Provider
      value={{ tags, hiddenTags, addTag, removeTag, isTagHidden, updateTag, setAllTags }}
    >
      {children}
    </ProjectTagsContext.Provider>
  );
};
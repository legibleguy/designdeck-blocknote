"use client";

import React, { createContext, useState } from "react";

interface Tag {
  id: string; // Changed from number to string
  title: string;
  description: string;
}

interface ProjectTagsContextProps {
  tags: Tag[];
  hiddenTags: string[]; // Changed from number[] to string[]
  addTag: (tag: Tag) => void;
  removeTag: (id: string) => void; // Changed parameter type from number to string
  isTagHidden: (id: string) => boolean; // Changed parameter type from number to string
  updateTag: (id: string, description: string) => void; // New function to update tag description
}

export const ProjectTagsContext = createContext<ProjectTagsContextProps>(null!);

export const ProjectTagsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [hiddenTags, setHiddenTags] = useState<string[]>([]); // Changed from number[] to string[]

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

  return (
    <ProjectTagsContext.Provider
      value={{ tags, hiddenTags, addTag, removeTag, isTagHidden, updateTag }}
    >
      {children}
    </ProjectTagsContext.Provider>
  );
};
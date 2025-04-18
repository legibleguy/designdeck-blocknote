import React, { useContext } from "react";
import { ProjectTagsContext } from "../context/projectTagsContext";
import { ChevronUp, ChevronDown } from "lucide-react";

const MAX_PANEL_HEIGHT = 400; // Maximum allowed height for the Project Tags panel

interface Tag {
  id: string; // Changed id type from number to string
  title: string;
  description: string;
}

interface ProjectTagsProps {
  onBrainstorm: (tag: Tag) => void;
  onTagsChange: (tags: Tag[]) => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

const ProjectTags: React.FC<ProjectTagsProps> = ({ onBrainstorm, onTagsChange, collapsed, onToggleCollapse }) => {
  const { tags, removeTag, updateTag } = useContext(ProjectTagsContext);

  const handleRemove = (id: string) => {
    removeTag(id);
    onTagsChange(tags.filter((tag) => tag.id !== id));
  };

  const handleDescriptionChange = (id: string, description: string) => {
    updateTag(id, description);
    onTagsChange(
      tags.map((tag) => (tag.id === id ? { ...tag, description } : tag))
    );
  };

  return (
    <div
      className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg w-80"
      style={{ maxHeight: collapsed ? 56 : MAX_PANEL_HEIGHT, overflowY: collapsed ? "hidden" : "auto" }}
    >
      <div className="flex items-center justify-between mb-4 select-none cursor-pointer">
        <h3 className="text-lg font-medium">Project Tags</h3>
        <button
          onClick={onToggleCollapse}
          className="ml-2 p-1 bg-gray-100 rounded hover:bg-gray-200"
          aria-label={collapsed ? "Expand Project Tags" : "Collapse Project Tags"}
          tabIndex={0}
        >
          {!collapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
        </button>
      </div>
      {!collapsed && (
        <div className="flex flex-col gap-4 overflow-auto">
          {tags.map((tag) => (
            <div key={tag.id} className="mb-2 mt-4">
              <h4 className="text-sm font-semibold">{tag.title}</h4>
              <textarea
                className="w-full mt-2 p-2 rounded-md text-sm resize-none"
                placeholder="Write how this relates to your game..."
                value={tag.description}
                style={{ height: tag.description ? "4rem" : "3rem" }}
                onChange={(e) => handleDescriptionChange(tag.id, e.target.value)}
              />
              <div className="flex gap-2 mt-2">
                <button
                  className="px-4 py-2 text-sm text-white bg-gray-600 rounded-full hover:bg-gray-800 transition duration-150 ease-in-out"
                  onClick={() => onBrainstorm(tag)}
                >
                  Brainstorm
                </button>
                <button
                  className="px-4 py-2 text-sm text-gray-600 border border-gray-600 rounded-full hover:border-gray-800 hover:text-black transition duration-150 ease-in-out"
                  onClick={() => handleRemove(tag.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectTags;

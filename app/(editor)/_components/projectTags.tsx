import React, { useContext } from "react";
import { ProjectTagsContext } from "../context/projectTagsContext";

const MAX_PANEL_HEIGHT = 400; // Maximum allowed height for the Project Tags panel

interface Tag {
  id: string; // Changed id type from number to string
  title: string;
  description: string;
}

const ProjectTags: React.FC = () => {
  const { tags, removeTag, updateTag } = useContext(ProjectTagsContext); // Added updateTag to the context

  const handleRemove = (id: string) => {
    removeTag(id);
  };

  const handleDescriptionChange = (id: string, description: string) => {
    updateTag(id, description); // Use updateTag to update the description
  };

  const handleBrainstorm = async (tag: Tag) => {
    try {
      const response = await fetch('/api/openrouter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tag }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch brainstorming ideas');
      }

      const data = await response.json();
      console.log('Brainstorming result:', data);
      // Handle the brainstorming result (e.g., display it in the UI)
    } catch (error) {
      console.error('Error during brainstorming:', error);
    }
  };

  return (
    <div
      className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg w-80"
      style={{ maxHeight: MAX_PANEL_HEIGHT, overflowY: "auto" }}
    >
      <h3 className="text-lg font-medium mb-4">Project Tags</h3>

      <div className="flex flex-col gap-4 overflow-auto">
        {tags.map((tag) => (
          <div key={tag.id} className="mb-2 mt-4">
            <h4 className="text-sm font-semibold">{tag.title}</h4>
            <textarea
              className="w-full mt-2 p-2 rounded-md text-sm resize-none"
              placeholder="Write how this relates to your game..."
              value={tag.description}
              style={{ height: tag.description ? "4rem" : "3rem" }}
              onChange={(e) => handleDescriptionChange(tag.id, e.target.value)} // Updated to use handleDescriptionChange
            />
            <div className="flex gap-2 mt-2">
              <button
                className="px-4 py-2 text-sm text-white bg-gray-600 rounded-full hover:bg-gray-800 transition duration-150 ease-in-out"
                onClick={() => handleBrainstorm(tag)}
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
    </div>
  );
};

export default ProjectTags;

"use client";

import { cn } from "@/lib/utils";
import { ChevronsLeft, MenuIcon, List, BookImage, Info, Dices, ChevronLeft, ChevronRight } from "lucide-react";
import { ComponentRef, useRef, useState, useEffect, useContext } from "react";
import { useMediaQuery } from "usehooks-ts";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import GameMechanicCardSmall from "./gameMechanicCardSmall";
import GameMechanicCardLarge from "./gameMechanicCardLarge";
import { ProjectTagsContext } from "../context/projectTagsContext";

interface MechanicsNavProps {
  gameMechanics: {
    id: string;
    title: string;
    category: string;
    description: string;
    longDescription: string;
    solvedProblems: string;
  }[];
}

const MIN_SIDEBAR_WIDTH = 309;

const MechanicsNav: React.FC<MechanicsNavProps> = ({ gameMechanics }) => {
  const { addTag, isTagHidden } = useContext(ProjectTagsContext);

  const isMobile = useMediaQuery("(max-width: 768px)");

  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ComponentRef<"aside">>(null);
  const navbarRef = useRef<ComponentRef<"div">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);
  const [viewMode, setViewMode] = useState("list");
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return;
    let newWidth = event.clientX;

    if (newWidth < MIN_SIDEBAR_WIDTH) newWidth = MIN_SIDEBAR_WIDTH;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWidth}px)`
      );
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMenuIconClick = () => {
    if (isMobile) {
      setIsCollapsed(false);
      if (sidebarRef.current && navbarRef.current) {
        sidebarRef.current.style.width = "100%";
        navbarRef.current.style.setProperty("left", "100%", "important");
        navbarRef.current.style.setProperty("width", "0", "important");
      }
    } else {
      setIsCollapsed(false);
      if (sidebarRef.current && navbarRef.current) {
        sidebarRef.current.style.width = `${MIN_SIDEBAR_WIDTH}px`;
        navbarRef.current.style.setProperty("left", `${MIN_SIDEBAR_WIDTH}px`);
        navbarRef.current.style.setProperty(
          "width",
          `calc(100% - ${MIN_SIDEBAR_WIDTH}px)`
        );
      }
    }
  };

  const handleChevronClick = () => {
    if (isMobile) {
      setIsCollapsed(true);
      if (sidebarRef.current && navbarRef.current) {
        sidebarRef.current.style.width = "0px";
        navbarRef.current.style.setProperty("left", "0px");
        navbarRef.current.style.setProperty("width", "100%");
      }
    } else {
      setIsCollapsed(true);
      if (sidebarRef.current && navbarRef.current) {
        sidebarRef.current.style.width = `${MIN_SIDEBAR_WIDTH}px`;
        navbarRef.current.style.setProperty("left", `${MIN_SIDEBAR_WIDTH}px`);
        navbarRef.current.style.setProperty(
          "width",
          `calc(100% - ${MIN_SIDEBAR_WIDTH}px)`
        );
      }
    }
  };

  const handleRandomCard = () => {
    const randomIndex = Math.floor(Math.random() * gameMechanics.length);
    setCurrentCardIndex(randomIndex);
  };

  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(true);
      if (sidebarRef.current && navbarRef.current) {
        sidebarRef.current.style.width = "0px";
        navbarRef.current.style.setProperty("left", "0px");
        navbarRef.current.style.setProperty("width", "100%");
      }
      document.body.style.overflowX = "hidden";
    } else {
      setIsCollapsed(false);
      if (sidebarRef.current && navbarRef.current) {
        sidebarRef.current.style.width = `${MIN_SIDEBAR_WIDTH}px`;
        navbarRef.current.style.setProperty("left", `${MIN_SIDEBAR_WIDTH}px`);
        navbarRef.current.style.setProperty(
          "width",
          `calc(100% - ${MIN_SIDEBAR_WIDTH}px)`
        );
      }
      document.body.style.overflowX = "auto";
    }
  }, [isMobile]);

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          `group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999]`,
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        {/* a toggle button to switch between the list that fits more mechanics in one view vs card view that focuses on one mechanic in more detail   */}
        <div className="flex justify-center mt-16 mb-2">
          <ToggleGroup
            type="single"
            value={viewMode}
            onValueChange={(value) => {
              if (value === "list") {
                setViewMode("list");
              } else if (value === "card") {
                setViewMode("card");
              }
            }}
          >
            <ToggleGroupItem
              value="list"
              className={cn(
                "hover:bg-secondary/100 hover:text-gray-500 active:bg-secondary/20 active:border-secondary/100 border-2",
                viewMode === "list" && "bg-secondary/100 text-gray-500"
              )}
            >
              <List role="button" className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="card"
              className={cn(
                "hover:bg-secondary/100 hover:text-gray-500 active:bg-secondary/20 active:border-secondary/100 border-2",
                viewMode === "card" && "bg-secondary/100 text-gray-500"
              )}
            >
              <BookImage role="button" className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* Conditional rendering based on viewMode */}
        {viewMode === "list" ? (
          <div className="flex flex-col gap-4 p-4 overflow-y-auto">
            {gameMechanics
              .filter((mechanic) => !isTagHidden(mechanic.id))
              .map((mechanic) => (
                <GameMechanicCardSmall
                  key={mechanic.id}
                  title={mechanic.title}
                  category={mechanic.category}
                  description={mechanic.description}
                  onAdd={() =>
                    addTag({
                      id: mechanic.id,
                      title: mechanic.title,
                      description: "",
                      longDescription: mechanic.longDescription, // Pass longDescription
                      solvedProblems: mechanic.solvedProblems, // Pass solvedProblems
                    })
                  }
                />
              ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4 p-4">
            {gameMechanics
              .filter((mechanic) => !isTagHidden(mechanic.id))
              .map((mechanic, index) => (
                index === currentCardIndex && (
                  <GameMechanicCardLarge
                    key={mechanic.id}
                    title={mechanic.title}
                    category={mechanic.category}
                    longDescription={mechanic.longDescription}
                    timeToImplement={{ min: "1 hour", max: "3 hours" }}
                    onAdd={() =>
                      addTag({
                        id: mechanic.id,
                        title: mechanic.title,
                        description: "",
                        longDescription: mechanic.longDescription,
                        solvedProblems: mechanic.solvedProblems,
                      })
                    }
                  />
                )
              ))}
            <div className="flex justify-center items-center gap-4 mt-4">
              <button
                onClick={() => setCurrentCardIndex((prevIndex) => (prevIndex - 1 + gameMechanics.length) % gameMechanics.length)}
                className="flex items-center justify-center w-8 h-8 text-white bg-gray-600 rounded-full hover:bg-gray-800 transition duration-150 ease-in-out active:bg-gray-700"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={handleRandomCard}
                className="flex items-center justify-center w-8 h-8 text-white bg-gray-600 rounded-full hover:bg-gray-800 transition duration-150 ease-in-out active:bg-gray-700"
              >
                <Dices className="h-4 w-4" />
              </button>
              <button
                onClick={() => setCurrentCardIndex((prevIndex) => (prevIndex + 1) % gameMechanics.length)}
                className="flex items-center justify-center w-8 h-8 text-white bg-gray-600 rounded-full hover:bg-gray-800 transition duration-150 ease-in-out active:bg-gray-700"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* an info disclaimer about where our dataset came from and how you can contribure to it */}
        <div className="p-4 mt-8">
          <Info role="button" className="h-8 w-8" />
        </div>

        <div
          role="button"
          className={cn(
            `h-6 w-6 cursor-pointer text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100`,
            isMobile && "opacity-100"
          )}
        >
          <ChevronsLeft
            role="button"
            className="h-6 w-6 text-muted-foreground"
            onClick={handleChevronClick}
          />
        </div>
        <div
          onMouseDown={handleMouseDown}
          onClick={() => {}}
          className={`opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0`}
        />
      </aside>

      <div
        ref={navbarRef}
        className={cn(
          `absolute top-0 z-[99999] left-${MIN_SIDEBAR_WIDTH}px w-[calc(100%-${MIN_SIDEBAR_WIDTH}px)]`,
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full"
        )}
      >
        <nav className="bg-transparent px-3 py-2 w-full">
          {isCollapsed && (
            <MenuIcon
              role="button"
              className="h-6 w-6 text-muted-foreground cursor-pointer"
              onClick={handleMenuIconClick}
            />
          )}
        </nav>
      </div>
    </>
  );
};

export default MechanicsNav;
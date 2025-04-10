"use client";

import { cn } from "@/lib/utils";
import { ChevronsLeft, MenuIcon, List, BookImage } from "lucide-react";
import { ComponentRef, useRef, useState, useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import GameMechanicCardSmall from "./gameMechanicCardSmall";

interface MechanicsNavProps {
  gameMechanics: {
    id: string;
    title: string;
    category: string;
    description: string;
  }[];
}

const MIN_SIDEBAR_WIDTH = 309;

const MechanicsNav: React.FC<MechanicsNavProps> = ({ gameMechanics }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ComponentRef<"aside">>(null);
  const navbarRef = useRef<ComponentRef<"div">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

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

        <div className="flex justify-center mt-4">
          <ToggleGroup type="single">
          <ToggleGroupItem value="a">
            <List role="button" className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="b">
            <BookImage role="button" className="h-4 w-4" />
          </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="flex flex-col gap-4 p-4 overflow-y-auto">
          {gameMechanics.map((mechanic) => (
            <GameMechanicCardSmall
              key={mechanic.id}
              title={mechanic.title}
              category={mechanic.category}
              description={mechanic.description}
            />
          ))}
        </div>

        <div>
          Info Button will go here
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
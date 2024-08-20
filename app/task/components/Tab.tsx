"use client";

import React, { useState } from "react";

type TabProps = {
  content: React.ReactNode;
  onSplit: (direction: "down" | "up" | "left" | "right") => void;
  onClose: () => void;
};

const Tab: React.FC<TabProps> = ({ content, onSplit, onClose }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuPosition({ x: e.pageX, y: e.pageY });
    setShowMenu(true);
  };

  const handleMenuClick = (action: "down" | "up" | "left" | "right" | "close") => {
    if (action === "close") {
      onClose();
    } else {
      onSplit(action);
    }
    setShowMenu(false);
  };

  return (
    <div
      onContextMenu={handleRightClick}
      style={{ height: "100%", border: "1px solid black" }}
    >
      <div>{content}</div>
      {showMenu && (
        <ul
          style={{
            position: "absolute",
            top: menuPosition.y,
            left: menuPosition.x,
            backgroundColor: "white",
            border: "1px solid black",
            listStyleType: "none",
            padding: 0,
          }}
        >
          <li onClick={() => handleMenuClick("down")}>Split Down</li>
          <li onClick={() => handleMenuClick("up")}>Split Up</li>
          <li onClick={() => handleMenuClick("left")}>Split Left</li>
          <li onClick={() => handleMenuClick("right")}>Split Right</li>
          <li onClick={() => handleMenuClick("close")}>Close Tab</li>
        </ul>
      )}
    </div>
  );
};

export default Tab;

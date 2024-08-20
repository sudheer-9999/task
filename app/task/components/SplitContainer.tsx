"use client";

import React, { useState } from "react";
import Tab from "./Tab";

type Split = {
  direction: "down" | "up" | "left" | "right";
  id: number;
};

type SplitContainerProps = {
  content: React.ReactNode;
};

const SplitContainer: React.FC<SplitContainerProps> = ({ content }) => {
  const [splits, setSplits] = useState<Split[]>([]);

  const handleSplit = (direction: Split["direction"]) => {
    const id = Date.now();
    setSplits([...splits, { direction, id }]);
  };

  const handleClose = (id: number) => {
    setSplits(splits.filter((split) => split.id !== id));
  };

  const renderSplits = (
    currentContent: React.ReactNode,
    currentSplits: Split[]
  ) => {
    if (currentSplits.length === 0) {
      return (
        <Tab
          onClose={() => handleClose(0)}
          content={currentContent}
          onSplit={handleSplit}
        />
      );
    }

    const { direction, id } = currentSplits[0];
    const remainingSplits = currentSplits.slice(1);

    const splitStyle: React.CSSProperties = (() => {
      switch (direction) {
        case "down":
          return { flexDirection: "column" };
        case "up":
          return { flexDirection: "column-reverse" };
        case "left":
          return { flexDirection: "row-reverse" };
        case "right":
          return { flexDirection: "row" };
        default:
          return {};
      }
    })();

    return (
      <div
        key={id}
        style={{
          display: "flex",
          ...splitStyle,
          height: "100%",
          width: "100%",
        }}
      >
        <div style={{ flex: 1, border: "1px solid black", margin: "5px" }}>
          {renderSplits(currentContent, remainingSplits)}
        </div>
        <div style={{ flex: 1, border: "1px solid black", margin: "5px" }}>
          <Tab
            content={currentContent}
            onSplit={handleSplit}
            onClose={() => handleClose(id)}
          />
        </div>
      </div>
    );
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      {renderSplits(content, splits)}
    </div>
  );
};

export default SplitContainer;

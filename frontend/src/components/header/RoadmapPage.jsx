import React from "react";
import { useParams } from "react-router-dom";
import roadmaps from "./roadmap.json";

const RoadmapPage = () => {
  const { roadmapName } = useParams();
  const roadmap = roadmaps[roadmapName];

  return (
    <div style={{ padding: "20px" }}>
      {roadmap ? (
        <>
          <h2>Roadmap for {roadmapName}</h2>
          {roadmap.stages.map((stage, index) => (
            <div key={index}>
              <h3>{stage.stage}</h3>
              <ul>
                {stage.skills.map((skill, idx) => (
                  <li key={idx}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </>
      ) : roadmapName === "not-found" ? (
        <div style={{ textAlign: "center", color: "red", fontSize: "18px" }}>
          No roadmap found for "{roadmapName}". Please try searching for a different roadmap.
        </div>
      ) : (
        <div style={{ textAlign: "center", color: "red", fontSize: "18px" }}>
          The roadmap you're looking for is not available.
        </div>
      )}
    </div>
  );
};

export default RoadmapPage;

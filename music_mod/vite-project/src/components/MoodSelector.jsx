import React from "react";

const moods = [
  {
    name: "Happy",
    color: "#ffe066",
    message: "You look cheerful!",
    audio: ["/songs/Happy.mp3", "/songs/happy2.mp3"],
  },
  {
    name: "Sad",
    color: "#74c0fc",
    message: "It's okay to feel sad.",
    audio: ["/songs/sad.mp3", "/songs/sad2.mp3"],
  },
  {
    name: "Angry",
    color: "#ff6b6b",
    message: "Take a deep breath.",
    audio: ["/songs/Angry.mp3"],
  },
  {
    name: "Relaxed",
    color: "#b2f2bb",
    message: "Chill vibes only.",
    audio: ["/songs/sad.mp3", "/songs/relax2.mp3", "/songs/relax3.mp3"],
  },
];

const MoodSelector = ({ onMoodChange }) => {
  return (
    <div className="mood-buttons">
      {moods.map((mood) => (
        <button
          key={mood.name}
          style={{ backgroundColor: mood ? mood.color : "#ffffff" }}
          onClick={() => onMoodChange(mood)}
        >
          {mood.name}
        </button>
      ))}
    </div>
  );
};

export default MoodSelector;

import React, { useEffect, useRef, useState } from "react";
import MoodSelector from "../components/MoodSelector";

import axios from "axios";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [mood, setMood] = useState("");
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef(null);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true; // Ensure cookies are sent with requests
  useEffect(() => {
    axios
      .get("https://mood-music-aaib.onrender.com/")
      .then((res) => {
        console.log(res);
        if (res.data !== "Success") {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    if (mood && mood.audio.length > 0) {
      setCurrentSongIndex(0);
    }
  }, [mood]);

  useEffect(() => {
    if (mood && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.play().catch((err) => {
        console.log("Autoplay error:", err);
      });
    }
  }, [currentSongIndex, mood]);

  const handleNext = () => {
    if (mood && currentSongIndex < mood.audio.length - 1) {
      setCurrentSongIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (mood && currentSongIndex > 0) {
      setCurrentSongIndex((prev) => prev - 1);
    }
  };

  return (
    <div
      className="App"
      style={{
        backgroundColor: mood?.color || "#ffffff",
        padding: "20px",
        minHeight: "100vh",
        transition: "background-color 0.5s ease",
      }}
      // backgroundColor: mood?.color || "#ffffff"
      // mood?.color → if mood exists, use mood.color, otherwise return undefined

      // || "#ffffff" → if left side is undefined or null or false, use "#ffffff"
    >
      <h1>Mood-Based Music App</h1>
      <MoodSelector onMoodChange={setMood} />

      {mood && (
        <>
          <p className="message">{mood.message}</p>
          <p>
            Now playing:{" "}
            <strong>
              {mood.audio[currentSongIndex]
                .split("/")
                .pop()
                .replace(".mp3", "")}
            </strong>
          </p>

          <audio ref={audioRef} controls>
            <source src={mood.audio[currentSongIndex]} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>

          <div style={{ marginTop: "10px" }}>
            <button onClick={handlePrev} disabled={currentSongIndex === 0}>
              ⏮️ Prev
            </button>
            <button
              onClick={handleNext}
              disabled={currentSongIndex === mood.audio.length - 1}
              style={{ marginLeft: "10px" }}
            >
              ⏭️ Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;

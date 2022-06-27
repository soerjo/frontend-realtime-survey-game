import React from "react";
import "../styles/App.css";
import bg_music from "../assets/music/bg_music.mp3";
import ReactAudioPlayer from "react-audio-player";

type DefaulProps = {
  children: React.ReactNode;
};

const Default: React.FC<DefaulProps> = ({ children }) => {
  return (
    <div className="App">
      <ReactAudioPlayer
        src={bg_music}
        className="absolute z-20"
        autoPlay
        volume={0.5}
        loop
      ></ReactAudioPlayer>
      <div className="absolute top-0 bottom-0 left-0 right-0 bg-slate-200 bg-opacity-10 z-0"></div>
      <div className="flex z-20">{children}</div>
    </div>
  );
};

export default Default;

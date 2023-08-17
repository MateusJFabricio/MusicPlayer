import React from "react";
import "./MediaBar.css";
import albumPicture from "../assets/akon-album.jpg"
import nextIcon from "../assets/next.png"
import playIcon from "../assets/play.png"

const MediaBar = () => {
  return (
    <div className="media-bar">
      <div className="progress-bar">
        <div className="text-wrapper">02:56</div>
        <div className="frame">
          <div className="overlap-group"></div>
        </div>
        <div className="text-wrapper">03:56</div>
      </div>
      <div className="music-controls">
            <div className="music-details">
                <div className="album-picture-container">
                  <img className="album-picture" alt="Album" src={albumPicture} />
                </div>
                <div className="music-details-info">
                  <p>Gangsta Bop</p>
                  <p>Akon</p>
                </div>
            </div>
            <div className="controls">
              <div className="play">
                <img alt="Play Music" src={playIcon}/>
              </div>
              <div className="next">
                <div className="overlap-group-2">
                  <img alt="Next Music" src={nextIcon} />
                </div>
              </div>
            </div>
      </div>
    </div>
  );
};

export default MediaBar;
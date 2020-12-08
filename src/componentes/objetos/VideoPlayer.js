import React, { useState, useEffect, Component } from "react";
import { View, Text } from "react-native";
import {windowWidth as width, windowHeight as height} from "../../utils/Dimentions";
import { Video } from "expo-av";
import styled from "styled-components/native";

const Play = Video; //styled(Video)` `
const Poster = styled.ImageBackground`
  width: 100%;
  top: 0px;
  left: 0px;
  flex: 1;
`;

const VideoPlayer = (props) => {
  const [count, setCount] = useState(0);
  const [playbackObject, setPlaybackObject] = useState(null);

  const _replayVideo = async () => {
    try {
      playbackObject.replayAsync({
        progressUpdateIntervalMillis: 5000,
        positionMillis: 0,
        shouldPlay: true,
        rate: 1.0,
        shouldCorrectPitch: false,
        volume: 1.0,
        isMuted: false,
        isLooping: true,
      });
      console.log(">VideoPlayer_replayVideo>", "ok");
    } catch (e) {
      console.log(">VideoPlayer_replayVideo>", e);
    }
  };

  useEffect(() => {
    if (props.reiniciar && props.video && props.isPlay) {
     
      _replayVideo();
    }
  }, [props.video, props.isPlay, props.reiniciar, props.xkey]);

  return props.video ? (
    <Play
      key={props.xkey}
      ref={(e) => {
        setPlaybackObject(null);
        setPlaybackObject(e);
      }}
      source={{
        uri: props.video,
      }}
      rate={1.0}
      volume={1.0}
      isMuted={false}
      resizeMode="cover"
      shouldPlay={props.isPlay}
      pause={() => {
        !props.isPlay;
      }}
      isLooping
      onEnd={() => {
        console.log("Done!");
      }}
      useNativeControls={props.control}
      usePoster={true}
      posterSource={{
        uri: props.poster,
      }}
      posterStyle={{
        // flex: 1,
        width: width,
        height: props.height,
      }}
      style={{
        backgroundColor: "#000",
        width: width,
        height: props.height,
 
      }}
  
      onReadyForDisplay={() => {
        console.log(">VideoPlayer>onReadyForDisplay",props.xkey,'--' ,props.video);
      }}
    />
  ) : (
    <Poster
      key={props.key}
      source={{
        uri: props.poster,
      }}
    />
  );
};
export default VideoPlayer;

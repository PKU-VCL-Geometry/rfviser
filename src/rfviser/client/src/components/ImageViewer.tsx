import { Box, Text, Image, Center } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { ErrorBoundary } from "react-error-boundary";
import { GuiAddImageViewerMessage } from "../WebsocketMessages";
import { ViewerContext } from "../App";
import React from "react";
import { Matrix4, Vector3 } from "three";
import classes from './ImageViewer.module.css';
import { computeT_threeworld_world } from "../WorldTransformUtils";

export default function ImageViewerComponent({
  visible,
  images
}: GuiAddImageViewerMessage) {

  const imageEntries = visible ? Object.entries(images) : [];
  const viewer = React.useContext(ViewerContext)!;

  const cameras = imageEntries.map((imageItem) => imageItem[1][1]);
  const slides = imageEntries.map((imageItem, index) => {
    const [imageName, imageInfo] = imageItem;
    return (
      <Carousel.Slide key={index}>
        <ErrorBoundary fallback={<Text ta="center" size="sm">Images Failed to Render</Text>}>
          <Image
            src={`data:image/jpeg;base64,${imageInfo[0]}`}
            alt={imageName}
            fit="contain"
            style={{ maxWidth: '100%', maxHeight: '500px' }}
          />
        </ErrorBoundary>
        <Center><Text>{imageName}</Text></Center>
      </Carousel.Slide>
    );
  });

  const onChange = (index: number) => {
    if (cameras && cameras[index] && cameras[index].length == 16) {
      const c2w = (new Matrix4()).fromArray(cameras[index]);
      const T_threeworld_world = computeT_threeworld_world(viewer);
      const eye = (new Vector3(0, 0, 0)).applyMatrix4(c2w).applyMatrix4(T_threeworld_world);
      const target = (new Vector3(0, 0, 0.1)).applyMatrix4(c2w).applyMatrix4(T_threeworld_world);
      const cameraControls = viewer.cameraControlRef.current!;
      cameraControls.setLookAt(
        eye.x,
        eye.y,
        eye.z,
        target.x,
        target.y,
        target.z,
        true
      );
    }
  };

  setTimeout(() => window.dispatchEvent(new Event('resize')), 100);

  return (
    <Box pb="xs" px="sm">
      <Carousel
        initialSlide={0}
        slideSize="80%"
        draggable={false}
        slideGap="md"
        align="center"
        onSlideChange={onChange}
        classNames={classes}
        inViewThreshold={0.5}
        withKeyboardEvents={false}
      >
        {slides}
      </Carousel>
    </Box>
  );
}

/**
 * Copyright (c) JOB TODAY S.A. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React, { useState } from "react";
import {
  Alert,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  ScrollView,
} from "react-native";
import get from "lodash/get";
import memoize from "lodash/memoize";

import ImageViewing from "react-native-image-viewing";
import ImageList from "./ImageList";
import ImageHeader from "./ImageHeader";
import ImageFooter from "./ImageFooter";

import { architecture } from "../../data/architecture";
import { travel } from "../../data/travel";
import { city } from "../../data/city";
import { food } from "../../data/food";
import { COLORS } from "../../constants";

export default function GalleryView({ theme, item }) {
  const [currentImageIndex, setImageIndex] = useState(0);
  const [images, setImages] = useState(architecture);
  const [isVisible, setIsVisible] = useState(false);

  const getImages = () => {
    let n = item.images.length;
    let result = [];
    for (let i = 0; i < n; i += 6) {
      let arr = item.images.slice(i, i + 6);
      result.push(arr);
    }

    return result;
  };

  const onSelect = (images, index) => {
    setImageIndex(index);
    setImages(images);
    setIsVisible(true);
  };

  const onRequestClose = () => setIsVisible(false);

  const getImageSource = memoize((images) =>
    images.map(
      (image) => ({
        uri: image,
      })
      // typeof image.original === "number"
      //   ? image.original
      //   : { uri: image.original }
    )
  );

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView>
        {getImages().map((i, idx) => {
          return (
            <View style={{ marginVertical: 5 }} key={idx}>
              <ImageList
                images={i.map((image) => image)}
                onPress={(index) => onSelect(i, index)}
                shift={Math.random()}
              />
            </View>
          );
        })}
      </ScrollView>
      <ImageViewing
        images={getImageSource(images)}
        imageIndex={currentImageIndex}
        presentationStyle="overFullScreen"
        visible={isVisible}
        onRequestClose={onRequestClose}
        // HeaderComponent={
        //   images === travel
        //     ? ({ imageIndex }) => {
        //         const title = get(images, `${imageIndex}.title`);
        //         return (
        //           <ImageHeader title={title} onRequestClose={onRequestClose} />
        //         );
        //       }
        //     : undefined
        // }
        FooterComponent={({ imageIndex }) => (
          <ImageFooter imageIndex={imageIndex} imagesCount={images.length} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: (theme) =>
      theme.name === "dark" ? COLORS.darkPurple : COLORS.white1,
    ...Platform.select({
      android: { paddingTop: StatusBar.currentHeight },
      default: null,
    }),
  },
  about: {
    flex: 1,
    marginTop: -12,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "200",
    color: "#FFFFFFEE",
  },
});

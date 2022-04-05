import React from "react";
import {
  theme,
  eyesMap,
  eyebrowsMap,
  mouthsMap,
  hairMap,
  facialHairMap,
  accessoryMap,
  graphicsMap,
  hatMap,
  bodyMap,
  clothingMap,
  BigHead,
} from "@bigheads/core";

function RandomAvatar() {
  const selectRandomKey = (object) => {
    return Object.keys(object)[
      Math.floor(Math.random() * Object.keys(object).length)
    ];
  };

  const skinTone = selectRandomKey(theme.colors.skin);
  const eyes = selectRandomKey(eyesMap);
  const eyebrows = selectRandomKey(eyebrowsMap);
  const mouth = selectRandomKey(mouthsMap);
  const hair = selectRandomKey(hairMap);
  const facialHair = selectRandomKey(facialHairMap);
  const clothing = selectRandomKey(clothingMap);
  const accessory = selectRandomKey(accessoryMap);
  const graphic = selectRandomKey(graphicsMap);
  const hat = selectRandomKey(hatMap);
  const hairColor = selectRandomKey(theme.colors.hair);
  const clothingColor = selectRandomKey(theme.colors.clothing);
  const circleColor = selectRandomKey(theme.colors.bgColors);
  const lipColor = selectRandomKey(theme.colors.lipColors);
  const hatColor = selectRandomKey(theme.colors.clothing);
  const faceMaskColor = selectRandomKey(theme.colors.clothing);
  const mask = true;
  const faceMask = false;
  const lashes = false;
  const body = "chest";

  return (
    <>
      <BigHead
        skinTone={skinTone}
        eyes={eyes}
        eyebrows={eyebrows}
        mouth={mouth}
        hair={hair}
        facialHair={facialHair}
        clothing={clothing}
        accessory={accessory}
        graphic={graphic}
        hat={hat}
        body={body}
        hairColor={hairColor}
        clothingColor={clothingColor}
        circleColor={circleColor}
        lipColor={lipColor}
        hatColor={hatColor}
        faceMaskColor={faceMaskColor}
        mask={mask}
        faceMask={faceMask}
        lashes={lashes}
      />
      <input
        id="properties"
        hidden
        value={[
          skinTone,
          eyes,
          eyebrows,
          mouth,
          hair,
          facialHair,
          clothing,
          accessory,
          graphic,
          hat,
          body,
          hairColor,
          clothingColor,
          circleColor,
          lipColor,
          hatColor,
          faceMaskColor,
          mask,
          faceMask,
          lashes,
        ]}
      />
    </>
  );
}

export default RandomAvatar;

import React, { ReactNode } from "react";
import { useTheme, View } from "vcc-ui";

import styles from "./Carousel.module.css";

export interface ICarouselItemProps {
  children: ReactNode;
}

export const CarouselItem = ({ children }: ICarouselItemProps) => {
  return (
    <View
      display="inline-flex"
      justifyContent="center"
      padding={1}
      className={styles.carouselItem}
      extend={{
        untilL: {
          width: "75%",
        },
        fromL: {
          width: "25%",
        },
      }}
    >
      {children}
    </View>
  );
};

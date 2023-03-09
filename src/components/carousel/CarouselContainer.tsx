import React, { ReactElement, Children, useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { IconButton, Spacer, View } from "vcc-ui";

import styles from "./Carousel.module.css";
import { ICarouselItemProps } from "./CarouselItem";

interface ICarouselProps {
  children: ReactElement<ICarouselItemProps>[];
}

export const CarouselContainer = ({ children }: ICarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [width, setWidth] = useState<number>(window.innerWidth);
  const isMobile = width <= 768;

  const updateIndex = (newIndex: number) => {
    if (newIndex < 0) {
      newIndex = 0;
    }
    if (newIndex > React.Children.count(children) - 1) {
      newIndex = React.Children.count(children) - 1;
    }
    setActiveIndex(newIndex);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => updateIndex(activeIndex + 1),
    onSwipedRight: () => updateIndex(activeIndex - 1),
  });

  const getTranslateX = (index: number) => {
    return `translateX(-${isMobile ? index * 75 : index * 100}%)`;
  };

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  if (isMobile) {
    if (activeIndex > React.Children.count(children) - 1) {
      updateIndex(0);
    }
  } else {
    if (activeIndex * 4 > React.Children.count(children) - 1) {
      updateIndex(0);
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return (
    <div {...handlers} className={styles.carousel}>
      <div
        className={styles.inner}
        style={{ transform: getTranslateX(activeIndex) }}
      >
        {Children.map(children, (child) => React.cloneElement(child))}
      </div>
      {isMobile ? (
        <div className={styles.indicators}>
          {React.Children.map(children, (_child, index) => {
            const className =
              index === activeIndex
                ? `${styles.dot} ${styles.active}`
                : styles.dot;
            return (
              <div className={className} onClick={() => updateIndex(index)} />
            );
          })}
        </div>
      ) : (
        <View
          direction={"row"}
          width="100%"
          justifyContent="flex-end"
          paddingTop={4}
        >
          <IconButton
            onClick={() => updateIndex(activeIndex - 1)}
            disabled={activeIndex === 0}
            iconName="navigation-chevronback"
            variant="outline"
          />
          <Spacer />
          <IconButton
            onClick={() => updateIndex(activeIndex + 1)}
            disabled={(activeIndex + 1) * 4 >= children.length}
            iconName="navigation-chevronforward"
            variant="outline"
          />
        </View>
      )}
    </div>
  );
};

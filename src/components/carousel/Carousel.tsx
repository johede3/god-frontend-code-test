import React, { useEffect, useState } from "react";
import { View, Link, Text } from "vcc-ui";
import { carData } from "../../models/car/car";
import { CarouselContainer } from "./CarouselContainer";
import { CarouselItem } from "./CarouselItem";

interface ICarouselProps {
  cars: carData[];
}

export default function Carousel({ cars }: ICarouselProps) {
  const [width, setWidth] = useState<number>(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;

  return (
    <CarouselContainer>
      {cars.map((car) => {
        return (
          <CarouselItem key={car.id}>
            <View
              direction={"column"}
              extend={{ whiteSpace: "break-spaces" }}
              alignItems="flex-start"
            >
              <Text
                extend={{ color: "rgba(0, 0, 0, 0.56)" }}
                subStyle="emphasis"
                variant="amundsen"
              >
                {car.bodyType}
              </Text>
              <Text subStyle="emphasis" variant="hillary">
                {car.modelName}{" "}
                <Text
                  extend={{ color: "rgba(0, 0, 0, 0.56)" }}
                  variant="hillary"
                  subStyle="standard"
                >
                  {isMobile && <br />}
                  {car.modelType}
                </Text>
              </Text>
            </View>

            <img alt="aa" src={car.imageUrl} />
            <View spacing={4} justifyContent="center" direction="row">
              <Link arrow="right" href={`/learn/${car.id}`}>
                Learn
              </Link>
              <Link arrow="right" href={`/shop/${car.id}`}>
                Shop
              </Link>
            </View>
          </CarouselItem>
        );
      })}
    </CarouselContainer>
  );
}

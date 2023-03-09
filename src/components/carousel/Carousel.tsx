import React from "react";
import { carData } from "../../models/car/car";
import CarInfo from "../carInformation";
import { CarouselContainer } from "./CarouselContainer";
import { CarouselItem } from "./CarouselItem";

interface ICarouselProps {
  cars: carData[];
}

export default function Carousel({ cars }: ICarouselProps) {
  return (
    <CarouselContainer>
      {cars.map((car) => {
        return (
          <CarouselItem key={car.id}>
            <CarInfo car={car} />
          </CarouselItem>
        );
      })}
    </CarouselContainer>
  );
}

import React, { useEffect, useState } from "react";
import { View, Link, Text } from "vcc-ui";
import { carData } from "../../models";

interface ICarInfoProps {
  car: carData;
}

export default function CarInfo({ car }: ICarInfoProps) {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const isMobile = width <= 768;

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return (
    <>
      <View
        marginBottom={2}
        direction={"column"}
        alignItems="flex-start"
        extend={{ whiteSpace: "break-spaces" }}
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
      <img alt={car.modelName} src={car.imageUrl} />
      <View spacing={4} justifyContent="center" direction="row">
        <Link arrow="right" href={`/learn/${car.id}`}>
          Learn
        </Link>
        <Link arrow="right" href={`/shop/${car.id}`}>
          Shop
        </Link>
      </View>
    </>
  );
}

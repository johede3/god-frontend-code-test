import React, { useEffect, useState } from "react";
import { Block, Spinner, TabNav, TabNavItem } from "vcc-ui";
import { Carousel } from "../src/components";

import { carData } from "../src/models";

export const HomePage: React.FC = () => {
  const [activeBodyType, setActiveBodyType] = React.useState("Show all cars");
  const [data, setData] = useState<carData[]>();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/cars.json")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <Spinner size={24} />;
  if (!data) return <p>No car data found</p>;

  const uniqueArr: string[] = [];
  uniqueArr.push("Show all cars");
  for (const item of data) {
    if (!uniqueArr.includes(item.bodyType)) {
      uniqueArr.push(item.bodyType);
    }
  }

  return (
    <Block>
      <TabNav textAlign="center">
        {uniqueArr.map((bodyType) => {
          return (
            <TabNavItem
              key={bodyType}
              isActive={bodyType === activeBodyType}
              onClick={() => setActiveBodyType(bodyType)}
            >
              {bodyType}
            </TabNavItem>
          );
        })}
      </TabNav>
      <Carousel
        cars={
          activeBodyType !== "Show all cars"
            ? data.filter((car) => car.bodyType === activeBodyType)
            : data
        }
      />
    </Block>
  );
};

export default HomePage;

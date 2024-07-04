import React, { createContext, useContext } from "react";

// types
import { IMemberBase, IMemberDimensions, IQueryExplore } from "@src/types/query-builder";

// mocks
import { availableDimensionsMocks, availableMeasuresMocks } from "@src/mocks/explore-builder-mock";

export const WarehouseContext = createContext({} as any);

type IProps = {
  children: React.ReactNode;
};

export const WareHouseContextProvider: React.FC<IProps> = ({ children }) => {
  // states
  const [queryExplore, setQueryExplore] = React.useState<IQueryExplore>({
    dimensions: [],
    measures: [],
    order: [],
  });
  const [dimensions, setDimensions] = React.useState<IMemberDimensions[]>([]);
  const [measures, setMeasures] = React.useState<IMemberBase[]>([]);
  const [orders, setOrders] = React.useState<string[][]>([]);

  React.useEffect(() => {
    setQueryExplore({
      dimensions: dimensions.map((d) => d.name),
      measures: measures.map((m) => m.name),
      order: orders,
    });
  }, [dimensions, measures, orders]);

  return (
    <WarehouseContext.Provider
      value={{
        availableDimensions: availableDimensionsMocks,
        availableMeasures: availableMeasuresMocks,
        dimensions,
        measures,
        queryExplore,
        setMeasures,
        setDimensions,
        orders,
        setOrders,
      }}
    >
      {children}
    </WarehouseContext.Provider>
  );
};

export const useWarehouseContext = () => useContext(WarehouseContext);

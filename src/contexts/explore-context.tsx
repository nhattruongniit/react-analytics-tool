import React from "react";
import { createContext, useContext } from "react";

// mocks
import { availableDimensionsMocks, availableMeasuresMocks } from "@src/mocks/explore-builder-mock";

// types
import { IMemberBase, IMemberDimensions, IQueryExplore } from "@src/types/query-builder";
import { useAppContext } from "./app-context";

export const ExploreContext = createContext({} as any);

type IProps = {
  children: React.ReactNode;
};

export const ExploreContextProvider: React.FC<IProps> = ({ children }) => {
  // context
  const { chartDefault } = useAppContext();
  // states
  const [queryExplore, setQueryExplore] = React.useState<IQueryExplore>({
    dimensions: [],
    measures: [],
    order: [],
  });
  const [dimensions, setDimensions] = React.useState<IMemberDimensions[]>([]);
  const [measures, setMeasures] = React.useState<IMemberBase[]>([]);
  const [orders, setOrders] = React.useState<string[][]>([]);

  // set query explore
  React.useEffect(() => {
    if (!chartDefault) return;
    setDimensions(availableDimensionsMocks.filter((d) => chartDefault.vizState.query.dimensions.includes(d.name)));
    setMeasures(availableMeasuresMocks.filter((m) => chartDefault.vizState.query.measures.includes(m.name)));
    setOrders(chartDefault.vizState.query.order);
  }, [chartDefault]);

  React.useEffect(() => {
    setQueryExplore({
      dimensions: dimensions.map((d) => d.name),
      measures: measures.map((m) => m.name),
      order: orders,
    });
  }, [dimensions, measures, orders]);

  return (
    <ExploreContext.Provider
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
    </ExploreContext.Provider>
  );
};

export const useExploreContext = () => useContext(ExploreContext);

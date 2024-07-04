import React, { createContext, PropsWithChildren, useContext } from "react";

// types
import { IChart, IChartProduct } from "@src/types/chart";

// hooks
import { useLocalStorage } from "@src/hooks/use-localstorage";
import { NAME_STORAGE } from "@src/config/storage";

// mocks
import { tablePivot, tableColumns } from "@src/mocks/table-chart-mock";

type AppContextType = {
  charts: IChartProduct | null;
  chartDefault: IChart | null;
  isOpenExploreModal: boolean;
  isDisableDragGrid: boolean;
  defaultQuery: any;
  runOnceEditOrder: React.MutableRefObject<boolean>;
  isStartEditOrder: boolean;
  addChart: (query: IChart) => void;
  editChart: (query: IChart) => void;
  deleteChart: (chartId: number) => void;
  changeChartType: (chartType: string, chartId: number) => void;
  setCharts: React.Dispatch<React.SetStateAction<IChartProduct | null>>;
  setChartDefault: React.Dispatch<React.SetStateAction<IChart | null>>;
  setIsOpenExploreModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDisableDragGrid: React.Dispatch<React.SetStateAction<boolean>>;
  setDefaultQuery: React.Dispatch<React.SetStateAction<any>>;
  setIsStartEditOrder: React.Dispatch<React.SetStateAction<boolean>>;
  // mock data
  tablePivot: any;
  tableColumns: any;
};

export const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  // refs
  const runOnceEditOrder = React.useRef(true);
  // storage
  const [chartStorage, setChartStorage] = useLocalStorage<IChartProduct | null>(NAME_STORAGE.CHARTS, null);
  // states
  const [isStartEditOrder, setIsStartEditOrder] = React.useState(false);
  const [isOpenExploreModal, setIsOpenExploreModal] = React.useState(false);
  const [defaultQuery, setDefaultQuery] = React.useState({});
  const [charts, setCharts] = React.useState<IChartProduct | null>(null);
  const [chartDefault, setChartDefault] = React.useState<IChart | null>(null);
  const [isDisableDragGrid, setIsDisableDragGrid] = React.useState(false);

  // initialize apps once time from local storage
  React.useEffect(() => {
    if (chartStorage) {
      setCharts(chartStorage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // save actions chart to local storage
  React.useEffect(() => {
    setChartStorage(charts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charts]);

  function addChart(chart: IChart) {
    const newChart = {
      ...charts,
      [chart.id]: chart,
    };
    setCharts(newChart);
  }

  function editChart(chart: IChart) {
    const newChart = {
      ...charts,
      [chart.id]: chart,
    };
    setCharts(newChart);
  }

  function deleteChart(chartId: number) {
    if (!charts) return;
    delete charts[chartId];
    setCharts(charts);
  }

  function changeChartType(chartType: string, chartId: number) {
    if (!charts) return;
    const newChart = {
      ...charts,
      [chartId]: {
        ...charts[chartId],
        vizState: {
          ...charts[chartId].vizState,
          chartType,
        },
      },
    };
    setCharts(newChart);
  }

  return (
    <AppContext.Provider
      value={{
        // states
        charts,
        isOpenExploreModal,
        isDisableDragGrid,
        defaultQuery,
        runOnceEditOrder,
        isStartEditOrder,
        // actions
        addChart,
        editChart,
        deleteChart,
        changeChartType,
        setCharts,
        chartDefault,
        setChartDefault,
        setIsOpenExploreModal,
        setIsDisableDragGrid,
        setDefaultQuery,
        setIsStartEditOrder,

        // mock data
        tablePivot,
        tableColumns,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

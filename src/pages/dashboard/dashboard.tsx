// context
import { ExploreContextProvider } from "@src/contexts/explore-context";

// components
import ExploreQuery from "./components/explore-builder";
import GridLayout from "./components/grid-layout";

function Dashboard() {
  return (
    <>
      <ExploreContextProvider>
        <ExploreQuery />
        <GridLayout />
      </ExploreContextProvider>
    </>
  );
}

export default Dashboard;

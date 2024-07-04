import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { Dashboard } from "@src/pages/dashboard";

describe("Dashboard", () => {
  it("should render the heading", () => {
    // when
    render(<Dashboard />);

    // then
    expect(screen.getByText("Tailwind css")).toBeInTheDocument();
  });
});

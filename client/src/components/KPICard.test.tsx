import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import KPICard from "../components/KPICard";
import { Users } from "lucide-react";

describe("KPICard Component", () => {
  it("renders correctly with given props", () => {
    render(
      <KPICard
        title="Total Resources"
        value={150}
        icon={Users}
        trend="up"
        trendValue="+12%"
        color="blue"
      />,
    );

    expect(screen.getByText("Total Resources")).toBeInTheDocument();
    expect(screen.getByText("150")).toBeInTheDocument();
  });
});

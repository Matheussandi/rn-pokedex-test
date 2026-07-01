import { fireEvent, render, screen } from "@testing-library/react-native";

import { DetailTabs } from "./detail-tabs";

describe("DetailTabs", () => {
  it("renderiza as labels das abas", async () => {
    await render(
      <DetailTabs activeTab="about" onTabChange={() => {}} tabWidth={120} />,
    );

    expect(screen.getByText("Sobre")).toBeOnTheScreen();
    expect(screen.getByText("Status")).toBeOnTheScreen();
  });

  it("chama onTabChange com a key da aba pressionada", async () => {
    const onTabChange = jest.fn();

    await render(
      <DetailTabs
        activeTab="about"
        onTabChange={onTabChange}
        tabWidth={120}
      />,
    );

    fireEvent.press(screen.getByText("Status"));

    expect(onTabChange).toHaveBeenCalledWith("stats");
  });
});

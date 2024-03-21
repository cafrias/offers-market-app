import { fireEvent, render, screen } from "@testing-library/react-native";

import { PaginationControls } from "./PaginationControls";

describe(PaginationControls.name, () => {
  it("displays the current page", () => {
    render(
      <PaginationControls
        current={1}
        total={10}
        onNext={() => {}}
        onPrev={() => {}}
      />,
    );
    expect(screen.getByText(/page 1 of 10/i)).toBeOnTheScreen();
  });

  it("on first page", () => {
    const onNext = jest.fn();
    render(
      <PaginationControls
        current={1}
        total={10}
        onNext={onNext}
        onPrev={() => {}}
      />,
    );

    expect(
      screen.queryByRole("button", { name: /Previous Page/i }),
    ).not.toBeOnTheScreen();

    const nextBtn = screen.queryByRole("button", { name: /Next Page/i });
    expect(nextBtn).toBeOnTheScreen();

    fireEvent.press(nextBtn);

    expect(onNext).toHaveBeenCalled();
  });

  it("on last page", () => {
    const onPrev = jest.fn();
    render(
      <PaginationControls
        current={10}
        total={10}
        onNext={() => {}}
        onPrev={onPrev}
      />,
    );

    expect(
      screen.queryByRole("button", { name: /Next Page/i }),
    ).not.toBeOnTheScreen();

    const prevBtn = screen.queryByRole("button", { name: /Previous Page/i });
    expect(prevBtn).toBeOnTheScreen();

    fireEvent.press(prevBtn);

    expect(onPrev).toHaveBeenCalled();
  });
});

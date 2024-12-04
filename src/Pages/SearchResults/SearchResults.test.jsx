import React from "react";
import {render, fireEvent, screen} from "@testing-library/react";
import SearchResults from "./SearchResults";

test('calls onClick handler when clicked', () =>{
    const handleFilter = jest.fn();

    render(<button onClick={handleFilter} />);

    const button = queryByText("All");

    fireEvent.click(button);
    expect(handleFilter).toHaveBeenCalledTimes(1);
});
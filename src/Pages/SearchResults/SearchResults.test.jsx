import React from "react";
import {render, fireEvent} from "@testing-library/react";
import SearchResults from "./SearchResults";

describe(SearchResults, ( ) => {
    const handleFilter = jest.fn();

    const button = queryByText("All");
    fireEvent.click(button);

    expect(handleFilter).toHaveBeenCalledTimes(1);
});
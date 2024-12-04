import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SearchResults from "./SearchResults";

const results = [
  { id: 1, subject: 'Mathematics', title: 'Mathematics tutor' },
  { id: 2, subject: 'Physics', title: 'Physics tutor' },
];

describe('SearchResults', () => {
  test('filters results when button is clicked', () => {
    render(
      <MemoryRouter>
        <SearchResults results={results} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('All'));
    
    // Use getAllByText to verify all Mathematics tutors are present
    const elements = screen.getAllByText('Mathematics tutor');
    expect(elements.length).toBeGreaterThan(0);
  });
});

import React from "react";
import {render, fireEvent, screen} from "@testing-library/react";
import SearchResults from "./SearchResults";

const results =[
    {name: 'Mathematics Result 1', category: 'Mathematics'},
    {name: 'Mathematics Result 2', category: 'Mathematics'},
    {name: 'Comp. Science Result 1', category: 'Comp. Science'},
    {name: 'Comp. Science Result 2', category: 'Comp. Science'},
    {name: 'Physics Result 1', category: 'Physics'},
    {name: 'Physics Result 2', catgeory: 'Physics'},
    {name: 'Chemistry Result 1', category: 'Chemistry'},
    {name: 'Chemistry Result 2', category: 'Chemistry'},
    {name: 'Biology Result 1', category: 'Biology'},
    {name: 'Biology Result 2', category: 'Biology'}
];
describe('SearchResults', () => {
    test('filters results when button is clicked', () =>{
        render(<SearchResults results={results} />);

        fireEvent.click(screen.getByText('All'));
        expect(screen.getByText('Mathematics Result 1')).toBeInTheDocument();
        expect(screen.getByText('Mathematics Result 2')).toBeInTheDocument();
        expect(screen.getByText('Comp. Science Result 1')).toBeInTheDocument();
        expect(screen.getByText('Comp. Science Result 2')).toBeInTheDocument();
        expect(screen.getByText('Physics Result 1')).toBeInTheDocument();
        expect(screen.getByText('Physics Result 2')).toBeInTheDocument();
        expect(screen.getByText('Chemistry Result 1')).toBeInTheDocument();
        expect(screen.getByText('Chemistry Result 2')).toBeInTheDocument();
        expect(screen.getByText('Biology Result 1')).toBeInTheDocument();
        expect(screen.getByText('Biology Result 2')).toBeInTheDocument();

        fireEvent.click(screen.getByText('Mathematics'));
        expect(screen.getByText('Mathematics Result 1')).toBeInTheDocument();
        expect(screen.getByText('Mathematics Result 2')).toBeInTheDocument();
        expect(screen.getByText('Comp. Science Result 1')).toBeNull();
        expect(screen.getByText('Comp. Science Result 2')).toBeNull();
        expect(screen.getByText('Physics Result 1')).toBeNull();
        expect(screen.getByText('Physics Result 2')).toBeNull();
        expect(screen.getByText('Chemistry Result 1')).toBeNull();
        expect(screen.getByText('Chemistry Result 2')).toBeNull();
        expect(screen.getByText('Biology Result 1')).toBeNull();
        expect(screen.getByText('Biology Result 2')).toBeNull();

        fireEvent.click(screen.getByText('Comp. Science'));
        expect(screen.getByText('Mathematics Result 1')).toBeNull();
        expect(screen.getByText('Mathematics Result 2')).toBeNull();
        expect(screen.getByText('Comp. Science Result 1')).toBeInTheDocument();
        expect(screen.getByText('Comp. Science Result 2')).toBeInTheDocument();
        expect(screen.getByText('Physics Result 1')).toBeNull();
        expect(screen.getByText('Physics Result 2')).toBeNull();
        expect(screen.getByText('Chemistry Result 1')).toBeNull();
        expect(screen.getByText('Chemistry Result 2')).toBeNull();
        expect(screen.getByText('Biology Result 1')).toBeNull();
        expect(screen.getByText('Biology Result 2')).toBeNull();

        fireEvent.click(screen.getByText('Physics'));
        expect(screen.getByText('Mathematics Result 1')).toBeNull();
        expect(screen.getByText('Mathematics Result 2')).toBeNull();
        expect(screen.getByText('Comp. Science Result 1')).toBeNull();
        expect(screen.getByText('Comp. Science Result 2')).toBeNull();
        expect(screen.getByText('Physics Result 1')).toBeInTheDocument();
        expect(screen.getByText('Physics Result 2')).toBeInTheDocument();
        expect(screen.getByText('Chemistry Result 1')).toBeNull();
        expect(screen.getByText('Chemistry Result 2')).toBeNull();
        expect(screen.getByText('Biology Result 1')).toBeNull();
        expect(screen.getByText('Biology Result 2')).toBeNull();

        fireEvent.click(screen.getByText('Chemistry'));
        expect(screen.getByText('Mathematics Result 1')).toBeNull();
        expect(screen.getByText('Mathematics Result 2')).toBeNull();
        expect(screen.getByText('Comp. Science Result 1')).toBeNull();
        expect(screen.getByText('Comp. Science Result 2')).toBeNull();
        expect(screen.getByText('Physics Result 1')).toBeNull();
        expect(screen.getByText('Physics Result 2')).toBeNull();
        expect(screen.getByText('Chemistry Result 1')).toBeInTheDocument();
        expect(screen.getByText('Chemistry Result 2')).toBeInTheDocument();
        expect(screen.getByText('Biology Result 1')).toBeNull();
        expect(screen.getByText('Biology Result 2')).toBeNull();

        fireEvent.click(screen.getByText('Biology'));
        expect(screen.getByText('Mathematics Result 1')).toBeNull();
        expect(screen.getByText('Mathematics Result 2')).toBeNull();
        expect(screen.getByText('Comp. Science Result 1')).toBeNull();
        expect(screen.getByText('Comp. Science Result 2')).toBeNull();
        expect(screen.getByText('Physics Result 1')).toBeNull();
        expect(screen.getByText('Physics Result 2')).toBeNull();
        expect(screen.getByText('Chemistry Result 1')).toBeNull();
        expect(screen.getByText('Chemistry Result 2')).toBeNull();
        expect(screen.getByText('Biology Result 1')).toBeInTheDocument();
        expect(screen.getByText('Biology Result 2')).toBeInTheDocument();
    })
});
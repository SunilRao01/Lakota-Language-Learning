import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import Home from "./Home.component";
import {render, screen} from "../../utils/testUtil";

test('should only render a maximum of 5 posts', () => {
    render(<Home />)

    expect(screen.getAllByTestId('word-of-the-day')).toHaveLength(1);
})
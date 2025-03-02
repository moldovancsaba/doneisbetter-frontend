import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../pages/index';

test('renders hello world message', () => {
    const { getByText } = render(<Home />);
    expect(getByText('Hello, World!')).toBeInTheDocument();
});


import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/react/cleanup-after-each';
import '@testing-library/jest-dom/extend-expect';
import Register from './Register';

afterEach(cleanup);

const addNums = Register.addNums;

describe('<Register/>', () => {
  it('Renders without fail', () => {
    render(<Register/>);
  });

  it('Renders the Username input', () => {
    const { getByTestId } = render(<Register/>);
    const username = getByTestId('username');
    expect(username).toBeVisible();
  });

  it('Syncs input', () => {
    const { getByTestId } = render(<Register/>);
    const username = getByTestId('username');
    expect(username.value).toBe('');
    fireEvent.change(username, {target: {value: 'Test'}});
    expect(username.value).toBe('Test');
  });

  it('Adds two numbers and returns the result', () => {
    const expected = 3;
    const actual = addNums(1, 2);
    expect(actual).toBe(expected);
  });
});
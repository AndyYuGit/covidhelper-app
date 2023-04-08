import React from 'react';
import renderer from 'react-test-renderer';
import {ContactScreen} from "../../src/screens/ContactScreen";
jest.useFakeTimers()

jest.mock('@react-navigation/native', () => ({
    useIsFocused: jest.fn(),
  }));

test('renders correctly', () => {
    const tree = renderer.create(<ContactScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
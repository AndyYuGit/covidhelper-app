import React from 'react';
import renderer from 'react-test-renderer';
import {FgLocationStoreButton} from "../../src/components/FgLocationStoreButton";
jest.useFakeTimers()

jest.mock('@react-navigation/native', () => ({
    useIsFocused: jest.fn(),
  }));

test('renders correctly', () => {
    const tree = renderer.create(<FgLocationStoreButton />).toJSON();
    expect(tree).toMatchSnapshot();
  });
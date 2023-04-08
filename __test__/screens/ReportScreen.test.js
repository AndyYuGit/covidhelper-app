import React from 'react';
import renderer from 'react-test-renderer';
import {ReportScreen} from "../../src/screens/ReportScreen";
jest.useFakeTimers()

jest.mock('@react-navigation/native', () => ({
    useIsFocused: jest.fn(),
  }));

test('renders correctly', () => {
    const tree = renderer.create(<ReportScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
import React from 'react';
import renderer from 'react-test-renderer';
import {ChatbotScreen} from "../../src/screens/ChatbotScreen";
jest.useFakeTimers()

jest.mock('@react-navigation/native', () => ({
    useIsFocused: jest.fn(),
  }));

test('renders correctly', () => {
    const tree = renderer.create(<ChatbotScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
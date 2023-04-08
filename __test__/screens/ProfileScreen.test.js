import React from 'react';
import renderer from 'react-test-renderer';
import {ProfileScreen} from "../../src/screens/ProfileScreen";
jest.useFakeTimers()

jest.mock('@react-navigation/native', () => ({
    useIsFocused: jest.fn(),
  }));

  jest.mock('react-native-keyboard-aware-scroll-view', () => {
    const KeyboardAwareScrollView = require('react-native').ScrollView;
    return { KeyboardAwareScrollView };
  });

test('renders correctly', () => {
    const tree = renderer.create(<ProfileScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
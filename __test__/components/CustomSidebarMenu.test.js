import React from 'react';
import renderer from 'react-test-renderer';
import {CustomSidebarMenu} from "../../src/components/CustomSidebarMenu";
import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};

  return Reanimated;
});

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.useFakeTimers()

jest.mock('@react-navigation/drawer', () => ({
    useDrawerStatus: jest.fn(),
    addEventListener: jest.fn(),
    createDrawerNavigator: jest.fn(),
    DrawerContentScrollView:jest.fn(),
    DrawerItem:jest.fn(),
  }));

  jest.mock('@react-navigation/native', () => ({
    useNavigation: jest.fn(),
  }));

test('renders correctly', () => {
    const tree = renderer.create(<CustomSidebarMenu />).toJSON();
    expect(tree).toMatchSnapshot();
  });
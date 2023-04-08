import React from 'react';
import renderer from 'react-test-renderer';
import {DistrictsScreen} from "../../src/screens/DistrictsScreen";
jest.useFakeTimers()

jest.mock('@react-navigation/native', () => ({
    useIsFocused: jest.fn(),
  }));

  const mockedParams = {
    route: { params: { selectedScreen:0} },
    navigation: '',
  };

test('renders correctly', () => {
    const tree = renderer.create(<DistrictsScreen {...mockedParams}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
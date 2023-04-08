import React from 'react';
import renderer from 'react-test-renderer';
import {LocationsScreen} from "../../src/screens/LocationsScreen";
jest.useFakeTimers()

jest.mock('@react-navigation/native', () => ({
    useIsFocused: jest.fn(),
  }));

  const mockedParams = {
    route: { params: { selectedScreen:0,district:'Tuen Mun'} },
    navigation: '',
  };

test('renders correctly', () => {
    const tree = renderer.create(<LocationsScreen {...mockedParams}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
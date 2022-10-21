import renderer from 'react-test-renderer';
import Home from  '../src/screens/Main/Home'

it('renders correctly', () => {
  const tree = renderer
    .create(<Home />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
import { Component } from 'react';
import { render } from '@testing-library/react';

// Components
import ErrorBoundary from '..';

describe('ErrorBoundary', () => {
  test('renders children when there is no error', () => {
    const { container } = render(
      <ErrorBoundary fallback={<div>Error occurred</div>}>
        <div>Normal content</div>
      </ErrorBoundary>,
    );
    expect(container).toMatchSnapshot();
  });

  test('renders fallback content when there is an error', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    class ChildComponent extends Component {
      componentDidMount() {
        throw new Error('Test error');
      }
      render() {
        return <div>Child Component</div>;
      }
    }

    const { container } = render(
      <ErrorBoundary fallback={<div>Error occurred</div>}>
        <ChildComponent />
      </ErrorBoundary>,
    );
    expect(container).toMatchSnapshot();
  });
});

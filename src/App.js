import styled from 'styled-components';

import { PuzzleArea } from './components/PuzzleArea';

export const App = () => {
  return (
    <Content>
      <PuzzleArea rows="3" columns="3" />
    </Content>
  );
}

const Content = styled.div`
  margin: 0 auto;
`

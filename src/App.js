import styled from 'styled-components';

import { PuzzleArea } from './components/PuzzleArea';

export const App = () => {
  return (
    <Content>
      <PuzzleArea rows="2" columns="2" />
    </Content>
  );
}

const Content = styled.div`
  margin: 0 auto;
  padding: 20px;
`

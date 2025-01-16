import './App.css';
import { Header } from './components/Header/Header';
import { Content } from './components/Content/Content';
import {Container} from 'react-bootstrap';

function App() {
  return (
    <>
    <Container>
      <Header/>
    </Container>
    <Container>
        <Content/>
    </Container>
    </>
  );
}

export default App;

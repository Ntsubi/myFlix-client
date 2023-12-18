import { createRoot } from 'react-dom/client';
import MainView from "./components/main-view/main-view";
import Container from "react-bootstrap/Container";
import './index.scss'; //import statement that you need to bundle './index.scss'

//main component (will eventually use all the others)
const MyFlixApplication = () => {
  return (
    <Container>
      <MainView />
    </Container>
  );
};

//finds the root of your app
const container = document.querySelector('#root');
const root = createRoot(container);

//tells React to render your app in the root DOM element
root.render(<MyFlixApplication />);
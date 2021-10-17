import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import GlobalContext from './context';
import Routes from './routes';

function App() {
  return (
    <BrowserRouter>
      <GlobalContext>
        <Header title="Cocktails & Drinks" />

        <div className="flex flex-wrap p-4 space-x-4 -mt-44">
          <main className="flex w-full justify-center">
            <div className="w-full bg-yellow-200 p-2 rounded">
              <Routes />
            </div>
          </main>
        </div>
      </GlobalContext>
    </BrowserRouter>
  );
}

export default App;

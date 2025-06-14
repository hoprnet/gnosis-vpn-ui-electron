import LinePaths from './components/LinesPaths';
import { StartButton } from './components/StartButton';

function App() {
  return (
    <>
      <div className="flex flex-col items-center h-screen bg-gray-100 relative w-full">
        <div className="absolute inset-0 w-full h-full z-0">
          <LinePaths />
        </div>
        <div className="flex flex-col items-center relative z-10 w-full h-full">
          <StartButton />
        </div>
      </div>
    </>
  );
}

export default App;

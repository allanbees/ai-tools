import Navbar from './components/Navbar';
import Chatbot from './pages/Chatbot';

function App() {
  return (
    <div className="flex flex-col gap-5">
      <Navbar />
      <Chatbot />
    </div>
  );
}

export default App;

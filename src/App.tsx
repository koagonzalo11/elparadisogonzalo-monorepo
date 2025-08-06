import Header from './components/Header';
import WalletButton from './components/WalletButton';

function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Header />
      <main className="p-6">
        <h2 className="text-xl mb-4">👋 Welcome to your Web3 dApp</h2>
        <WalletButton />
      </main>
    </div>
  );
}

export default App;

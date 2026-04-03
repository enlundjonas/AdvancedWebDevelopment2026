import Header from './components/header'
import Footer from './components/footer'
import Hero from './components/hero'
import Home from './components/home'

function App() {
  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen">
      <Header />
      <Hero />
      <Home />
      <Footer />
    </div>
  );
}


export default App;
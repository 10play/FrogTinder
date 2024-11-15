import "./App.css";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { TinderSwiper } from "./TinderSwiper";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <div className="App">
      <Header />
      <TinderSwiper />
      <Footer />
      <Analytics />
    </div>
  );
}

export default App;

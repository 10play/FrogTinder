import "./App.css";
import { Header } from "./Header";
import { TinderSwiper } from "./TinderSwiper";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <div className="App">
      <Header />
      <TinderSwiper />
      <Analytics />
    </div>
  );
}

export default App;

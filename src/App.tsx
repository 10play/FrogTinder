import "./App.css";
import { TinderSwiper } from "./TinderSwiper";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <div className="App">
      <TinderSwiper />
      <Analytics />
    </div>
  );
}

export default App;

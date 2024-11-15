import { useState } from "react";
import "./App.css";
import { TinderSwiper } from "./TinderSwiper";

function App() {
  const [count, setCount] = useState(0);

  return <TinderSwiper />;
}

export default App;

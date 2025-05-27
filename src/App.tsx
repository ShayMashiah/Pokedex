import { useState, useEffect } from "react";
import { Progress } from "./components/ui/progress";

function App() {
  const [progress, setProgress] = useState(100);

  console.log("Progress value:", progress);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(10), 500);
    console.log(progress);
    return () => clearTimeout(timer);
  }, []);

  return <Progress value={progress} className="w-[60%]" />;
}

export default App;

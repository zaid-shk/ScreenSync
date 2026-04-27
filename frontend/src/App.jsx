import { useState } from "react"
import Navbar from "./components/Navbar"
import Screens from "./components/Screens"
import BottomNav from "./components/BottomNav";

const App = () => {
  const [previewUrl, setPreviewUrl] = useState("");

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar setPreviewUrl={setPreviewUrl} />
      <Screens previewUrl={previewUrl} />
      <BottomNav/>
    </div>
  )
}

export default App
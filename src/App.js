import { Routes, Route } from 'react-router-dom'
import News from "./components/News";
import NewsCurrent from "./components/NewsCurrent";
import Header from "./components/Header";
function App() {
  return (
    <div>
        < Header/>
     <Routes>
        <Route path="/" element={ <News/> }/>
        <Route path="/news/:id" element={ <NewsCurrent/> }/>
     </Routes>
    </div>
  );
}

export default App;

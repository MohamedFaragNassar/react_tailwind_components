import { useState } from 'react';
import Alert from './components/Alert';

function App() {
  const [isOpen,setIsOpen] = useState(false)
  return <>
     <div className="w-full">
       <button onClick={()=>setIsOpen(true)}>show</button>
        <Alert status="fail" message="something went wrong please try again" 
        isOpen={isOpen} close={()=>setIsOpen(false)}  duration={3000} />
        
     </div>
  </>
}

export default App;

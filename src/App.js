import { useState } from 'react';
import Alert from './components/Alert';
import Select from './components/Select';

function App() {
  const [isOpen,setIsOpen] = useState(false)
  return <>
     <div className="w-full">
       <button onClick={()=>setIsOpen(true)}>show</button>
        <Alert status="fail" message="something went wrong please try again" 
        isOpen={isOpen} close={()=>setIsOpen(false)}  duration={3000} />
 
        <div className="w-full flex items-center justify-center mt-40">
            <Select  handler={(val)=>console.log(val)} isMany={true} title="Choose your favorite pets"
            data = {["dog",'cat',"hamster","goldfish","parrot","spider"]}/>
        </div>
        
     </div>
  </>
}

export default App;

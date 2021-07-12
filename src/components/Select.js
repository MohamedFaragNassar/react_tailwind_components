import React, { useState } from 'react'
import {useClickToClose} from './CTC'
const Select = ({handler,isMany,title,data}) => {
    const [isOpen,setIsOpen] = useState(false)
    const [shownData,setShownData] = useState(data)
    const [selected,setSelected] = useState([])
    const reset = (value,type) => {
        const inputElement = document.getElementById("select")
        setIsOpen(false)
        inputElement.classList.add("rounded-b-md")
        setShownData(data)
        if(isMany || type){
            inputElement.value = value
        }
    }
    
    const node = useClickToClose(()=>reset(selected.length > 0 ? `${selected.length} items selected`:""),"#select-component")

    const handleSearch = (keyword) => {
      if(keyword){
        setShownData(data.filter(e => e.includes(`${keyword}`)))
      }else{
        setShownData(data)
    }
    }
    const handleFocus = () => {
        const inputElement =  document.getElementById("select")
        inputElement.classList.remove("rounded-b-md")
        if(isMany){
            inputElement.value = ""
        }
        setIsOpen(true)
    }
    const handleChoice = (val) => {
        if(!isMany){
            handler(val)
            reset(val,true)
        }    
    }
    const handleConfirmMany = ()=>{
        handler(selected)
        reset(`${selected.length} items selected`)
    }

    const handleSelect = (checked,val) => {
        document.getElementById("select").value = ""
        if(checked){
            setSelected([...selected,val])
        }else{
            setSelected(selected.filter(e => e != val))
        }
    }

    return (
        <div ref={node} id="select-component" className="w-80 flex flex-col items-start justify-center">
            {title&&<label htmlFor="select" className="ml-2 mb-2" >{title}</label>}
            <div className="w-full relative">
                <input id="select" type="text" onFocus={handleFocus} onChange={(e)=>handleSearch(e.target.value)}
                className="w-full p-2 border rounded-t-md rounded-b-md focus:outline-none cursor-pointer" />
                {selected?.length > 0 && isOpen&&<button onClick={handleConfirmMany} className="absolute top-2 right-2">
                    <i className="fal fa-check-circle text-xl text-green-400"></i>
                </button>}
            </div>
            {isOpen&&<div id="options-menu" className="w-full  border rounded-b-md h-60 flex flex-col items-center overflow-auto">
                {shownData?.map((val,index)=> 
                    <div key={index} className={`w-full flex items-center justify-between border-b hover:bg-gray-100
                    ${!isMany&&"cursor-pointer"}`}  onClick={()=>handleChoice(val)}>
                        <span  className="w-full p-2 " >{val}</span>
                        {isMany&&<input type="checkbox" className="w-6 h-6 border mr-4 cursor-pointer" 
                        checked={selected?.filter(e => e==val).length > 0}
                        onChange={(e)=>handleSelect(e.target.checked,val)} />}
                    </div>

                )}
            </div>}
        </div>
    )
}

export default Select

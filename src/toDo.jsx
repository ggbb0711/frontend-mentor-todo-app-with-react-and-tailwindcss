import { useState, useContext } from "react"
import { ToDoContext } from "./toDoContext"
import  CheckBox  from "./checkBox"

export default function ToDo({toDo}){
    const [rewritingMode,setRewritingMode]=useState(false)
    const [isDragOver,setIsDragOver]=useState(false)
    const {rewriteToDo,deleteToDo,changeComplete,switchToDo}=useContext(ToDoContext)
    

    function handleOnDrag(e,toDo){
        e.dataTransfer.setData('toDo',JSON.stringify(toDo))
    }

    function handleDragOver(e){
        e.preventDefault()
        setIsDragOver(true)
    }

    function handleDragLeave(){
        setIsDragOver(false)
    }

    function handleOnDrop(e,oldToDo){
        const newToDo=JSON.parse(e.dataTransfer.getData('toDo'))
        setIsDragOver(false)
        switchToDo(oldToDo,newToDo)
    }


    return(
        <li draggable onDrop={e=>handleOnDrop(e,toDo)} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDragStart={e=>handleOnDrag(e,toDo)} className={`relative w-full h-[80px] cursor-pointer text-color flex justify-between items-center p-4 border-b-[1px] border-light-Dark-Grayish-Blue dark:border-dark-Dark-Grayish-Blue  ${isDragOver?'bg-[#c058f3]':''}`}>
            <div className='flex gap-2 items-center'>
                <CheckBox changeComplete={changeComplete.bind(null,toDo.id)} checked={toDo.completed}></CheckBox>
                <input id={toDo.id} onChange={(e)=>{rewriteToDo(toDo.id,e.target.value)}} disabled={!rewritingMode} className={`${rewritingMode?'border-b-2 border-[#c058f3]':''} ${toDo.completed?'line-through text-gray-color':''} w-1/2 cursor-pointer bg-transparent outline-none`} type="text" value={toDo.title}/>
            </div>
            <div className='flex gap-4 items-center'>
                <svg onClick={()=>{setRewritingMode(!rewritingMode)}} className={`svg ${rewritingMode?'hidden':''}`} xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 -960 960 960" width="18"><path d="m388-80-20-126q-19-7-40-19t-37-25l-118 54-93-164 108-79q-2-9-2.5-20.5T185-480q0-9 .5-20.5T188-521L80-600l93-164 118 54q16-13 37-25t40-18l20-127h184l20 126q19 7 40.5 18.5T669-710l118-54 93 164-108 77q2 10 2.5 21.5t.5 21.5q0 10-.5 21t-2.5 21l108 78-93 164-118-54q-16 13-36.5 25.5T592-206L572-80H388Zm92-270q54 0 92-38t38-92q0-54-38-92t-92-38q-54 0-92 38t-38 92q0 54 38 92t92 38Zm0-60q-29 0-49.5-20.5T410-480q0-29 20.5-49.5T480-550q29 0 49.5 20.5T550-480q0 29-20.5 49.5T480-410Zm0-70Zm-44 340h88l14-112q33-8 62.5-25t53.5-41l106 46 40-72-94-69q4-17 6.5-33.5T715-480q0-17-2-33.5t-7-33.5l94-69-40-72-106 46q-23-26-52-43.5T538-708l-14-112h-88l-14 112q-34 7-63.5 24T306-642l-106-46-40 72 94 69q-4 17-6.5 33.5T245-480q0 17 2.5 33.5T254-413l-94 69 40 72 106-46q24 24 53.5 41t62.5 25l14 112Z"/></svg>
                <div onClick={()=>{setRewritingMode(!rewritingMode)}} className={`${rewritingMode?'':'hidden'} w-2 h-6  border-r-2 border-b-2 cursor-pointer border-light-Dark-Grayish-Blue dark:border-dark-Dark-Grayish-Blue hover:border-light-Very-Dark-Grayish-Blue hover:dark:border-dark-Light-Grayish-Blue rotate-45`}></div>
                {/* <svg onClick={()=>{setRewritingMode(!rewritingMode)}} className={`svg ${rewritingMode?'':'hidden'}`} xmlns="http://www.w3.org/2000/svg" width="48" height="48"><path stroke="#FFF" strokeWidth="2" d="M1 4.304L3.696 7l6-6"/></svg> */}
                <svg onClick={()=>{deleteToDo(toDo.id)}} className='svg' xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
            </div>
        </li>
    )
}
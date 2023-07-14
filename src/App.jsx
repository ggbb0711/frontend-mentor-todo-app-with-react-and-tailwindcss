import { useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import { ToDoContext } from './toDoContext'
import ToDoRoute from './toDoRoute'
import { json } from 'react-router-dom'


function App() {
  const [toDos,setToDos]=useState([])
  const [currentToDo,setCurrentToDo]=useState('')
  const [darkMode,setDarkMode]=useState()
  const [firstLoadFlag,setFirstLoadFlag]=useState(true)


  const switchTheme=()=>{setDarkMode(!darkMode)}

  function rewriteToDo(id,newContent){
    const clone=[...toDos]

    for(let i=0;i<toDos.length;i++){
      if(clone[i].id===id){
        clone[i].title=newContent
        setToDos(clone)
        return
      }
    }
  }

  function switchToDo(oldToDo,newToDo){
    const clone=[...toDos]
    let i=0
    let switchOldToDoFlag=false
    let switchNewToDoFlag=false

    while(!switchOldToDoFlag||!switchNewToDoFlag){
      if(oldToDo.id===clone[i].id){
        clone[i]=newToDo
        switchNewToDoFlag=true
      }
      else if(newToDo.id===clone[i].id){
        clone[i]=oldToDo
        switchOldToDoFlag=true
      }
      i++
    }

    setToDos(clone)
  }

  function deleteToDo(id){
    setToDos(toDos.filter(toDo=>toDo.id!==id))
  }

  function changeComplete(id){
    const clone=[...toDos]

    clone.forEach((toDo,i)=>{
      if(toDo.id===id){
        clone[i].completed=!toDo.completed
        setToDos(clone)
        return
      }
    })
  }


  function clearCompleted(){
    setToDos(toDos.filter(toDo=>!toDo.completed))
  }
  

  function addToDo(e){
    e.preventDefault()
    setCurrentToDo('')

    const newToDo={
      id:Math.floor(Math.random()*100000000000),
      title:currentToDo,
      completed:false
    }
    setToDos([...toDos,newToDo])
  }

  // Get the local toDos when first load in
  useEffect(()=>{
    const localToDos=JSON.parse(localStorage.getItem('toDos'))
    if(!localToDos) localStorage.setItem('toDos',JSON.stringify([]))
    else{ 
      setToDos((localToDos.length===0)?[]:(localToDos))
    }

    //Get darkMode when first load in
    const localDarkMode=(localStorage.getItem('darkMode'))

    if(localDarkMode==='undefined') localStorage.setItem('darkMode','true')

    //If darkMode doesn't exist than create one
    else{
      setDarkMode(JSON.parse(localDarkMode))
    } 
  },[])


  // Update the toDos to the local storage
  useEffect(()=>{
    if (!firstLoadFlag)localStorage.setItem('toDos',JSON.stringify(toDos))
    setFirstLoadFlag(false)
  },[toDos])
  
  // Update dark mode status
  useEffect(()=>{
    localStorage.setItem('darkMode',JSON.stringify(darkMode))
  },[darkMode])


  return (
    <main className={`min-w-screen min-h-screen py-8 relative ${darkMode?'dark':''}`}>
      {/* The background */}
      <div className='w-full h-full absolute top-0 left-0 -z-10 bg-light-Very-Light-Gray dark:bg-dark-Very-Dark-Blue'>
        {/* Mobile */}
        <div className='w-full h-[200px] bg-no-repeat bg-cover
        bg-[url("/images/bg-mobile-light.jpg")]
        dark:bg-[url("/images/bg-mobile-dark.jpg")]
        sm:hidden
        '></div>
        {/* Desktop */}
        <div className='w-full h-[200px] bg-no-repeat
        bg-[url("/images/bg-desktop-light.jpg")]
        dark:bg-[url("/images/bg-desktop-dark.jpg")]
        hidden sm:block
        '></div>
      </div>

      <div className='max-w-[750px] sm:m-auto m-4 flex flex-col gap-4'>
        <div className='flex justify-between items-center w-full'>
          <h1 className='text-white text-2xl first-letter: tracking-widest'>TODO</h1>
          {/* The color switchter */}
          <svg onClick={switchTheme} className='cursor-pointer hidden dark:block' xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fillRule="evenodd" d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"/></svg>
          <svg onClick={switchTheme} className='cursor-pointer dark:hidden' xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fillRule="evenodd" d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"/></svg>
        </div>

        {/* Add toDo */}

        <form onSubmit={addToDo} className='relative w-full h-[70px] text-color bg-light-Very-Light-Grayish-Blue dark:bg-dark-Very-Dark-Desaturated-Blue flex justify-between items-center p-4'>
          <input id='addToDo' onChange={(e)=>{setCurrentToDo(e.target.value)}} className='w-1/2 cursor-pointer bg-transparent outline-none border-b-2 border-[#c058f3]' type="text" placeholder='Add new toDo' value={currentToDo}/>
          <div className='relative h-full'>
            <input id='submitToDo' className='opacity-0 w-full h-full cursor-pointer absolute top-0' type="submit" />
            <svg className='svg' xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M450-200v-250H200v-60h250v-250h60v250h250v60H510v250h-60Z"/></svg>
          </div>  
        </form>


        <ToDoContext.Provider value={{rewriteToDo,deleteToDo,changeComplete,switchToDo,clearCompleted}}>
          <ToDoRoute toDos={toDos} sortListFn={(list)=>list}></ToDoRoute>
        </ToDoContext.Provider>
      </div>

      <p className='text-gray-color my-4 mx-auto w-min min-w-[250px]'>Drag and drop to reorder list</p>
    </main>
  )
}

export default App

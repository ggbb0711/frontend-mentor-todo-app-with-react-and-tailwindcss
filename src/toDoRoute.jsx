import { Route, Routes, NavLink } from "react-router-dom"
import ToDoList from "./toDoList"



export default function ToDoRoute({toDos}){
    //Sort with no condition
    function normalSort(toDo){ return toDo }

    // Sort the toDo that has not been completed
    function uncompletedSort(toDo){ return !toDo.completed }

    // Sort the toDo that has already been completed
    function completedSort(toDo){ return toDo.completed }

    
    return(
        <>
            <ul>
                    <Routes>
                        <Route path='/' element={<ToDoList toDos={toDos} sortListFn={normalSort}/>}></Route>
                        <Route path='/uncompleted' element={<ToDoList toDos={toDos} sortListFn={uncompletedSort}/>}></Route>
                        <Route path='/completed' element={<ToDoList toDos={toDos} sortListFn={completedSort}/>}></Route>
                    </Routes>
            </ul>
            <div className='text-gray-color sm:hidden mt-2 w-full min-h-[70px] flex justify-center items-center bg-light-Very-Light-Grayish-Blue dark:bg-dark-Very-Dark-Desaturated-Blue'>
                <ul className='flex gap-2'>
                <li className="hover-text-gray-color"><NavLink style={({isActive})=>({color: isActive? 'hsl(220, 98%, 61%)':''})} to='/'>All</NavLink></li>
                    <li className="hover-text-gray-color"><NavLink style={({isActive})=>({color: isActive? 'hsl(220, 98%, 61%)':''})} to='/uncompleted'>Active</NavLink></li>
                    <li className="hover-text-gray-color"><NavLink style={({isActive})=>({color: isActive? 'hsl(220, 98%, 61%)':''})} to='/completed'>Completed</NavLink></li>
                </ul>
            </div> 
        </>
        
    
    )
}
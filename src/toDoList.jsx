import ToDo from "./toDo"
import { useContext } from "react"
import { ToDoContext } from "./toDoContext"
import { NavLink } from "react-router-dom"

export default function ToDoList({toDos,sortListFn}){
    const {clearCompleted} = useContext(ToDoContext)

    return(
        <ul className='w-full min-h-[70px] flex flex-col justify-between items-center bg-light-Very-Light-Grayish-Blue dark:bg-dark-Very-Dark-Desaturated-Blue'>
            {toDos.filter(sortListFn).map((toDo)=>(
                <ToDo key={toDo.id} toDo={toDo}/>
            ))}
            <li className='w-full min-h-[70px] flex justify-between items-center p-4 text-gray-color'>
                <p>{toDos.filter(sortListFn).length} items left</p>
                <ul className='gap-2 hidden sm:flex'>
                    <li className="hover-text-gray-color"><NavLink style={({isActive})=>({color: isActive? 'hsl(220, 98%, 61%)':''})} to='/'>All</NavLink></li>
                    <li className="hover-text-gray-color"><NavLink style={({isActive})=>({color: isActive? 'hsl(220, 98%, 61%)':''})} to='/uncompleted'>Active</NavLink></li>
                    <li className="hover-text-gray-color"><NavLink style={({isActive})=>({color: isActive? 'hsl(220, 98%, 61%)':''})} to='/completed'>Completed</NavLink></li>
                </ul>
                <p onClick={clearCompleted} className="hover-text-gray-color">Clear Completed</p>
            </li>
        </ul>      
    )
}
export default function CheckBox({checked,changeComplete}){
    return(
        <div onClick={changeComplete} className={`cursor-pointer relative h-[30px] w-[30px] rounded-full p-[2px] bg-light-Dark-Grayish-Blue dark:bg-dark-Dark-Grayish-Blue bg-gradient-to-r ${checked?'from-[#57ddff] to-[#c058f3]':''}
        hover:from-[#57ddff] hover:to-[#c058f3]`}>
            <div className={`h-full w-full rounded-full bg-light-Very-Light-Grayish-Blue dark:bg-dark-Very-Dark-Desaturated-Blue ${checked?'bg-gradient-to-r from-[#57ddff] to-[#c058f3]':''}`}></div>
            {/* Tick mark */}
            <div className={`${checked?'':'hidden'} absolute top-1 left-3 w-2 h-4  border-r-4 border-b-4 rotate-45`}></div>
        </div>
    )
}
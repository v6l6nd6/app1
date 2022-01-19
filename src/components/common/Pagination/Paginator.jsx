import React, { useState } from "react";
import um from '../../Users/users.module.scss';


export const Paginator = ({curPerPortion=5,...props}) => {
   
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let portionCount=Math.ceil(props.totalUsersCount/curPerPortion);
    let [portionNumber,setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber-1)*curPerPortion+1;
    let rightPortionPageNumber = portionNumber*curPerPortion;
    return (
        <div className={um.paginationBlock}>
            {leftPortionPageNumber-1!==0 ? <button onClick={()=>{setPortionNumber(portionNumber-1)}}>back</button> : ""}
            {pages.filter(p =>  p >=leftPortionPageNumber && p<=rightPortionPageNumber).map(
                (p)=>{
                    return <span className={props.currentPage === p ? um.selectPage : " " && um.PageOne} onClick={() => { props.onPageChanged(p) }}>{p}</span>
                }
            ) 
            }
             {portionCount>portionNumber ? <button onClick={()=>{setPortionNumber(portionNumber+1)}}>up</button> : ""}
        </div>
    )
}

import React, { useState } from "react";
import styles from './Paginator.module.css';

let Paginator = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10, ...props}) => {

    let pagesCount = Math.ceil (totalItemsCount / pageSize);

    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }


    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightProtionPageNumber = portionNumber * portionSize;



    return (
        <div className={styles.pages}>
        

        <div className={styles.pages}>
        { portionNumber > 1 && <button onClick={() => {setPortionNumber(portionNumber - 1)}}>PREV</button> }
            {pages
            .filter(p => p >= leftPortionPageNumber && p<= rightProtionPageNumber)
            .map((p) => {
                return <button className={( currentPage === p && styles.selectedPage )} key={p} onClick={(e)=> {onPageChanged(p)}} >{p}</button>
            })}
        {portionCount > portionNumber &&
        <button onClick={() => {setPortionNumber(portionNumber + 1)}}>NEXT</button>}
        </div>
        </div>
    )

}

export default Paginator;
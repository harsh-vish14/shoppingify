
import { useState } from 'react';
import './sideBar.css'
import SideBarDisplay from './sideBarDisplay/SideBarDisplay'
import SideBarInputItem from './sideBarInputItem/SideBarInputItem';
import SideBarShowListItems from './sideBarShowListItems/sideBarShowListItems';
const SideBar = ({ displayIndex, setmoreInfo,listitems,setCartCount,setWantToInput,wantToInput }) => {
    
     return (
        <div className='sidebar'>
            {displayIndex ? (
                <>
                     <SideBarDisplay displayIndex={displayIndex} setmoreInfo={setmoreInfo} listitems={listitems} />
                </>
            ) : (
                     <>
                         {wantToInput ? (
                             <>
                                 
                                 <SideBarInputItem setWantToInput={setWantToInput} />
                            </>
                         ): (
                                 <>
                                     <SideBarShowListItems setWantToInput={setWantToInput} setCartCount={setCartCount} />
                                 
                             </>
                                 
                         )}
                </>
            )}
            
        </div>
    );
}

export default SideBar;
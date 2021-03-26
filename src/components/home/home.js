import {useEffect} from 'react'
import { Redirect, Switch, Route } from "react-router";
import { BrowserRouter, Link } from "react-router-dom";
import { logOut } from "../../services/auth";
import Navbar from "../Navbar/navbar";
import SideBar from "../sideBar/sideBar";
import {HiOutlineShoppingCart} from 'react-icons/all'
import './home.css'
import { useState } from "react";
import List from '../List/list';
import { auth, db } from '../../firebase';
import History from '../history/history';
import Stats from '../stats/stats';
const Home = () => {
    const [sideBar, setSideBar] = useState(true);
    const [moreInfo, setmoreInfo] = useState(null);
    const [listitems, setListitems] = useState([])
    const [cartCount, setCartCount] = useState(0)
    const [wantToInput,setWantToInput] = useState(false)
    useEffect(() => {
        if (window.innerWidth >= 800) {
            setSideBar(true);
        }
    })
    return (
        <div className='home'>
            <div className='logo'>
                <img src={`${process.env.PUBLIC_URL}/icon.svg`} height="30px" />
            </div>
            <BrowserRouter>
                <div style={{ overflow: 'hidden' }}>
                    <Navbar />
                </div>
                {<Redirect to='/list' />}
                <div className='pages-views'>
                    <Switch>
                        <Route exact path='/list'>
                            <List setmoreInfo={setmoreInfo} />
                        </Route>
                        <Route path='/history'>
                           <History />
                        </Route>
                        <Route path='/stats'>
                            <Stats setmoreInfo={setmoreInfo} setWantToInput={setWantToInput}/>
                        </Route>
                    </Switch>
                </div>
                <div className='sideBar' style={{ display: sideBar === true ? ('block') : ('none') }}>
                    <SideBar displayIndex={moreInfo} setmoreInfo={setmoreInfo} listitems={listitems} setCartCount={setCartCount} setWantToInput={setWantToInput} wantToInput={wantToInput} />
                </div>
            </BrowserRouter>
            <div className='cart' onClick={() => { setSideBar(!sideBar) }}>
                <div className='indecator'>
                    {cartCount}
                </div>
                <HiOutlineShoppingCart />
            </div>
        </div>
    );
}

export default Home;
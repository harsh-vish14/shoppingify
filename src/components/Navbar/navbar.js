import { AiOutlineUnorderedList ,BiHistory,ImStatsBars} from 'react-icons/all'
import { NavLink } from 'react-router-dom'
import './navbar.css'
const Navbar = () => {
    return (
        <div className='navbar'>
            <nav>
                <div className='link list'>
                    <NavLink exact activeClassName='active' style={{color:'#454545'}} to='/list'>
                    <AiOutlineUnorderedList />
                </NavLink>
                </div>
                <div className='link History'>
                    <NavLink exact activeClassName='active' style={{color:'#454545'}} to='/history'>
                        <BiHistory/>
                    </NavLink>
                </div>
                <div className='link Stats'>
                    <NavLink exact activeClassName='active' style={{color:'#454545'}} to='/stats'>
                        <ImStatsBars/>
                    </NavLink>
                </div>
            </nav>
            
        </div>
    )
}

export default Navbar;
import React from 'react';
import {clearUser} from '../../ducks/reducer'
import { Link} from 'react-router-dom';
import {connect} from 'react-redux';

const Nav = props => {
    console.log(props)

        return(
        <div className='nav-container'> 
        <button className='profile icon'>Profile</button>
       <Link to='/dashboard' className='Dash_icon'> <button>HOME</button></Link>
       <Link to='/newpost' className='newpost_icon'><button>New Post</button></Link>
       <Link to='/logout' className='logout_icon'><button> Logout</button></Link>
        </div>
        )
    
}
const mapStateToProps = reduxState => {
    return reduxState
}

export default connect(mapStateToProps, {clearUser})(Nav);

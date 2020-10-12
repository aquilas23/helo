import React from 'react';
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';

const Nav = props => {
    console.log(props)
}
        return(
        <div className='nav-container'> 
        <button>Home</button>
        <button>New Post</button>
        <button>Logout</button>
        {props.location.pathname !== '/'
        ? (<nav>
            <Link to='/dash' className='nav-links'>Dashboard</Link>
            <Link to='/profile' className='nav-links'>Profile</Link>
           </nav>)
        : null}
        </div>
        )
    
}
const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, {clearUser})(Nav);

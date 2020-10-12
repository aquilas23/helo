import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {getUser} from '../redux/reducer';

class Auth extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    login = (e) => {
        e.preventDefault();
        axios.post('/api/login', {email: this.state.email, password: this.state.password})
            .then(res => {
                this.props.getUser(res.data);
                this.props.history.push('/dashboard');
            })
            .catch(err => console.log(err));
    }

    register = (e) => {
        e.preventDefault();
        axios.post('/api/register', {email: this.state.email, password: this.state.password})
            .then(res => {
                this.props.getUser(res.data);
                this.props.history.push('/dashboard');
            })
            .catch(err => console.log(err));
    }

   
    render(){
        return(
            <div className='auth-view'>
             <input   
                value={this.state.username}
                name='username'
                placeholder='Username'
                onChange={(e) => this.handleInput(e)}/> 
             <input 
                type='password'
                value={this.state.password}
                name='password'
                placeholder='Password'
                onChange={(e) => this.handleInput(e)}/>  
                
            <button onClick={e => this.login(e)}>Log In</button>
            <button onClick={e => this.register(e)}>Register</button>
            </div>
        )
    }
}

export default connect(null, {getUser})(Auth);
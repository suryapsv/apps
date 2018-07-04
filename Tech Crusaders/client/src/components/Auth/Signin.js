import React from 'react';
import { Mutation } from 'react-apollo';
import { SIGNIN_USER } from '../../queries';
import Error from '../Error';
import { withRouter } from 'react-router-dom';

const initalState = {
    username : "",
    password : ""
};

class Signin extends React.Component{
    
    state = { ...initalState };

    clearState = () => {
        this.setState({ ...initalState });
    };

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleSubmit = (event, signinUser) => {
        event.preventDefault();
        signinUser().then(async ({data}) => {
            console.log(data);
            localStorage.setItem('token', data.signinUser.token);
            await this.props.refetch();
            this.clearState();
            this.props.history.push('/');
        });
    };
    
    validateForm = () => {
        const { username, password } = this.state;
        const isInvalid = !username || !password;
        return isInvalid;
    }

    render(){
        const { username, password } = this.state;

        return <div className="App">
            <h2 className="App">Signin</h2>
            <Mutation mutation={SIGNIN_USER} variables= {{ username, password }}>
                { (signinUser, { data, loading, error })=> {return (
                        <form className="form" onSubmit= {event => this.handleSubmit(event, signinUser)}>
                            <input type="text" name="username" placeholder="Enter Username" value={username} onChange={ this.handleChange }/>
                            <input type="password" name="password" placeholder="Enter Password" value={password} onChange={ this.handleChange }/>
                            <button type="submit" disabled={ loading || this.validateForm() } className="button-primary">Submit</button>
                            {error && <Error error={error} />}
                        </form>    
                    )}}
            </Mutation>
            </div>;
    };
}

export default withRouter(Signin);
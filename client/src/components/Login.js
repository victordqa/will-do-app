import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { logInAction } from '../redux/actions/authActions'
import { clearErrorsAction } from '../redux/actions/errorActions'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom'

// ===================Styles=====================
const LogInContainer = styled.div`
    margin-top: 3rem;
    border: 1px solid rgba(61, 66, 69, 0.85);
    padding: 2rem;
    border-radius: 0.5em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 80%;
`

const FieldContainer = styled.div`
    display: flex;
    margin: 1em;
    display: flex;
    height: 4rem;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
`

const InputContainer = styled.input`
    border: 1px solid rgba(61, 66, 69, 0.85);
    margin-left: 1em;
    height: 1.3rem;
    min-width: 4rem;
    color: inherit;
    background-color: #181a1b;
    border-radius: 0.5em;
    display: flex;
`

const LogInButton = styled.button`
    background-color: rgba(186, 0, 84, 0.8);
    padding: 0.3rem 1rem;
    border-radius: 3em;
    color: inherit;
    font-weight: 600;
    border: none;
    transition: all 0.3s ease-in-out;
    &:hover {
        background-color: rgba(186, 0, 84, 1);
    }
`

// ===================Component=====================
function Login(props) {
    let { logInAction, clearErrorsAction, error, isAuth } = props
    //Destructure error info
    let errorId = error.id
    let errorMsg = error.msg
    // Local state to update input fields
    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    //Display server messages
    const [statusMsg, setStatusMsg] = useState('')
    useEffect(() => {
        if (!isAuth && errorId === 'LOGIN_FAILURE') {
            setStatusMsg(errorMsg)
        }
        clearErrorsAction()
    }, [isAuth, errorId, errorMsg, clearErrorsAction])

    function logInHandler(user) {
        //Clear previous erros
        clearErrorsAction()
        logInAction(user)
    }
    function onSubmitHandler(event) {
        event.preventDefault()
    }

    //Updates stae of input fields
    function onChangeHandler(event) {
        let name = event.target.name
        let value = event.target.value
        setUser({ ...user, [name]: value })
    }
    //Takes use to tasks route after login
    if (isAuth) {
        return <Redirect to={'/tasks'} />
    }
    return (
        <LogInContainer>
            <h4 style={{ margin: '0.5rem' }}>Please, enter your info below.</h4>
            <form onSubmit={(event) => onSubmitHandler(event)}>
                <FieldContainer>
                    {' '}
                    <label htmlFor="mail"> Email: </label>
                    <InputContainer
                        type="email"
                        name="email"
                        placeholder="example@email.com"
                        value={user.email}
                        onChange={(event) => onChangeHandler(event)}
                    ></InputContainer>
                </FieldContainer>
                <FieldContainer>
                    <label htmlFor="password"> Password: </label>
                    <InputContainer
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={(event) => onChangeHandler(event)}
                    ></InputContainer>
                </FieldContainer>
                <FieldContainer>
                    <LogInButton onClick={() => logInHandler(user)}>
                        Log In
                    </LogInButton>
                    <p> {statusMsg} </p>
                </FieldContainer>
            </form>
        </LogInContainer>
    )
}

const mapStateToProps = (store) => {
    return { error: store.error, isAuth: store.auth.isAuth }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logInAction: ({ username, email, password }) =>
            dispatch(logInAction({ username, email, password })),
        clearErrorsAction: () => dispatch(clearErrorsAction()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

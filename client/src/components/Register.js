import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { registerAction } from '../redux/actions/authActions'
import { clearErrorsAction } from '../redux/actions/errorActions'
import { Redirect } from 'react-router-dom'

const RegisterContainer = styled.div`
    margin-top: 1.5rem;
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

const RegisterButton = styled.button`
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

function Register(props) {
    let { registerAction, clearErrorsAction, error, isAuth } = props
    let errorId = error.id
    let errorMsg = error.msg
    // Local states
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
    })

    //Display server messages
    const [statusMsg, setStatusMsg] = useState('')
    useEffect(() => {
        if (!isAuth && errorId === 'REGISTER_FAILURE') {
            setStatusMsg(errorMsg)
        }
        clearErrorsAction()
    }, [errorMsg, errorId, isAuth, clearErrorsAction])
    function registerHandler(user) {
        //clear previous erros
        clearErrorsAction()

        registerAction(user)
    }
    function onSubmitHandler(event) {
        event.preventDefault()
    }
    function onChangeHandler(event) {
        let name = event.target.name
        let value = event.target.value
        setUser({ ...user, [name]: value })
    }
    if (isAuth) {
        return <Redirect to={'/tasks'} />
    }
    return (
        <div>
            <RegisterContainer>
                <h4 style={{ margin: '0.5rem' }}>
                    Welcome! Only three simple steps to begin. <br />
                    :)
                </h4>
                <form onSubmit={(event) => onSubmitHandler(event)}>
                    <FieldContainer>
                        <label htmlFor="Name"> Name </label>
                        <InputContainer
                            type="text"
                            name="username"
                            placeholder="Ex: John Doe"
                            value={user.username}
                            onChange={(event) => onChangeHandler(event)}
                        ></InputContainer>
                    </FieldContainer>
                    <FieldContainer>
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
                        <RegisterButton onClick={() => registerHandler(user)}>
                            Register
                        </RegisterButton>
                        <p> {statusMsg} </p>
                    </FieldContainer>
                </form>
            </RegisterContainer>
        </div>
    )
}

const mapStateToProps = (store) => {
    return { error: store.error, isAuth: store.auth.isAuth }
}

const mapDispatchToProps = (dispatch) => {
    return {
        registerAction: ({ username, email, password }) =>
            dispatch(registerAction({ username, email, password })),
        clearErrorsAction: () => dispatch(clearErrorsAction()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)

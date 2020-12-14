import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { addTaskAction } from '../redux/actions/taskActions'
import { clearSuccsessMessagesAction } from '../redux/actions/taskActions'
import { Redirect } from 'react-router-dom'

// ===================Style=====================

const CreateTaskContainer = styled.div`
    border: 1px solid rgba(61, 66, 69, 0.85);
    color: inherit;
    background-color: #181a1b;
    border-radius: ${(props) => (props.isToggled ? '0.5em' : '50%')};
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
`

const FormContainer = styled.form`
    display: flex;
    margin-top: ${(props) => (props.toggle ? '3%' : '-30%')};
    margin-bottom: 0.5em;
    border-radius: 0.5em;
    width: 100%;
    align-items: center;
    transition: all 0.3s ease-in-out;
    align-items: center;
    justify-content: space-evenly;
`
const CreateTaskDescriptionContainer = styled.textarea`
    color: inherit;
    font-family: inherit;
    background-color: #181a1b;
    border: ${(props) =>
        props.alert ? '1px solid red' : '1px solid rgba(61, 66, 69, 0.85)'};
    border-radius: 0.5em;
    text-align: center;
    vertical-align: middle;
    width: 100% !important; //override textarea default
    word-break: keep-all;
    flex: 1;
    &:focus {
        outline: none !important;
        box-shadow: 0 0 10px #719ece;
    }
`

const TaskImportanceContainer = styled.input`
    border: 1px solid rgba(61, 66, 69, 0.85);
    border-radius: 0.5em;
    font-size: 1.2rem !important;
    background-color: #181a1b;
    color: inherit;
    text-align: center;
    height: 3em;
    width: 3em;
    font-size: 0.7rem;

    &:focus {
        outline: none !important;
        box-shadow: 0 0 10px #719ece;
    }
`
const CreateTaskIconContainer = styled.button`
    background-color: #181a1b;
    align-self: flex-start;
    display: flex;
    align-items: center;
    justify-content: center;
    border-color: ${(props) =>
        props.toggle ? 'rgba(186,0,84,1)' : 'rgba(186,0,84,0.5)'};
    border: ${(props) =>
        props.isDescription !== ''
            ? '4px solid rgba(186,0,84,1)'
            : '1px solid rgba(186,0,84,1)'};
    border-color: ${(props) => (props.toggle ? 'rgba(186,0,84,1)' : '#181a1b')};
    border-radius: 3em;
    width: ${(props) => (props.toggle ? '15%' : '100%')};
    min-width: 8em;
    padding: 0.3em 0em;
    margin: 0.3em 0em;
    transition: all 0.3s ease-in-out;
    &:hover {
        border: 2 px solid rgba(186, 0, 84, 0.8);
    }
    &:focus {
        outline: none !important;
        box-shadow: 0 0 10px #719ece;
    }
`
const PlaceHolderPlusContainer = styled.div`
    color: ${(props) =>
        props.toggle ? 'rgba(200, 195, 188,1)' : 'rgba(200, 195, 188,0.7)'};
    border: 1px solid;
    opacity: ${(props) => (props.toggle ? '1' : '0.7')};
    border-radius: 50%;
    font-size: 2em;
    height: 1em;
    width: 1.1em;
    background-color: #181a1b;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    padding-bottom: 0.1em;
    margin: 0.15em;
`

const PlaceHolderTextContainer = styled.div`
    color: rgb(200, 195, 188) !important;
    opacity: ${(props) => (props.toggle ? '1' : '0.5')};
    height: 100%;
    background-color: #181a1b;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
`

const CloseButton = styled.button`
    margin: 0.5em;
    color: inherit;
    border: none;
    border-bottom: 2px solid #181a1b;
    background-color: #181a1b;
    align-self: flex-end;
    &:hover {
        border-bottom: 2px solid rgba(186, 0, 84, 0.8);
    }
    &:focus {
        outline: none !important;
        box-shadow: 0 0 10px #719ece;
    }
`

const MsgContainer = styled.div`
    border: 1px solid black;
    color: inherit;
    transition: all 0.5s ease-in-out;
    background-color: rgba(61, 66, 69, 0.9);
    border-radius: 0.5em;
    text-align: center;
    padding: 0.4em;
    position: fixed;
    top: 15%;
    right: 0;
    transform: ${(props) =>
        props.displayMsg ? 'translate(0, 0)' : 'translate(100%, 0)'};
`
// ===================Component=====================
function CreateTaskModal(props) {
    let { addTaskAction, taskMsg, clearSuccsessMessagesAction, isAuth } = props

    useEffect(() => {
        //Display add or delete msgs
        if (taskMsg !== '') {
            setDisplayMsg(true)
            setTimeout(() => {
                setDisplayMsg(false)
                setTimeout(() => clearSuccsessMessagesAction(), 500)
            }, 1500)
        }
    }, [taskMsg, clearSuccsessMessagesAction])

    // Reference to focus description after click on 'Create' task
    const descriptionInput = useRef(null)

    //Local state to control msg displays.
    const [displayMsg, setDisplayMsg] = useState(false)

    //Local state for user input.
    const [newTask, setNewTask] = useState({
        importance: 0,
        description: '',
        alertEmptyDescription: false,
    })

    // Local state to control createa task expansion/contraction
    const [toggle, setToggle] = useState({
        isToggled: false,
        numberOfClicks: 0,
    })

    function addTaskHandler(newTask) {
        if (toggle.numberOfClicks === 0) {
            //Open modal on first click
            setToggle({ isToggled: true, numberOfClicks: 1 })
            descriptionInput.current.focus()
        } else if (toggle.numberOfClicks === 1 && newTask.description !== '') {
            //On second click check if task description is completed, if so, dispatches addNewTask
            addTaskAction(newTask)
            //Clears create task field
            setNewTask({
                importance: '',
                description: '',
                alertEmptyDescription: false,
            })
            //Closes modal, reset number of clicks
            setToggle({ isToggled: false, numberOfClicks: 0 })
        } else if (toggle.numberOfClicks === 1 && newTask.description === '') {
            setNewTask({
                ...newTask,
                alertEmptyDescription: true,
            })
        }
    }
    //Updtate input fields state
    function onChangeHandler(event) {
        event.preventDefault()
        let name = event.target.name
        let value = event.target.value
        setNewTask({ ...newTask, [name]: value })
    }

    //Takes user back to home if token expiers
    if (!isAuth) {
        return <Redirect to={'/'} />
    }
    return (
        <CreateTaskContainer toggle={toggle.isToggled}>
            <MsgContainer displayMsg={displayMsg}>{taskMsg}</MsgContainer>
            <div style={{ overflow: 'hidden', width: '100% ' }}>
                <FormContainer
                    onSubmit={(e) => e.preventDefault()}
                    toggle={toggle.isToggled}
                >
                    <label
                        htmlFor="importance"
                        style={{
                            width: '30% ',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <div style={{ fontSize: '0.7rem' }}>Importance</div>
                        <TaskImportanceContainer
                            name="importance"
                            type="number"
                            value={newTask.importance}
                            onChange={(event) => onChangeHandler(event)}
                        ></TaskImportanceContainer>
                    </label>
                    <label htmlFor="description" style={{ width: '50%' }}>
                        <CreateTaskDescriptionContainer
                            name="description"
                            ref={descriptionInput}
                            type="text"
                            placeholder="Task description..."
                            rows={4}
                            value={newTask.description}
                            alert={newTask.alertEmptyDescription}
                            onChange={(event) => onChangeHandler(event)}
                        ></CreateTaskDescriptionContainer>
                    </label>
                </FormContainer>
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                }}
            >
                <CreateTaskIconContainer
                    toggle={toggle.isToggled}
                    isDescription={newTask.description}
                    onClick={() => {
                        addTaskHandler(newTask)
                    }}
                >
                    <PlaceHolderPlusContainer toggle={toggle.isToggled}>
                        &#65291;
                    </PlaceHolderPlusContainer>
                    <PlaceHolderTextContainer toggle={toggle.isToggled}>
                        {toggle ? 'Create!' : 'Create new task...'}
                    </PlaceHolderTextContainer>
                </CreateTaskIconContainer>
                {toggle.isToggled ? (
                    <CloseButton
                        onClick={() =>
                            setToggle({ isToggled: false, numberOfClicks: 0 })
                        }
                    >
                        Close
                    </CloseButton>
                ) : (
                    ''
                )}
            </div>
        </CreateTaskContainer>
    )
}

let mapStateToProps = (store) => {
    return { taskMsg: store.task.msg, isAuth: store.auth.isAuth }
}
let mapDispatchToProps = (dispatch) => {
    return {
        addTaskAction: (newTask) => dispatch(addTaskAction(newTask)),
        clearSuccsessMessagesAction: () =>
            dispatch(clearSuccsessMessagesAction()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateTaskModal)

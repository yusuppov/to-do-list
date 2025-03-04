import './App.sass';
import React, { Component, createRef, useState, useRef, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash, faCheck } from '@fortawesome/free-solid-svg-icons'
// class AddBlock extends Component{
//   constructor(props) {
//     super(props)
//     this.inputRef = createRef()
//   }
//   conLog = () => { 
//     console.log(this.inputRef.current.value)
//   }
// }
function App() {
  useEffect(() => {
    const handleClick = (event) => {
      if (blockRef.current && blockRef.current.contains(event.target)) {
        setColor('#1D1825')
      } else {
        setColor('rgba(0, 0, 0, 0)')
      }

    }
    window.addEventListener('click', handleClick)
    return () => {window.removeEventListener('click', handleClick)}
  })
  const [count, setCount] = useState({
    taskCount: 0,
    doneCount: 0
  }, [])
  const blockRef = useRef(null)
  const [blockAnim, blocksAnims] = useState(false)
  const [tasks, setTasks] = useState([])
  const [tasks_done, getDone] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [show, setShow] = useState(false)
  const [color, setColor] = useState('none')
  const nodeRefs = useRef([])
  const addTask = () => {
    if((tasks.indexOf(inputValue.trim()) == -1) && inputValue.trim()) {
      setTasks(prev => prev = [inputValue,...prev])
      setInputValue('')
      blocksAnims(true)
      setCount(prev => ({...prev, taskCount: prev.taskCount + 1}))
      console.log(count)
    } else if (tasks.indexOf(inputValue.trim()) !== -1)  {
      alert('Вы ввели то что уже имеется в списке задач')
    }

  }
  const delTask = (indx) => {
    setTasks(prev => prev.filter((task) => prev.indexOf(task) !== indx))
    console.log(tasks)
    setCount(prev => ({...prev, taskCount: prev.taskCount - 1}))
    setShow((prevShow) => !prevShow)
  }
  const addDone = (task, index) => {
    setCount(prev => ({...prev, doneCount: prev.doneCount + 1}))
    getDone(prev => prev = [...prev, {id: task, value: task}])
    setTasks(prev => prev.filter((task) => prev.indexOf(task) !== index))
  }
  // const changeColor = () => {
  //   setColor(prev => prev === 'rgba(0, 0, 0, 0)' ? '#1D1825' : 'rgba(0, 0, 0, 0)')
  // }
  return (
    <main className='main'>
      <section className="main-section"  style={{backgroundColor: color}} ref={blockRef}>
        <div className="main-input-wrapper">
          <input onChange={(e) => setInputValue(e.target.value)} value={inputValue} type="text" className="main-input" placeholder='Add a new task'/>
          <button onClick={addTask} className="main-input__btn"><FontAwesomeIcon icon={faPlus} /></button>
        </div>
        <div className="main-task-list">
          <h1 className="main-title">Task to do - {count.taskCount}</h1>
          <div className="main-task-wrapper">
          <ul className="main-task-ul">
          <TransitionGroup component={null}>
            
            
            {
            tasks.map((task, index) => 
                
               {
                nodeRefs.current[task] = nodeRefs.current[task] || React.createRef();
                return (
                  <CSSTransition in={show}
                  nodeRef={nodeRefs.current[task]}
                  appear
                  key={task}
                   timeout={300} 
                  classNames="my-node"
                  unmountOnExit
                >
                 <li ref={nodeRefs.current[task]} key={task} id={index} className="main-task-li" >
                <h2 className='main-task-li__title'>{task}</h2> 
                <button className="task-li__agr"><FontAwesomeIcon icon={faCheck} onClick={() => addDone(task, index)}/></button>
                <button className="task-li__del"><FontAwesomeIcon icon={faTrash} onClick={() => delTask(index)}/></button>
                </li>
                </CSSTransition>
                )

              }
            )
               }
               </TransitionGroup>
            
          </ul>
          </div>
        </div>
        <div className="main-done-list">
          <h1 className="main-title">Done - {count.doneCount}</h1>
          <ul className="main-done-ul">

            {
              tasks_done.map((task, index) => (
                <li className="main-task-li" key={index}>
                <h2 className='main-task-li__title main-done__green' >{task.value}</h2>
                </li>
              ))
            }
          </ul>
        </div>
      </section>
    </main>
    
  );
}

export default App;

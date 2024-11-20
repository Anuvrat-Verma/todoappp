import { useState } from 'react'
import TickIcon from './TickIcon'
import Modal from './Modal'
import ProgressBar from './ProgressBar'
const ListItem = ({task, getData}) => {
    const [showModal, setShowModal] = useState(false)
    const deleteItem = () => {
      try{
        const response = await fetch(`http://localhost:8000/todos/${task.id}`,
          {
            method: 'DELETE'
          }
        )
        if(response.status === 200) {
          getData()
        }
      } catch (err) {
        console.error(err)
      }
    }
    return (
      <li className="list-item">
        <div className="info-container">
          <TickIcon/>
          <p className="task-title">{task.title}</p>
          <ProgressBar progress={task.progress}/>
        </div>
        <div className = "button-container">
          <button className="edit" onClick = {() => setShowModal(true)}>Edit</button>
          <button className="delete" onClick = {deleteItem}>Delete</button>
        </div>
        {showModal && <Modal mode={'edit'} setShowModal={setShowModal} task={task} getData={getData}/>}
      </li>
    );
  }
  export default ListItem
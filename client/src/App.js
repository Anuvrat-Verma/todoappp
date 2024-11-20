import ListHeader from './components/ListHeader'
import ListItem from './components/ListItem'
import Auth from './components/Auth'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const authToken = cookies.AuthToken
  const userEmail = cookies.Email
  const [ tasks, setTasks ] = useState(null)
  const getData = async () => {
    try{
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todostodos/${userEmail}`)
      const json = await response.json()
      console.log(json)
      setTasks(json)
    } catch(err){
      console.error(err)
    }
  }
  useEffect(() =>  getData, [])
  console.log(tasks)
  //sort by date
  const sortedTasks = tasks?.sort((a,b) => new Date(a.date) - new Date(b.date))
  return (
    <div className="app">
      {!authToken && <Auth/>}
      {authToken &&
      <>
      <ListHeader listName={'🎆 Holiday Tick List'} {sortedTasks?.map((task) => <ListItem key={task.id} task={task}/>
      )}
    <p className="copyright">ANUVRAT VERMA</p>
    </div>
  );
}
export default App;
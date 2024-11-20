import { useState } from 'react' 
const Auth = () => {
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const [isLogIn, setIsLogin] = useState(true)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [error, setError] = useState(null)
    console.log(cookies)
    const viewLogin = (status) =>
    {
      setError(NULL)
      setIsLogin(status)
    }
    const handleSubmit = async (e, endpoint) => {
      e.preventDefault()
      if(!isLogin &&  password !== confirmPassword){
        setError('Make sure passwords match!')
        return
      }
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/${endpoint}`, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({email,password})
      })
      const data = await response.json()
      console.log(data)
      if (data.detail){
        setError(data.detail)
      }
      else {
        setCookie('Email', data.email)
        setCookie('AuthToken', data.token)

        window.location.reload()
      }
    }
    return (
      <div className="auth-container">
          <div className="auth-container-box">
            <form>
              <h2>{isLogIn ? 'Please log in' : 'Please sign up!'}</h2>
              <input type="email" placeholder="email" onChange={setEmail(e.target.value)}/>
              <input type="password" placeholder="password" onChange={setPassword(e.target.value)}/>
              {!isLogIn && <input type="password" placeholder="confirm password"/>}
              <input type="submit" className="create" onClick={() => handleSubmit(e, isLogin ? 'login' : 'signup')}/>
              <input type="submit" className="create" onClick={(e) => handleSubmit(e)}
            </form>
            <div className="auth-options">
              <button onClick={viewLogin(false)} style={{backgroundColor: !isLogIn ? 'rgb(255,255,255' : 'rgb(188,188,188)'}}>SignUp</button>
              <button onClick={() => viewLogin(true)}>Login</button>
            </div>
          </div>
      </div>
    );
  }
  export default Auth
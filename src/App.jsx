import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from './auth/auth'
import { login, logout } from './store/authSlice'
import { Header, Footer } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {
    authService.getCurrentUser()
      .then((user) => {
        if (user) {
          dispatch(login({ user }))
        } else {
          dispatch(logout())
        }
        console.log(user)
      })
      .finally(() => setLoading(false))
  }, [])

  return !loading ?
    <>
      <div className='min-h-full flex flex-wrap content-between bg-gray-400'>
        <div className='w-full block'>
          <Header />
          <main>
            {/* <Outlet /> */}
          </main>
          <Footer />
        </div>

      </div>

    </> :
    <></>
}

export default App

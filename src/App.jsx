import './App.css'
import Dashboard from './pages/Dashboard'
import LoginButton from './components/LoginButton'
import LogoutButton from './components/LogoutButton'
import { useAuth0 } from "@auth0/auth0-react"
import { injectFn } from './utils/customAxios'
import { useEffect } from 'react'

function App() {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0()
  injectFn(getAccessTokenSilently)

  // chỉ chạy 1 lần khi khởi tạo App
  // Kiểm tra trạng thái đăng nhập SSO
  useEffect(() => {
    const checkSSO = async () => {
      try {
        await getAccessTokenSilently()
      } catch (error) {
        console.log('Error checkSSO: ', error);
        // điều hướng đến trang đăng nhập (tùy dự án)
        // loginWithRedirect()
      }
    }
    checkSSO()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) 

  return (
    <div className="app-container">
      <div className="fixed-box">
        <h1>Auth0 SSO - 01 | ideft</h1>
          {/* 2 Button Login và Logout tùy điều kiện hiển thị */}
        <div className="actions">
          {isLoading
            ? <div className='loading'>Loading...</div>
            : (!isAuthenticated ? <LoginButton /> : <LogoutButton />)
          }
        </div>
        {/* Phần dashboard sau khi đăng nhập */}
        <Dashboard />
      </div>      
    </div>
  )
}

export default App

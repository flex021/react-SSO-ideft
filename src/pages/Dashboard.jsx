import ReactJson from 'react-json-view'
import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from 'react'
import { RENDER_API_ENDPOINT } from '../utils/constants'
import customAxiosInstance from '../utils/customAxios'

const Dashboard = () => {
  const { user, isAuthenticated, isLoading } = useAuth0()
  // console.log('user: ', user)
  // console.log('isAuthenticated: ', isAuthenticated)
  // console.log('isLoading: ', isLoading)
  const [ privateUsers, setPrivateUsers ] = useState(null)

  useEffect(() => {
    const fetchPrivateUsers = async () => {
      const res = await customAxiosInstance.get(`${RENDER_API_ENDPOINT}/api-v1/users/private/get_all`) 
      setPrivateUsers(res.data)
    }
    if (isAuthenticated) fetchPrivateUsers()
  }, [isAuthenticated])

  if (!isAuthenticated) return null
  console.log('privateUsers: ',privateUsers);
  
  
  return (
    <div className="dashboard">
      <div className="user-from-auth0">
        <div className="title">Current user from Auth0:</div>
        <div className="preview-user">
          {isLoading ? <div className="loading">Loading...</div>
          : <>
            <img className="user-avatar" src={user?.picture} alt={user?.name} />
            <div className="user-info">
              <p>Sub: <span className="value">{user?.sub}</span></p>
              <p>Email: <span className="value">{user?.email}</span></p>
              <p>Name: <span className="value">{user?.name}</span></p>
            </div>
          </>  
        }
          
      </div>
      {user && 
        <div className="more-info">
          <ReactJson
            enableClipboard={false}
            collapsed={true}
            theme={'google'}
            src={user}
          />
        </div>
      }
      </div>

      <div className="user-from-our-database">
        <div className="title">All user from our database: <span className='highlight'>{privateUsers?.length}</span></div>
        {!privateUsers
        ? <div className="loading">Loading...</div>
        : <div className="more-info">
          <ReactJson
            enableClipboard={false}
            collapsed={true}
            theme={'google'}
            src={privateUsers}
          />
        </div>
      }
        
      </div>
    </div>
  )
}

export default Dashboard

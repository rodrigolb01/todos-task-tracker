import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const Dashboard = () => {

  const {user} = useSelector((state) => state.auth)
  const navigate = useNavigate();

  useEffect(() => {
    if(!user)
    {
      navigate("/signin")
    }
  }, [user, navigate])

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard
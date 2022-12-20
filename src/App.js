import { Routes, Route, useLocation } from "react-router-dom";
import { Footer } from "./Components/Component";
import { Home, Admin, Dashboard, AdminLogin } from "./Pages/Pages";
const App = () => {
  return (
    <>
      <Routes>
        {[{ id: 1, link: "/", component: <Home />, }, { id: 2, link: "/admin", component: <Admin />, }, { id: 3, link: "/dashboard", component: <Dashboard />, },{ id: 4, link: "/admin-login", component: <AdminLogin/> , }].map(item => {
          return <Route key={item.id} path={item.link} element={item.component} />
        })}
      </Routes>
    </>
  )
}

export default App

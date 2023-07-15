import { Outlet,Link } from "react-router-dom"
import Wrapper from '../../assets/wrappers/SharedLayout'
import { BigSideBar, Navbar, SmallSideBar } from "../../Components"
const SharedLayout = () => {
  return (
    <Wrapper>
        <main className="dashboard">
            <SmallSideBar/>
            <BigSideBar/>
            <div>
                <Navbar/>
                <div className="dashboard-page">
                <Outlet/>{/*this is where all the nested pages will be displayed*/}
                </div>
            </div>
        </main>
      
    </Wrapper>
  )
}

export default SharedLayout
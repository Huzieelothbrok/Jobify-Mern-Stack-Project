import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/Testing'
import {Logo} from '../Components'
const Landing = () => {
  return (
    <Wrapper>
        <nav>
            <Logo/>
        </nav>
        <div className="container page">
            <div className="info">
                <h1>Job <span>Tracking</span> App </h1>
                <p>This is the finest of all applications that you will ever encounter.
                    With the help of this app you can literaly reach millions and millions of Rock's fans
                </p>
                <button className="btn btn-hero">Login/Register</button>
            </div>
            <img src={main} alt="job hunt" className='img main-img' />
        </div>
    </Wrapper>
  )
}



export default Landing
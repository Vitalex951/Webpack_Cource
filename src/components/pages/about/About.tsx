import PNG from '@/assets/defualt-avatar-27-27.png'
import JPG from '@/assets/1.jpg'
import SVG from '@/assets/burning-star.svg'
import {useState} from "react";

const About = () => {
    const [state, setState] = useState(0)
    return (
        <h1 data-testId="app-testId" >
            {__PLATFORM__ === 'desktop' ? <div>desktop </div> : <div> mobile</div>}
           <button onClick={()=> {setState(state + 1)}}>
               sent1123
           </button>123
            <div>
                <img width={100} src={PNG}/>
                <img width={100} src={JPG}/>
                <SVG width={40} height={60} color='red' />
                {state}
            </div>
        </h1>
    );
};
export default About

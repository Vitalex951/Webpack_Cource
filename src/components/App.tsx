import s from  './App.module.scss'
import {Link, Outlet} from "react-router-dom";
import About from "@/pages/about/About";


function todo1 () {
    todo2()
}

function todo2 () {
    throw new Error()
}

export const App = () => {
    return (
        <div>
            <Link to={'/about'}>about</Link>
            <Link to={'/shop'}>show </Link>
            Hello World
            <button className={s.button} onClick={todo1}>
                <span>sent</span>
            </button>
            <Outlet/>
            <About/>
        </div>
    );
};

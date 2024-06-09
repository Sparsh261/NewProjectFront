import Navbar from './Navbar'
import Carousel from './Carousel'
import Footer from './Footer'
import { useState } from 'react'



const Homepage = ()=>{

    const [query, setQuery] = useState('');
   
    return(
       <div>
        <Navbar setQuery={setQuery}/>
        <Carousel query={query}/>
        <Footer/>
       </div>

    );
}

export default Homepage;
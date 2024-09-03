import './LandingPage.css'
import img1 from '../assets/image01.png'
import img2 from '../assets/image02.png'
import img3 from '../assets/image03.png'
import { useEffect, useState } from 'react'

var index = 0

function LandingPage(){
    var images = [img1,img2,img3]
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);
        return () => clearInterval(intervalId);
    }, []);
            
    return(
        <>
        <div className="landing-div">
            <div className="text-div"><strong className="landing-strong">To Do List</strong></div>
            <div className="text-div"><b className="landing-b">ORGANIZE YOUR LIFE</b></div>
        </div>
        <div className="image-div"><img src={images[currentImageIndex]} alt="Description of img1" /></div>
        </>
    )
}

export default LandingPage
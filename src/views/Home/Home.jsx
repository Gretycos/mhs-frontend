/**
 * 诊所介绍页面
 * author: Tsong
 * time: 16/03/2024 19:23
 */
import {Carousel} from "antd";
import "./Home.less"
const Home = () => {

    const imgs = [
        "./img1.jpg",
        "./img2.jpg"
    ]

    const imgsComponent = imgs.map(
        (img, idx) => <img key={idx} className="home-carousel-img" src={img}/>
    )

    return (
        <div className="mhs-home">
            <Carousel autoplay className="home-carousel">
                {imgsComponent}
            </Carousel>
            <div>
                Introduction
            </div>
        </div>
    )
}

export default Home

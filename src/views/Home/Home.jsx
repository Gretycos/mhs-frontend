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

    return (
        <div className="mhs-home">
            <Carousel className="home-carousel">
                {
                    imgs.map((img) => <img className="home-carousel-img" src={img}/>)
                }
            </Carousel>
            <div>
                这里放介绍
            </div>
        </div>
    )
}

export default Home

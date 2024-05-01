/**
 * 诊所介绍页面
 * author: Tsong
 * time: 16/03/2024 19:23
 */
import {Card, Carousel} from "antd";
import "./Home.less"
const Home = () => {

    const imgs = [
        "./img1.jpg",
        "./img2.jpg"
    ]

    const imgsComponent = imgs.map(
        (img, idx) => <img key={idx} className="home-carousel-img" src={img}/>
    )

    const docImgs = [
        {
            url: "./doctor/doctor1.JPG",
            name: "Dr. Rachel Chang",
            category: "General Practice",
        },
        {
            url: "./doctor/doctor2.JPG",
            name: "Dr. Kevin Brooks",
            category: "Pediatrics",
        },
        {
            url: "./doctor/doctor3.JPG",
            name: "Dr. Emily Patel",
            category: "Internal Medicine",
        },
        {
            url: "./doctor/doctor4.JPG",
            name: "Dr. Eric Davis",
            category: "Obstetrics and Gynecology",
        },
        {
            url: "./doctor/doctor5.JPG",
            name: "Dr. Steven Wilson",
            category: "Dermatology",
        },
        {
            url: "./doctor/doctor6.JPG",
            name: "Dr. Jason Roberts",
            category: "Ophthalmology",
        },
        {
            url: "./doctor/doctor7.JPG",
            name: "Dr. Sarah Nguyen",
            category: "Ear, Nose, and Throat (ENT)",
        },
        {
            url: "./doctor/doctor8.JPG",
            name: "Dr. Laura Kim",
            category: "General Practice",
        },
    ]

    const docImgsComponent = docImgs.map((img, idx) =>
            <Card
                className="home-team-card"
                cover={<img alt="example" src={img.url} />}
            >
                <Card.Meta title={img.name} description={img.category} />
            </Card>
    )

    return (
        <div className="mhs-home">
            <Carousel autoplay className="home-carousel">
                {imgsComponent}
            </Carousel>
            <div>
                <div className="home-team-title">MEDICAL TEAM</div>
                <div className="home-team-list">
                    {docImgsComponent}
                </div>
            </div>
        </div>
    )
}

export default Home

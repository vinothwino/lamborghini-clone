import dynamic from 'next/dynamic'
import CarImage from 'assets/images/jpg/models/Huracan.jpg'
import CarImage1 from 'assets/images/jpg/models/Urus.jpg'
import CarImage3 from 'assets/images/jpg/models/ultimae_coupe.jpg'
import gsap from 'gsap'
import DiagonalButton from 'components/Button/DiagonalButton'
import { useEffect, useState } from 'react';
const all = dynamic(import('gsap/all'), { ssr: false })

let totalModels = [
    {
        modelName: 'HURACÁN',
        modelText: 'based on true story',
        image: CarImage,
        index: 0
    },
    {
        modelName: 'HURACÁN',
        modelText: 'based on true story',
        image: CarImage1,
        index: 1
    },
    {
        modelName: 'HURACÁN',
        modelText: 'based on true story',
        image: CarImage3,
        index: 2
    }
]

const Model = () => {
    const [models, setModels] = useState([...totalModels])
    useEffect(() => {
        animate()
    }, [models])
    const navigate = (isNext = false) => {
        let cloneModels = [...models]
        if (isNext) {
            let temp = cloneModels[2]
            cloneModels[2] = cloneModels[1]
            cloneModels[1] = cloneModels[0]
            cloneModels[0] = temp
            cloneModels[3] = temp
        }
        else {
            let temp = cloneModels[2]
            cloneModels[2] = cloneModels[1]
            cloneModels[1] = cloneModels[0]
            cloneModels[0] = temp
        }
        setModels(cloneModels)
    }
    const animate = () => {
        const listContainer = document.getElementById('model-section')
        const totalList = listContainer.querySelectorAll("[data-item]")
        const activeIndex = listContainer.getElementsByClassName('slide active').length
            ? listContainer.getElementsByClassName('slide active')[0].getAttribute("data-item")
            : -1
        if (activeIndex > -1) {
            totalList[2].classList.toggle('active')
            setTimeout(() => totalList[2].classList.toggle('active'), 500)
        } else {
            totalList[2].classList.toggle('active')
        }
    }
    return (
        <section id="model-section">
            <div className="model-section-container">
                <div className="custom-model-slider container-fluid">
                    <div className="inner-wrapper col-5 offset-1">
                        <div className="controls">
                            <h5 className="mb-5">models</h5>
                            <div>
                                <DiagonalButton
                                    width="5rem"
                                    height="5rem"
                                    iconName="left-arrow"
                                    className="me-5"
                                    onClick={() => navigate(false)}
                                />
                                <DiagonalButton
                                    width="5rem"
                                    height="5rem"
                                    onClick={() => navigate(true)}
                                />
                            </div>
                        </div>
                        <div className="active-content">
                            <div>
                                <h1 className="mb-2 fw-600">HURACÁN</h1>
                                <h5>based on true story</h5>
                            </div>
                            <div className="d-flex align-items-center">
                                <DiagonalButton
                                    width="5rem"
                                    height="5rem"
                                    iconName="plus"
                                    className="me-4"
                                />
                                <h6 className="explore-text">
                                    Explore the <br />models
                                </h6>
                            </div>
                        </div>
                    </div>
                    <div id="models-list" className="slides">
                        {
                            models.map((data, i) => (
                                <div
                                    data-item={data.index}
                                    className={`slide`}
                                >
                                    <div className="skew">
                                        <div className="skew-fix">
                                            <img
                                                src={data.image}
                                                className="img-fluid background"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Model;
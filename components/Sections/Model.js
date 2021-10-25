import dynamic from 'next/dynamic'
import CarImage from 'assets/images/jpg/models/Urus.jpg'
import CarImage1 from 'assets/images/jpg/models/Aventador.jpg'
import CarImage2 from 'assets/images/jpg/models/Huracan.jpg'
import CarImageSmall from 'assets/images/jpg/models/Urus-mobile.jpg'
import CarImageSmall1 from 'assets/images/jpg/models/Aventador-mobile.jpg'
import CarImageSmall2 from 'assets/images/jpg/models/Huracan-mobile.jpg'
import gsap from 'gsap'
import DiagonalButton from 'components/Button/DiagonalButton'
import OutlineButton from 'components/Button/OutlineButton'
import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectFade, Navigation } from 'swiper';
const all = dynamic(import('gsap/all'), { ssr: false })
SwiperCore.use([Navigation, EffectFade]);


let totalModels = [
    {
        modelName: 'URUS',
        modelText: 'based on true story',
        image: CarImage,
        imageSmall: CarImageSmall,
        index: 2
    },
    {
        modelName: 'AVENDER',
        modelText: 'based on true story',
        image: CarImage1,
        imageSmall: CarImageSmall1,
        index: 0
    },
    {
        modelName: 'HURACÁN',
        modelText: 'based on true story',
        image: CarImage2,
        imageSmall: CarImageSmall2,
        index: 1
    },

]

const Model = () => {
    const [models, setModels] = useState([...totalModels])
    const isNavigating = useRef(false)
    const gsapRef = useRef(gsap.timeline())
    const swiperRef = useRef()
    const mobileSwiperRef = useRef()

    useEffect(() => {
        const listContainer = document.getElementById('models-list');
        listContainer.childNodes[totalModels.length - 1].classList.add('active')
    }, [])
    const navigate = (isNext = false) => {
        if (isNavigating.current) return
        const listContainer = document.getElementById('models-list');
        let firstElementIndex = listContainer.childNodes[0].getAttribute("data-item")
        let prevElementIndex = listContainer.childNodes[totalModels.length - 2].getAttribute("data-item")
        animate(totalModels[isNext ? firstElementIndex : prevElementIndex].modelName)
        if (isNext) {
            let lastElement = listContainer.childNodes[totalModels.length - 1].cloneNode(true)
            lastElement.classList.remove('active')
            let firstElement = listContainer.childNodes[0]
            listContainer.insertBefore(lastElement, firstElement)
            listContainer.childNodes[totalModels.length - 1].classList.add('active')
            listContainer.childNodes[totalModels.length].classList.remove('active')
            isNavigating.current = true
            setTimeout(() => {
                listContainer.removeChild(listContainer.childNodes[totalModels.length])
                isNavigating.current = false
            }, 500)
        }
        else {
            let firstElement = listContainer.childNodes[0].cloneNode(true)
            firstElement.classList.add('active')
            listContainer.appendChild(firstElement)
            isNavigating.current = true
            setTimeout(() => {
                listContainer.childNodes[totalModels.length - 1].classList.remove('active')
            }, 60)
            setTimeout(() => {
                listContainer.removeChild(listContainer.childNodes[0])
                isNavigating.current = false
            }, 500)
        }
    }

    const animate = async (modelName, isSmallDevice = false) => {
        let plugin = await all.render.preload()
        gsap.registerPlugin(plugin.TextPlugin, plugin.EasePack.ExpoScaleEase);
        let t1 = gsapRef.current
        t1.clear()
        const modelDetails = models.find(data => data.modelName === modelName)
        if (!modelDetails) return;
        t1.set(`#model-section ${isSmallDevice ? ".small-device-wrapper" : ""} .product-desc,#model-section ${isSmallDevice ? ".small-device-wrapper" : ""} .product-model`, { xPercent: -100, autoAlpha: 0 })
        let words = modelDetails.modelName
        let wordCount = words.split('').length
        var container = document.querySelector(`#model-section ${isSmallDevice ? ".small-device-wrapper" : ""} .product-name`)
        container.innerHTML = ''
        var productDesc = document.querySelector(`#model-section ${isSmallDevice ? ".small-device-wrapper" : ""} .product-desc`)
        productDesc.innerHTML = ''
        productDesc.innerHTML = modelDetails.modelText
        for (let i = 0; i < wordCount; i++) {
            let word = words[i];
            let element = document.createElement('span')
            let textEl = document.createTextNode(word)
            element.appendChild(textEl)
            container.appendChild(element)
        }
        t1.set(`#model-section ${isSmallDevice ? ".small-device-wrapper" : ""} .product-name span`, { autoAlpha: 0 })
        t1.to(`#model-section ${isSmallDevice ? ".small-device-wrapper" : ""} .product-name span`, { stagger: .1, autoAlpha: 1, duration: .3, ease: "Sine.easeOut" }, `>.8`)
        t1.to(`#model-section ${isSmallDevice ? ".small-device-wrapper" : ""} .product-desc`, { xPercent: 0, autoAlpha: 1, duration: .8, ease: "Expo.easeOut" }, `<`)
        t1.to(`#model-section ${isSmallDevice ? ".small-device-wrapper" : ""} .product-model`, { xPercent: 0, autoAlpha: 1, duration: .8, ease: "Expo.easeOut" }, `<.5`)
    }

    const handleAnimateSmallDevice = (activeIndex, props) => {
        animate(models[activeIndex].modelName, true)
    }

    return (
        <section id="model-section">
            <div className="model-section-container">
                <div className="custom-model-slider container-fluid d-none d-lg-block">
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
                                <h1 className="mb-2 fw-600 product-name" data-text="HURACÁN">HURACÁN</h1>
                                <h5 className="product-desc">based on true story</h5>
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
                <div className="container-fluid p-0 small-device-wrapper d-block d-xl-none d-lg-none">
                    <div className="">
                        <h5 className="mb-5 heading">models</h5>
                        <Swiper
                            ref={mobileSwiperRef}
                            className="model-small-device-swiper"
                            slidesPerView={2}
                            grabCursor={true}
                            loop={true}
                            // breakpoints={{
                            //     "769": {
                            //         "slidesPerView": 2,
                            //         "slidesPerGroup": 2
                            //     }
                            // }}
                            onActiveIndexChange={(...props) => handleAnimateSmallDevice(props[0].realIndex, props)}
                        >
                            {
                                models.map((model, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="bg-image">
                                            <img src={model.imageSmall} className="img-fluid background" />
                                        </div>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                        <div className="active-content">
                            <div>
                                <h5 className="mb-2 fw-600 product-name" data-text="HURACÁN">HURACÁN</h5>
                                <p className="product-desc">based on true story</p>
                            </div>
                            <div className="d-flex align-items-center model-button-container">
                                <OutlineButton
                                    width="5rem"
                                    height="5rem"
                                    iconName="plus"
                                >
                                    Explore the models
                                </OutlineButton>
                                <OutlineButton
                                    width="5rem"
                                    height="5rem"
                                    iconName="plus"
                                >
                                    open car configurator
                                </OutlineButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
}

export default Model;
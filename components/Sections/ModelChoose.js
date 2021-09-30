import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectFade, Navigation, Controller } from 'swiper';
import gsap from 'gsap'
import CarImage from 'assets/images/jpg/choose-model/Aventador.jpg'
import CarImage1 from 'assets/images/jpg/choose-model/Urus.jpg'
import CarImage2 from 'assets/images/jpg/choose-model/Huracan.jpg'
import DiagonalButton from 'components/Button/DiagonalButton'

const all = dynamic(import('gsap/all'), { ssr: false })
SwiperCore.use([Navigation, EffectFade]);

let models = [
    {
        modelName: 'Aventador',
        modelImage: CarImage
    },
    {
        modelName: 'Huracan',
        modelImage: CarImage1
    },
    {
        modelName: 'Urus',
        modelImage: CarImage2
    }
]

const ModelChoose = () => {
    const swiperRef = useRef()
    const gsapRef = useRef(gsap.timeline())
    const [activeSlideIndex, setActiveSlide] = useState(0)
    useEffect(() => {
        animate()
    }, [])
    const animate = async () => {
        let plugin = await all.render.preload()
        gsap.registerPlugin(plugin.TextPlugin, plugin.EasePack.ExpoScaleEase);
        let t1 = gsapRef.current
        t1.clear()
        t1.set('#model-choose .product-desc,#model-choose .product-model', { xPercent: -100, autoAlpha: 0 })
        let words = document.querySelector("#model-choose .product-name").getAttribute('data-text')
        let wordCount = words.split('').length
        var container = document.querySelector('#model-choose .product-name')
        container.innerHTML = ''
        for (let i = 0; i < wordCount; i++) {
            let word = words[i];
            let element = document.createElement('span')
            let textEl = document.createTextNode(word)
            element.appendChild(textEl)
            container.appendChild(element)
        }
        t1.set('#model-choose .product-name span', { autoAlpha: 0 })
        t1.to('#model-choose .product-name span', { stagger: .1, autoAlpha: 1, duration: .3, ease: "Sine.easeOut" }, '>.8')
        t1.to('#model-choose .product-desc', { xPercent: 0, autoAlpha: 1, duration: .8, ease: "Expo.easeOut" }, '<')
        t1.to('#model-choose .product-model', { xPercent: 0, autoAlpha: 1, duration: .8, ease: "Expo.easeOut" }, '<.5')
    }
    return (
        <section id="model-choose">
            <div className="model-choose-swiper">
                <div className="overlay col-5 offset-1">
                    <div className="active-content mb-5">
                        <div>
                            <h5 className="product-name" data-text="configurator">configurator</h5>
                            <h2 className="mb-2 fw-600 product-desc">
                                create your
                            </h2>
                            <h2 className="mb-2 fw-600 product-model">
                                {models[activeSlideIndex].modelName}
                            </h2>
                        </div>
                        <div className="d-flex align-items-center mt-5">
                            <DiagonalButton
                                width="5.5rem"
                                height="5.5rem"
                                iconName="right-arrow"
                                className="me-4"
                                theme="dark"
                            />
                        </div>
                    </div>
                    <div className="custom-tab">
                        {
                            models.map((model, index) => (
                                <button
                                    key={index}
                                    className={activeSlideIndex === index && "active"}
                                    onClick={() => {
                                        swiperRef.current.swiper.slideTo(index)
                                        setActiveSlide(index)
                                    }
                                    }
                                >
                                    {model.modelName}
                                </button>
                            ))
                        }
                    </div>
                </div>
                <Swiper
                    ref={swiperRef}
                    className=""
                    spaceBetween={50}
                    slidesPerView={1}
                    effect={'fade'}
                    onActiveIndexChange={(...props) => animate()}
                    simulateTouch={false}
                >
                    {
                        models.map((model, index) => (
                            <SwiperSlide key={index}>
                                <div className="bg-image">
                                    <img src={model.modelImage} className="img-fluid background" />
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </section>
    );
}

export default ModelChoose;
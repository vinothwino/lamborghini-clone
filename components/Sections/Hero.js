import dynamic from 'next/dynamic'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectFade, Navigation, Pagination } from 'swiper';
import CarImage from 'assets/images/jpg/fluo_homepage_28_12.jpg'
import CarImage1 from 'assets/images/jpg/social_homepage_28_12.jpg'
import gsap from 'gsap'
import DiagonalButton from 'components/Button/DiagonalButton'
import { Row, Col } from 'react-bootstrap';
const all = dynamic(import('gsap/all'), { ssr: false })

SwiperCore.use([Navigation, Pagination, EffectFade]);

const Hero = () => {
    const animate = async (isSlided = false) => {
        let plugin = await all.render.preload()
        gsap.registerPlugin(plugin.TextPlugin, plugin.EasePack.ExpoScaleEase);
        let t1 = gsap.timeline()

        t1.set('#hero-section .swiper-slide-active .product-desc', { xPercent: -150, autoAlpha: 0 })
        t1.set('#hero-section .swiper-slide-active a', { scale: 0, autoAlpha: 0 })
        let words = document.querySelector("#hero-section .swiper-slide-active .product-name").getAttribute('data-text')
        let wordCount = words.split('').length
        var container = document.querySelector('#hero-section .swiper-slide-active .product-name')
        container.innerHTML = ''
        for (let i = 0; i < wordCount; i++) {
            let word = words[i];
            let element = document.createElement('span')
            let textEl = document.createTextNode(word)
            element.appendChild(textEl)
            container.appendChild(element)
        }
        t1.set('#hero-section .swiper-slide-active .product-name span', { autoAlpha: 0 })
        t1.to('#hero-section .swiper-slide-active .product-name span', { stagger: .1, autoAlpha: 1, duration: .3, ease: "Sine.easeOut" }, '>.8')
        t1.to('#hero-section .swiper-slide-active .product-desc', { xPercent: 0, autoAlpha: 1, duration: 1, ease: "Expo.easeOut" }, '<')
        t1.to('#hero-section .swiper-slide-active a', { scale: 1, autoAlpha: 1, duration: .6, ease: "Sine.easeOut", transformOrigin: '50% 50%' })
    }
    return (
        <section id="hero-section">
            <div className="product-swiper">
                <Swiper
                    className=""
                    spaceBetween={50}
                    slidesPerView={1}
                    effect={'fade'}
                    speed={1000}
                    // onSlideChange={(e) => animate()}
                    onActiveIndexChange={(...props) => animate(true)}
                    onSwiper={e => {
                        console.log(e)
                        animate()
                    }}
                    scrollbar={{ draggable: true }}
                    pagination={{ clickable: true }}
                >
                    <SwiperSlide>
                        <div className="bg-image">
                            <img src={CarImage} className="img-fluid background" />
                        </div>
                        <Row className="slide-overlay mx-0">
                            <Col xl="6" lg="7" sm="12" className="content offset-sm-1">
                                <div className="content-wrapper">
                                    <h5 className="product-name" data-text="AVENDATOR"></h5>
                                    <h1 className="product-desc">
                                        IT TAKES TIME<br />TO BECOME TIMELESS
                                    </h1>
                                    <DiagonalButton />
                                </div>
                            </Col>
                        </Row>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="bg-image">
                            <img src={CarImage1} className="img-fluid background" />
                        </div>
                        <Row className="slide-overlay mx-0">
                            <Col xl="6" lg="7" sm="12" className="content offset-sm-1">
                                <div className="content-wrapper">
                                    <h5 className="product-name" data-text="AVENDATOR"></h5>
                                    <h1 className="product-desc">
                                        IT TAKES TIME<br />TO BECOME TIMELESS
                                    </h1>
                                    <DiagonalButton />
                                </div>
                            </Col>
                        </Row>
                    </SwiperSlide>
                </Swiper>
            </div>
        </section>
    );
}

export default Hero;
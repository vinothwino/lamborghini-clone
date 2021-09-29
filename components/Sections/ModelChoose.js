import dynamic from 'next/dynamic'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectFade, Navigation, Pagination } from 'swiper';
import gsap from 'gsap'
import CarImage from 'assets/images/jpg/choose-model/Aventador.jpg'
import CarImage1 from 'assets/images/jpg/choose-model/Urus.jpg'
import CarImage2 from 'assets/images/jpg/choose-model/Huracan.jpg'
import DiagonalButton from 'components/Button/DiagonalButton'

const all = dynamic(import('gsap/all'), { ssr: false })
SwiperCore.use([Navigation, EffectFade]);

const ModelChoose = () => {
    return (
        <section id="model-choose">
            <div className="model-choose-swiper">
                <div className="overlay col-5 offset-1">
                    <div className="active-content mb-5">
                        <div>
                            <h5>configurator</h5>
                            <h2 className="mb-2 fw-600">
                                create your <br /> urus
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
                        <button className="active">
                            Aventador
                        </button>
                        <button>
                            Huracan
                        </button>
                        <button>
                            Urus
                        </button>
                    </div>
                </div>
                <Swiper
                    className=""
                    spaceBetween={50}
                    slidesPerView={1}
                    effect={'fade'}
                    speed={500}
                    // // onSlideChange={(e) => animate()}
                    // onActiveIndexChange={(...props) => animate(true)}
                    // onSwiper={e => {
                    //     console.log(e)
                    //     animate()
                    // }}
                    simulateTouch={false}
                >
                    <SwiperSlide>
                        <div className="bg-image">
                            <img src={CarImage} className="img-fluid background" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="bg-image">
                            <img src={CarImage1} className="img-fluid background" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="bg-image">
                            <img src={CarImage2} className="img-fluid background" />
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </section>
    );
}

export default ModelChoose;
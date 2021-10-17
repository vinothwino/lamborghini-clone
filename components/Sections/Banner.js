import BannerImg from 'assets/images/jpg/banner.jpg'
import DiagonalButton from 'components/Button/DiagonalButton'

const Banner = () => {
  return (
    <section id="banner">
      <img src={BannerImg} />
      <div className="overlay col-lg-5 col-md-12 offset-lg-1">
        <div className="active-content mb-5">
          <div>
            <h5>dealer locator</h5>
            <h2 className="mb-2 fw-600">
              find your <br /> country dealer
            </h2>
          </div>
          <div className="d-flex align-items-center mt-4">
            <DiagonalButton
              width="6rem"
              height="6rem"
              iconName="right-arrow"
              className="me-4"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
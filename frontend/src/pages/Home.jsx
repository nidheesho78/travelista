import heroImage from "../assets/images/pexels.png";
import { useNavigate } from "react-router-dom";
import LatestBlogs from '../components/LatestBlogs/LatestBlogs.jsx';
// import heroImage from "../assets/images/pexels.png";
// import heroImage from "../assets/images/pexels.png";


const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* Hero section */}
      <section className='hero__section pt-[60px] 2xl:h-[800px]'>
        <div className='container'>
          <div className='flex flex-col lg:flex-row gap-[90px] items-center justify-between'>
            {/* Hero content */}
            <div>
              <div className='lg:w-[570px]'>
                <h1 className='text-[36px] leading-[46px] text-headingColor font-[800] md:text-[60px] md:leading-[70px]'>
                  Share your memorable travel moments
                </h1>
                <p className='text__para'>
                  osnvoinviwevnowevioveoofhsibwivbibvibviwbvibv siovno noinvownnvw nvpwnvwinvo nvpwnvwinvovn
                  nvowenvinvov invownvo nvoinvoev
                </p>
                <button className='btn'  onClick={() => navigate('/users/create-blogs')}>Create Post</button>
              </div>
              {/* Hero counter */}
              <div className='mt-[30px] lg:mt-[70px] flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-[30px]'>
                {/* Add any counter content here if needed */}
              </div>
             
             
            </div>
            {/* Hero image */}
            <div className='flex gap-[30px] justify-end'>
              <img  className='' src={heroImage} alt="" />
            </div>
            <div className='mt-[30px]'>
              <img src={heroImage} alt='' className='w-full mb-[30px]' />
              <img src={heroImage} alt='' className='w-full mb-[30px]' />

            </div>
          </div>
        </div>
      </section>
            {/* Hero image */}
      <section>
        <div className='container'>
        <div className='xl:w-[470px] mx-auto'>
        <h2 className='heading text-center'>Latest Blogs</h2>
        </div>
        <LatestBlogs />
        </div>
      </section>
    </>
  );
};

export default Home;

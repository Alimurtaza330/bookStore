
import pic from "../Pics/front-view.jpg"

const Banner = () => {
    return (
        <>
            <div className="hero bg-zinc-400" style={{ minHeight: 'calc(100vh - 4.5rem)' }}>
                <div className="hero-content flex-col lg:flex-row-reverse w-full">
                    <img
                        src={pic}
                        className="max-w-sm rounded-lg shadow-2xl w-full lg:w-1/2" />
                    <div className='w-full lg:w-1/2'>
                        <h3 className="text-5xl font-bold text-center lg:text-left" >Welcome to online <span className='text-stone-500'>BookStore</span></h3>
                        <p className="py-6 text-center lg:text-left">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                        <div className="flex justify-center lg:justify-start">
                            <label className="input w-full lg:w-1/2 input-bordered flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="h-4 w-4 opacity-70">
                                    <path
                                        d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                    <path
                                        d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                                </svg>
                                <input type="text" className="grow" placeholder="Email" />
                            </label>
                        </div>
                        <div className="flex justify-center lg:justify-start">
                            <button className="btn mt-3 btn-primary">Get Started</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Banner

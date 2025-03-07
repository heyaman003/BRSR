import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
    return (
        <section className="w-full bg-gradient-to-b from-[#d8eee8] to-[#f3f7d9] mx-auto px-6 py-2">
            <div className="container md:flex items-center justify-center h-screen mx-auto">
                {/* Left Column - Text Content */}
                <div className="w-full md:w-1/2 mb-6 md:mb-0 text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-6xl font-bold text-[#333333] leading-tight mb-6">
                            Business<br />Responsibility and<br />Sustainability<br />Reporting
                        </h2>

                        {/* Animated underline */}
                        <div className="relative w-full md:w-3/4 h-16 mb-8">
                            <svg className="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
                                <motion.path
                                    d="M 0 45 Q 50 -30 100 45"
                                    fill="transparent"
                                    stroke="#4eba8b"
                                    strokeWidth="4"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 0.8, ease: "easeInOut" }}
                                />
                            </svg>
                        </div>


                        <p className="md:text-xl text-lg text-gray-700 mb-10 max-w-xl">
                            Streamline your Business Responsibility and Sustainability Reporting with our intuitive SaaS platform
                        </p>

                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Link
                                to="#get-started"
                                className="inline-block px-8 py-3 bg-[#4eba8b] text-white font-medium rounded-full hover:bg-[#45a77f] transition-colors"
                            >
                                Get Started
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Right Column - Image with Decorative Elements */}
                <div className="w-full md:w-1/2 flex justify-center md:justify-end relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative w-[80%] md:w-auto"
                    >
                        {/* Gray rectangle behind image */}
                        <div className="absolute -top-4 -left-4 right-4 bottom-4 bg-[#e9e9e9] rounded-2xl -z-10" />

                        {/* Gray square bottom */}
                        <motion.div className="absolute top-44 hidden md:block -left-24 w-14 h-14 bg-[#929292] rounded-lg -z-5"
                        animate={{rotate: 380}}
                        transition={{repeat: Infinity, duration: 8, ease: "linear"}}
                        ></motion.div>

                        <div className="absolute top-4 -left-32 w-44 h-16 bg-[#d1d0c6] rounded-xl -z-5"></div>
                        {/* Main image */}
                        <div className="relative md:w-[50vh] rounded-2xl overflow-hidden shadow-md -z-2">
                            <img
                                src="./banner.jpg"
                                alt=""
                                width={600}
                                height={450}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                        {/* Green pill shape */}
                        <div className="absolute top-9 -left-8 w-16 h-6 bg-[#4eba8b]/60 rounded-full " />

                        {/* Yellow square */}
                        <div className="absolute top-4 -right-2 w-12 h-12 bg-[#ffd84a]/80 rounded-lg -z-5" />

                        {/* Gray square bottom */}
                        <motion.div className="absolute hidden md:block -bottom-10 right-24 w-14 h-14 bg-[#929292] rounded-lg -z-5" 
                        animate={{rotate: 380}}
                        transition={{repeat: Infinity, duration: 12, ease: "linear"}}
                        />

                        {/* Yellow data card */}
                        <div className="absolute bottom-12 -left-6 w-24 h-16 bg-[#ffd84a]/80 rounded-lg -z-5 flex items-center justify-center">
                            <div className="w-4 h-3 flex flex-col gap-1 justify-center">
                                <div className="w-full h-2 bg-[#4eba8b]/70"></div>
                                <div className="w-full h-2 bg-[#4eba8b]/70"></div>
                                <div className="w-1/2 h-2 bg-[#4eba8b]/70"></div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;

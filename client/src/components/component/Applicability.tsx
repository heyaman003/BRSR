import { motion } from "framer-motion";

const boxes = [
    "Enhanced transparency and stakeholder trust",
    "Improved ESG risk management",
    "Strategic alignment with global sustainability trends",
    "Competitive advantage in ESG-conscious markets",
    "Foundation for innovation and long-term resilience",
];
const Applicability = () => {
    const images = [
        { src: "./public/app1.png", alt: "App 1" },
        { src: "./public/app2.png", alt: "App 2" },
        { src: "./public/app3.png", alt: "App 3" },
        { src: "./public/app4.png", alt: "App 4" },
    ];

    return (
        <div className="mx-auto py-16">
            <div className="mx-auto bg-gray-100">
                <div className="container mx-auto py-16 text-center overflow-hidden">
                    <h1 className="text-4xl mb-4 font-semibold">APPLICABILITY</h1>
                    <p className="text-2xl w-[70%] mx-auto">
                        Current Requirement: Top 1000 listed companies by market capitalization must file BRSR
                        reports
                    </p>
                    <div className="md:flex mt-16 mx-auto w-full justify-between gap-10 relative">
                        {images.map((img, index) => (
                            <motion.div
                                key={index}
                                className="relative w-1/5 flex justify-center"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.2 }}
                                viewport={{ once: true }}
                                style={{ top: index % 2 === 0 ? "30px" : "-30px" }} // Apply wave effect without clipping
                            >
                                <img src={img.src} alt={img.alt} className="w-full h-auto" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="my-10 mx-auto container text-center">
                <h1 className="text-4xl mb-4 font-semibold">SUBMISSION REQUIREMENTS</h1>
                <p className="text-2xl w-[70%] mx-auto">
                    Reports must be submitted as part of annual reports to SEBI, starting from financial year
                    2022-23. Companies are encouraged to adopt early for leadership in sustainability reporting.
                </p>
            </div>
            <div className="my-16 mx-auto container text-center">
                <h1 className="text-4xl mb-4 font-semibold">BUSINESS VALUE</h1>
                <p className="text-2xl w-[70%] mx-auto">
                    Advantages of BRSR
                </p>
                <div className="mx-auto my-16">
                    <img src="./public/business-val.svg" className="w-full" alt="" />
                </div>
            </div>

            <div className="mx-auto px-6 py-16 container text-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 justify-center">
                    {boxes.map((text, index) => (
                        <motion.div
                            key={index}
                            className="bg-[#30946D] text-white p-6 h-60 flex items-center justify-center rounded-lg shadow-lg"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.2 }}
                            viewport={{ once: true }}
                        >
                            <p className="text-lg font-medium">{text}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Applicability;

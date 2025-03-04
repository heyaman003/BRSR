import { motion } from "framer-motion"

const evolution = [
    {
        year: "2012",
        content: "SEBI introduces BRR as initial ESG disclosure requirement for listed entities",
    },
    {
        year: "2018",
        content: "MCA establishes committee to develop improved reporting formats based on NGRBCs",
    },
    {
        year: "2020",
        content: "Committee recommends BRSR as comprehensive update to BRR"
    },
    {
        year: "2022-23",
        content: "BRSR becomes mandatory for top 1000 listed companies"
    },
]
const Overview = () => {
    return (
        <div className="bg-gradient-to-t from-[#d8eee8] to-[#f3f7d9] mx-auto px-6 py-16">
            <div className="md:flex items-center justify-center container mx-auto">
                <div className="md:w-[40%]">
                    <div className="relative w-fit border-2 border-black">
                        <img src="./public/overview1.jpg" alt="" />
                        <img src="./public/overview2.png" className="absolute top-1/3 left-[60%]" alt="" />
                    </div>
                </div>
                <div className="md:w-[60%]">
                    <h1 className="text-4xl mb-4 font-semibold">Overview</h1>
                    <p className="text-2xl w-[70%]">
                        Business Responsibility and Sustainability Reporting (BRSR) represents SEBI’s enhanced
                        framework for non-financial disclosures, requiring comprehensive ESG reporting from listed
                        companies to promote transparency and sustainable business practices.
                    </p>
                </div>
            </div>
            <div className="container mt-16 mx-auto pt-16 text-center">
                <h1 className="text-4xl mb-8 font-semibold">Evolution</h1>
                <div className="flex flex-col items-center">
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 w-full"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }} // Ensures it triggers once when 20% is visible
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
                        }}
                    >
                        {evolution.map((item, index) => (
                            <motion.div
                                key={index}
                                className="flex flex-col items-center"
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut" } },
                                }}
                            >
                                {/* Card */}
                                <div className="w-60 h-80 p-6 bg-[#30946D] rounded-lg shadow-md border border-gray-200 text-center flex items-center justify-center">
                                    <p className="text-white">{item.content}</p>
                                </div>
                                {/* Year below the card */}
                                <h2 className="mt-4 text-2xl font-bold text-[#30946D]">{item.year}</h2>
                            </motion.div>
                        ))}
                    </motion.div>

                </div>
            </div>
        </div>
    )
}

export default Overview
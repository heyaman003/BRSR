import { useState } from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react";


export default function PrinciplesSlider() {
    const principles = {
        P1: {
            title: "Integrity and Ethics",
            title2: "P1 Integrity and Ethics",
            details: [
                "Training and awareness",
                "Conflict of interest involving directors/KMPs",
                "Disciplinary actions taken",
                "Penalty / punishment",
            ],
        },
        P2: {
            title: "Sustainability Products",
            title2: "P2 Sustainability Products",
            details: [
                "Sustainable Sourcing",
                "Reuse, recycle & disposal",
                "Life Cycle Assessment",
                "Investment in ESG technologies",
            ],
        },
        P3: {
            title: "Employee Well being",
            title2: "P3 Employee Well being",
            details: [
                "Equal opportunity policy",
                "Insurance and retirement benefits",
                "Grievances redressal",
                "Health & safety",
                "Incident Reporting",
            ],
        },
        P4: {
            title: "Stakeholder Interest",
            title2: "P4 Stakeholder Interest",
            details: [
                "Consultation between Stakeholders & board",
                "Identification of Stakeholders & marginalized/vulnerable groups",
                "Frequency of engagement",
            ],
        },
        P5: {
            title: "Human Rights",
            title2: "P5 Human Rights",
            details: [
                "Training on human rights",
                "Wages and remuneration",
                "Assessment on human rights",
                "Complaints and redressal mechanism",
            ],
        },
    };

    const CustomPrevArrow = ({ onClick }) => (
        <button
          onClick={onClick}
          className="absolute left-[-50px] top-1/2 transform -translate-y-1/2 border-2 border-[#4C8C68] text-[#4C8C68] p-3 rounded-full shadow-lg hover:bg-[#94C0AFE8] transition-all z-10"
        >
          <ChevronLeft size={20} />
        </button>
      );
    
      const CustomNextArrow = ({ onClick }) => (
        <button
          onClick={onClick}
          className="absolute right-[-50px] top-1/2 transform -translate-y-1/2 border-2 border-[#4C8C68] text-[#4C8C68] p-3 rounded-full shadow-lg hover:bg-[#94C0AFE8] transition-all z-10"
        >
          <ChevronRight size={20} />
        </button>
      );

    const settings = {
        dots: false, // No dots
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 2 },
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 1 },
            },
        ],
    };

    return (
        <div className="container mx-auto py-16 text-center">
            <h1 className="text-4xl mb-8 font-semibold">Comprehensive Mapping of key ESG Principles of BRSR</h1>
            <div className="mx-auto px-14">

                <Slider {...settings}>
                    {Object.entries(principles).map(([key, principle], index) => (
                        <CollapsibleCard key={index} id={key} principle={principle} />
                    ))}
                </Slider>
            </div>
        </div>
    );
}

function CollapsibleCard({ id, principle }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="px-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                {/* Large Green Section */}
                <div className="bg-[#4C8C68] text-center py-20 flex flex-col justify-center items-center rounded-t-xl">
                    <h2 className="text-3xl font-bold text-white">{id}</h2>
                    <h3 className="text-xl font-medium text-[#FFD54F] mt-2">
                        {principle.title}
                    </h3>
                </div>

                {/* Clickable Capsule Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="bg-[#4C8C68] mt-4 text-center py-3 w-full text-white text-sm font-semibold rounded-b-xl"
                >
                    {principle.title2}
                </button>

                {/* Expandable White Section */}
                <motion.div
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                >
                    <div className="p-5">
                        <ul className="text-[#E5B93D] text-xl space-y-3">
                            {principle.details.map((detail, i) => (
                                <li key={i} className="flex items-start space-x-2">
                                    <span className="w-2 h-2 bg-[#E5B93D] rounded-full mt-1"></span>
                                    <span>{detail}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

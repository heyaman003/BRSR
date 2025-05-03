import { FaInstagram, FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { Globe } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-green-900 text-white py-16">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">

                {/* Brand Info */}
                <div className="flex flex-col items-center md:items-start">
                    <div className="w-fit mx-auto">
                        <h2 className="text-2xl font-bold">BRSR Reporter</h2>
                        <p className="text-sm mt-2 max-w-xs opacity-90">
                            Simplifying sustainability reporting for businesses worldwide.
                        </p>
                    </div>
                </div>

                {/* Contact Section */}
                <div className="flex flex-col items-center md:items-center">
                <div className="flex flex-col items-center md:items-start">
                    <h2 className="text-2xl font-bold">Contact Us</h2>
                    <div className="mt-3 space-y-4  text-sm">
                        <div>
                            <p className="font-semibold">Kalolwala And Associates</p>
                            <a className="opacity-80" href="mailto:info@kalolwala.com">info@kalolwala.com</a>
                            <p className="opacity-80">+91 9096314764</p>
                        </div>
                        {/* <div>
                            <p className="font-semibold">Navdip Patel</p>
                            <a className="opacity-80" href="mailto:navdip@kalolwala.com">navdip@kalolwala.com</a>
                            <p className="opacity-80">+91 7621843450</p>
                        </div> */}
                    </div>
                    </div>
                </div>

                {/* Social Links */}
                <div className="flex flex-col items-center md:items-center">
                <div className="flex flex-col items-center md:items-start">
                    <h2 className="text-2xl font-bold">Follow Us</h2>
                    <div className="flex mt-4 space-x-6">
                        <a href="https://www.instagram.com/kalolwalaassociates?igsh=czhqeTJvdm1tc2Nz" target="_blank"><FaInstagram className="w-7 h-7 cursor-pointer hover:opacity-80 transition-opacity" /></a>
                        
                        <a href="https://www.facebook.com/share/15tCSbjiyR/" target="_blank"><FaFacebookF className="w-7 h-7 cursor-pointer hover:opacity-80 transition-opacity" /></a>

                        <a href="https://www.linkedin.com/company/kalolwala-associates-private-limited/" target="_blank"><FaLinkedinIn className="w-7 h-7 cursor-pointer hover:opacity-80 transition-opacity" /></a>

                        <a href="https://youtube.com/@kalolwalaassociates5465?si=r666Sb3rWJQC-1nO" target="_blank"><FaYoutube className="w-7 h-7 cursor-pointer hover:opacity-80 transition-opacity" /></a>
                        
                        <a href="https://www.kalolwala.com" target="_blank"><Globe className="w-7 h-7 cursor-pointer hover:opacity-80 transition-opacity" /></a>
                    </div>
                </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="text-center text-sm mt-12 opacity-80">
                © 2025 BRSR Reporter. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;

import { motion } from 'framer-motion';
import seenuImage from '../seenu_4k.png';

const Hero3D = () => {
    return (
        <div className="w-full h-[600px] lg:h-[700px] relative flex items-center justify-center z-10 overflow-visible">

            {/* Clean Background Shape - Minimal & Subtle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] lg:w-[600px] lg:h-[600px] opacity-40 pointer-events-none">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <defs>
                        <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#06b6d4" /> {/* Cyan-500 */}
                            <stop offset="100%" stopColor="#3b82f6" /> {/* Blue-500 */}
                        </linearGradient>
                    </defs>
                    <path fill="url(#blobGradient)" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-4.9C93.6,9.3,82.4,22.9,71.3,34.6C60.2,46.3,49.1,56,36.9,63.3C24.7,70.6,11.4,75.5,-1.2,77.6C-13.8,79.7,-26.9,79,-38.6,73.6C-50.3,68.2,-60.6,58.1,-69.2,46.5C-77.8,34.9,-84.7,21.8,-86.3,8.1C-87.9,-5.6,-84.2,-19.9,-75.7,-31.8C-67.2,-43.7,-53.9,-53.2,-40.8,-60.8C-27.7,-68.4,-14.8,-74.1,0.2,-74.5C15.2,-74.8,30.5,-69.8,44.7,-76.4Z" transform="translate(100 100)" />
                </svg>
            </div>

            {/* Secondary Blob - Very Subtle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] lg:w-[550px] lg:h-[550px] opacity-20 pointer-events-none mix-blend-screen">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full animate-blob">
                </svg>
            </div>

            {/* Main Container */}
            <div className="relative w-[320px] h-[320px] md:w-[400px] md:h-[400px]">

                {/* Image Mask - Clean Circle, No Border */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute inset-0 rounded-full overflow-hidden z-10"
                >
                    <img
                        src={seenuImage}
                        alt="Seenaiah"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                </motion.div>

            </div>
        </div>
    );
};

export default Hero3D;

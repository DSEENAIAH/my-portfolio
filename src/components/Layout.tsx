import React from 'react';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-dark text-light selection:bg-primary selection:text-white">
            {/* Ambient Background Glow */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-blob" />
                <div className="absolute top-[20%] right-[-10%] w-[30%] h-[30%] bg-accent-purple/20 rounded-full blur-[100px] animate-blob animation-delay-2000" />
                <div className="absolute bottom-[-10%] left-[20%] w-[35%] h-[35%] bg-accent-cyan/20 rounded-full blur-[120px] animate-blob animation-delay-4000" />
            </div>

            {/* Noise Texture Overlay */}
            <div className="fixed inset-0 z-[1] opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
            />

            {/* Main Content */}
            <main className="relative z-10">
                {children}
            </main>
        </div>
    );
};

export default Layout;

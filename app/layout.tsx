import type { Metadata } from "next";
import { Space_Grotesk, Orbitron, Poppins } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Siddhanth Tyagi | AI Robotics Engineer Portfolio",
  description: "Building Intelligent Autonomous Agricultural Robots using AI, Computer Vision and Embedded Systems.",
  keywords: ["AI Robotics", "Agro Robot", "ROS 2", "ESP32", "YOLOv8", "OpenCV", "Webots Simulation", "Autonomous Navigation"],
  authors: [{ name: "Siddhanth Tyagi" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} ${orbitron.variable} ${poppins.variable} font-sans bg-[#050505] text-white min-h-screen relative selection:bg-[#00FF88] selection:text-[#050505]`}
      >
        <div className="vignette" />
        {children}
      </body>
    </html>
  );
}

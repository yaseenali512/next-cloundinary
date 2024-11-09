"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const images = [
  "https://images.unsplash.com/photo-1515138692129-197a2c608cfd?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1704382002666-5dc4fbb522c0?q=80&w=1409&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1504871283652-485177543d73?q=80&w=1478&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="bg-[#DCD7FE]">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-200 to-slate-400 text-white h-48 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl text-black lg:text-5xl md:text-3xl font-semibold mb-2 typewriter ">
          AI Cloudinary
        </h1>
        <p className="text-base md:text-lg lg:text-2xl mb-4">
          Convert images and videos effortlessly. Compress, resize, and download
          in seconds.
        </p>
        <Link href={"/home"}>
          <button className="bg-gradient-to-r from-teal-400 to-blue-500 text-black py-2 px-4 rounded-lg text-lg transition hover:from-teal-500 hover:to-blue-600 font-bold">
            Get Started
          </button>
        </Link>
      </div>
      {/* Carousel Section */}
      <div className="relative max-w-4xl mx-auto mt-5 overflow-hidden rounded-lg shadow-lg bg-gray-200">
        <div className="relative h-96">
          <Image
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            layout="fill"
            objectFit="cover"
            className="transition-all duration-20"
          />
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={goToPrevious}
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-transparent text-white text-5xl p-4 hover:text-indigo-500 transition-all duration-300 focus:outline-none"
          aria-label="Previous Slide"
        >
          &#8592;
        </button>
        <button
          onClick={goToNext}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-transparent text-white text-5xl p-4 hover:text-indigo-500 transition-all duration-300 focus:outline-none"
          aria-label="Next Slide"
        >
          &#8594;
        </button>
      </div>
      {/* Feature Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold white">Our Services</h2>
          <p className="text-lg text-white mt-4">
            Upload your media files, select the format, and download your
            optimized content.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Image Conversion */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold text-gray-800">
              Image Conversion
            </h3>
            <p className="text-gray-700 mt-4">
              Easily convert images to various formats like Facebook, Instagram,
              Twitter, and more.
            </p>
            <Link href="/home">
              <button className="mt-6 bg-gradient-to-r from-teal-400 to-blue-500 text-white py-2 px-4 rounded-lg transition hover:from-teal-500 hover:to-blue-600">
                Convert Now
              </button>
            </Link>
          </div>

          {/* Video Compression */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold text-gray-800">
              Video Compression
            </h3>
            <p className="text-gray-700 mt-4">
              Upload videos, see a preview, compress them, and download the
              optimized version.
            </p>
            <Link href="/home">
              <button className="mt-6 bg-gradient-to-r from-teal-400 to-blue-500 text-white py-2 px-4 rounded-lg transition hover:from-teal-500 hover:to-blue-600">
                Upload Video
              </button>
            </Link>
          </div>

          {/* Preview and Download */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold text-gray-800">
              Preview & Download
            </h3>
            <p className="text-gray-700 mt-4">
              Preview your images and videos, and download them in the desired
              format.
            </p>
            <Link href="/home">
              <button className="mt-6 bg-gradient-to-r from-teal-400 to-blue-500 text-white py-2 px-4 rounded-lg transition hover:from-teal-500 hover:to-blue-600">
                Preview
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* Footer Section */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto text-center">
          <p className="text-sm">© 2024 AI Cloudinary. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

import React, { useEffect } from "react";
import StickyHeader from "./Stickyheader";
import AOS from "aos";
import "aos/dist/aos.css";

const HomePage = () => {
  useEffect(() => {
    AOS.init({ once: true, duration: 800, easing: "ease-in-out" });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F7FA] via-[#E8F5E9] to-[#E0F7FA] font-sans max-w-[1440px] mx-auto rounded-none md:rounded-[3%]">
      <StickyHeader />
      <main className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 py-12">
            <h1
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-center text-[#1A237E] mb-10"
            >
              Detect Deepfakes with Cutting-Edge AI
            </h1>

            <div className="grid grid-cols-12 gap-8 px-2 md:px-10">
              {/* Image 1 */}
              <div
                data-aos="zoom-in"
            className="col-span-12 md:col-span-6 rounded-3xl overflow-hidden bg-white shadow-xl border border-[#E0E3E7]"
              >
                <img
                  src="/image/ai-face.jpg"
                  alt="AI Interface"
                  className="w-full h-[240px] object-cover"
                />
              </div>

              {/* Image 2 */}
              <div
                data-aos="zoom-in"
                data-aos-delay="200"
            className="col-span-12 md:col-span-6 rounded-3xl overflow-hidden bg-white shadow-xl border border-[#E0E3E7]"
              >
                <img
                  src="/image/deepfake-tech.jpg"
                  alt="Deepfake Technology"
                  className="w-full h-[240px] object-cover"
                />
              </div>

              {/* Image 3 */}
              <div
                data-aos="fade-right"
            className="col-span-12 md:col-span-6 rounded-3xl overflow-hidden bg-white shadow-xl border border-[#E0E3E7]"
              >
                <img
                  src="/image/face-mesh.jpg"
                  alt="Wireframe face"
                  className="w-full h-[215px] object-cover"
                />
              </div>

              {/* Image Group */}
              <div
                className="col-span-12 md:col-span-6 relative flex justify-end"
                data-aos="fade-left"
              >
            <div className="absolute right-10 top-0 w-[241px] h-[249px] rounded-3xl overflow-hidden bg-white shadow-xl border border-[#E0E3E7] z-10">
                  <img
                    src="/image/face-scan-2.jpg"
                    alt="3D Scan"
                    className="w-full h-full object-cover"
                  />
                </div>
            <div className="absolute right-[200px] top-[82px] w-[189px] h-[238px] rounded-3xl overflow-hidden bg-white shadow-xl border border-[#E0E3E7] z-20">
                  <img
                    src="/image/face-scan-1.jpg"
                    alt="Face Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Description Box */}
              <div
                data-aos="fade-up"
                className="col-span-12 md:col-span-6 mt-10"
              >
                <div className="bg-white backdrop-blur-xl p-8 rounded-3xl text-lg leading-7 text-[#212121] shadow-xl border border-[#E0E3E7]">
                  <p>
                    <strong>DeepShield</strong> leverages state-of-the-art AI
                    and pretrained models to detect deepfakes with precision.
                    By analyzing facial features and measuring cosine similarity,
                    we ensure authenticity in digital media and help protect
                    against misinformation and manipulation.
                  </p>
                </div>
              </div>

              {/* AI Intelligence Image */}
              <div
                data-aos="zoom-in-up"
            className="col-span-12 md:col-span-6 mt-10 rounded-3xl overflow-hidden bg-white shadow-xl border border-[#E0E3E7]"
              >
                <img
                  src="/image/ai_intelligence.jpg"
                  alt="AI Intelligence"
                  className="w-full h-[360px] object-cover"
                />
              </div>
            </div>
      </main>

      <footer className="text-center py-5 bg-white/80 border-t border-[#E0E3E7] shadow-inner text-[#757575] mt-16">
        <p className="text-sm">
          ©2024 DeepShield. Protected by Google Privacy Policy & Terms of
          Service.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;

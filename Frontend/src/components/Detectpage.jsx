import React, { useEffect, useState } from "react";
import StickyHeader from "./Stickyheader";
import AOS from "aos";
import "aos/dist/aos.css";

const DetectPage = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [realFile, setRealFile] = useState(null);
  const [fakeFile, setFakeFile] = useState(null);
  const [result, setResult] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  const handleFileChange = (e, type) => {
    if (type === "real") setRealFile(e.target.files[0]);
    else setFakeFile(e.target.files[0]);
  };

  const handleCheckScore = async () => {
    if (!realFile || !fakeFile) {
      return;
    }

    setIsProcessing(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("realMedia", realFile);
      formData.append("fakeMedia", fakeFile);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
      
      const response = await fetch("https://deepfake-detection-sxos.onrender.com/detect", {
        method: "POST",
        body: formData,
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);

      if (!response.ok) throw new Error("Server error");

      const data = await response.json();
      setResult(data);
      setShowPopup(true);
    } catch (err) {
      // Show error popup
      setResult({
        is_likely_deepfake: false,
        similarity_score: 0,
        message: err.name === 'AbortError' 
          ? "Request timed out. Please try again with smaller images or check your connection."
          : "An error occurred. Please try again."
      });
      setShowPopup(true);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans mx-auto max-w-[1440px] overflow-hidden">
      <StickyHeader />

      <section className="p-6 md:p-12 max-w-5xl mx-auto">
        <h1
          className="text-3xl md:text-5xl font-bold text-center text-[#7C6CF6] mb-12"
          data-aos="fade-down"
        >
          Deepfake Detection Interface
        </h1>

        <div className="flex flex-col md:flex-row justify-center gap-10 mb-8">
          {/* Real File Upload */}
          <div
            className="flex-1 bg-[#7C6CF6]/10 p-6 shadow-lg border border-[#7C6CF6]/20 text-center"
            data-aos="fade-up"
          >
            <h2 className="text-xl font-semibold text-[#7C6CF6] mb-4">
              Real Image / Video
            </h2>
            <label
              htmlFor="real-media"
              className="cursor-pointer block bg-white hover:bg-[#7C6CF6]/10 transition border-2 border-dashed border-[#7C6CF6] hover:border-[#24E37A] hover:ring-4 hover:ring-[#24E37A] hover:ring-opacity-30 h-80 flex justify-center items-center overflow-hidden"
            >
              <input
                type="file"
                id="real-media"
                hidden
                onChange={(e) => handleFileChange(e, "real")}
              />
              {realFile ? (
                realFile.type.startsWith("image") ? (
                  <img
                    src={URL.createObjectURL(realFile)}
                    alt="Real Preview"
                    className="max-w-full max-h-full object-contain rounded-lg"
                  />
                ) : (
                  <span className="text-[#7C6CF6]">{realFile.name}</span>
                )
              ) : (
                <span className="text-[#7C6CF6]">Click to upload</span>
              )}
            </label>
          </div>

          {/* Fake File Upload */}
          <div
            className="flex-1 bg-[#24E37A]/10 p-6 shadow-lg border border-[#24E37A]/20 text-center"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h2 className="text-xl font-semibold text-[#24E37A] mb-4">
              Suspected Deepfake
            </h2>
            <label
              htmlFor="fake-media"
              className="cursor-pointer block bg-white hover:bg-[#24E37A]/10 transition border-2 border-dashed border-[#24E37A] hover:border-[#7C6CF6] hover:ring-4 hover:ring-[#7C6CF6] hover:ring-opacity-30 h-80 flex justify-center items-center overflow-hidden"
            >
              <input
                type="file"
                id="fake-media"
                hidden
                onChange={(e) => handleFileChange(e, "fake")}
              />
              {fakeFile ? (
                fakeFile.type.startsWith("image") ? (
                  <img
                    src={URL.createObjectURL(fakeFile)}
                    alt="Fake Preview"
                    className="max-w-full max-h-full object-contain rounded-lg"
                  />
                ) : (
                  <span className="text-[#24E37A]">{fakeFile.name}</span>
                )
              ) : (
                <span className="text-[#24E37A]">Click to upload</span>
              )}
            </label>
          </div>
        </div>


        <button
          className={`mx-auto block px-10 py-4 text-lg font-semibold shadow-lg transition-all duration-300 rounded-full ${
            isProcessing
              ? "bg-gray-500 text-white cursor-not-allowed opacity-75"
              : "bg-gradient-to-r from-[#24E37A] to-[#7C6CF6] text-white hover:from-[#7C6CF6] hover:to-[#24E37A] hover:ring-4 hover:ring-[#24E37A] hover:ring-opacity-30 hover:scale-105"
          }`}
          onClick={handleCheckScore}
          disabled={isProcessing}
          data-aos="zoom-in"
        >
          {isProcessing ? "Processing..." : "Check Similarity"}
        </button>
      </section>

      {/* Brain Icons */}
      <div className="absolute left-4 bottom-4 md:left-8 md:bottom-8 z-20">
        <img
          src="/Brain.svg"
          alt="brain left"
          className="w-10 h-10 md:w-12 md:h-12 opacity-60 hover:opacity-100 transition"
        />
      </div>
      <div className="absolute right-4 bottom-4 md:right-8 md:bottom-8 z-20">
        <img
          src="/Brain-1.svg"
          alt="brain right"
          className="w-10 h-10 md:w-12 md:h-12 opacity-60 hover:opacity-100 transition"
        />
      </div>

      {/* Footer */}
      <footer className="bg-[#7C6CF6]/10 text-center py-4 mt-12 text-[#7C6CF6] border-t border-[#7C6CF6]/20 shadow-inner text-sm">
        ©2024 All Rights Reserved. This site is protected by the Google Privacy Policy and Terms of Service apply.
      </footer>

      {/* Result Popup */}
      {showPopup && result && (
        <div className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-[#7C6CF6] p-8 shadow-2xl max-w-[90vw] w-[400px] text-center">
          <h3 className="text-xl font-bold mb-4 text-[#7C6CF6]">Detection Result</h3>
          <p className="mb-2 font-medium">
            <span className="text-[#7C6CF6]">Result: </span>
            <span
              className={`font-bold ${
                result.is_likely_deepfake ? "text-red-600" : "text-[#24E37A]"
              }`}
            >
              {result.is_likely_deepfake ? "Likely Deepfake" : "Likely Real"}
            </span>
          </p>
          <p className="mb-2">
            <strong>Similarity Score:</strong>{" "}
            {result.similarity_score ?? result.cosine_similarity}
          </p>
          <p className="mb-6 text-black font-bold">
            {result.message}
          </p>
          <div className="flex gap-3 justify-center">
            <button
              className="bg-gradient-to-r from-[#24E37A] to-[#7C6CF6] text-white px-6 py-2 hover:from-[#7C6CF6] hover:to-[#24E37A] hover:ring-4 hover:ring-[#24E37A] hover:ring-opacity-30 transition rounded-full font-semibold"
              onClick={() => {
                setShowPopup(false);
                setRealFile(null);
                setFakeFile(null);
                setResult(null);
              }}
            >
              Try Another Image
            </button>
            <button
              className="bg-gradient-to-r from-[#7C6CF6] to-[#24E37A] text-white px-6 py-2 hover:from-[#24E37A] hover:to-[#7C6CF6] hover:ring-4 hover:ring-[#7C6CF6] hover:ring-opacity-30 transition rounded-full font-semibold"
              onClick={() => {
                window.location.href = "/";
              }}
            >
              Home
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default DetectPage;

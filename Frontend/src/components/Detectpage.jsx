import React, { useEffect, useState } from "react";
import StickyHeader from "./Stickyheader";
import AOS from "aos";
import "aos/dist/aos.css";

const DetectPage = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [realFile, setRealFile] = useState(null);
  const [fakeFile, setFakeFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showSuggestion, setShowSuggestion] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  const handleFileChange = (e, type) => {
    setShowSuggestion(false);
    if (type === "real") setRealFile(e.target.files[0]);
    else setFakeFile(e.target.files[0]);
  };

  const handleCheckScore = async () => {
    if (!realFile || !fakeFile) {
      setError("Please upload both real and fake files.");
      return;
    }

    setIsProcessing(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("realMedia", realFile);
      formData.append("fakeMedia", fakeFile);

      const response = await fetch("http://localhost:8877/detect", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Server error");

      const data = await response.json();
      setResult(data);
      setShowPopup(true);
    } catch (err) {
      setError(err.message || "Unknown error");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] font-sans mx-auto max-w-[1440px] rounded-none md:rounded-[3%] overflow-hidden">
      <StickyHeader />

      <section className="p-6 md:p-12 max-w-5xl mx-auto">
        <h1
          className="text-3xl md:text-5xl font-bold text-center text-[#1A237E] mb-12"
          data-aos="fade-down"
        >
          Deepfake Detection Interface
        </h1>

        <div className="flex flex-col md:flex-row justify-center gap-10 mb-8">
          {/* Real File Upload */}
          <div
            className="flex-1 bg-white p-6 rounded-3xl shadow-lg border border-[#E0E3E7] text-center"
            data-aos="fade-up"
          >
            <h2 className="text-xl font-semibold text-[#1A237E] mb-4">
              Real Image / Video
            </h2>
            <label
              htmlFor="real-media"
              className="cursor-pointer block bg-[#F5F7FA] hover:bg-[#E3F2FD] transition border-2 border-dashed border-[#00ACC1] rounded-xl h-56 flex justify-center items-center overflow-hidden"
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
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <span className="text-[#212121]">{realFile.name}</span>
                )
              ) : (
                <span className="text-[#757575]">Click to upload</span>
              )}
            </label>
          </div>

          {/* Fake File Upload */}
          <div
            className="flex-1 bg-white p-6 rounded-3xl shadow-lg border border-[#E0E3E7] text-center"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h2 className="text-xl font-semibold text-[#1A237E] mb-4">
              Suspected Deepfake
            </h2>
            <label
              htmlFor="fake-media"
              className="cursor-pointer block bg-[#F5F7FA] hover:bg-[#E3F2FD] transition border-2 border-dashed border-[#00ACC1] rounded-xl h-56 flex justify-center items-center overflow-hidden"
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
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <span className="text-[#212121]">{fakeFile.name}</span>
                )
              ) : (
                <span className="text-[#757575]">Click to upload</span>
              )}
            </label>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-600 text-center font-medium mb-4">{error}</p>
        )}

        {/* Result Message */}
        {result && (
          <p className="text-green-600 text-center font-medium mb-4">
            {JSON.stringify(result)}
          </p>
        )}

        <button
          className={`mx-auto block px-10 py-3 rounded-xl text-lg font-semibold shadow-lg transition-all duration-300 ${
            isProcessing
              ? "bg-[#757575] text-white cursor-not-allowed"
              : "bg-[#00ACC1] text-white hover:bg-[#F9A825] hover:text-[#212121]"
          }`}
          onClick={handleCheckScore}
          disabled={isProcessing}
          data-aos="zoom-in"
        >
          {isProcessing ? "Processing..." : "Check Similarity Score"}
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
      <footer className="bg-white/80 text-center py-4 mt-12 text-[#757575] border-t border-[#E0E3E7] shadow-inner text-sm">
        ©2024 All Rights Reserved. This site is protected by the Google Privacy Policy and Terms of Service apply.
      </footer>

      {/* Result Popup */}
      {showPopup && result && (
        <div className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-[#00ACC1] rounded-2xl p-8 shadow-2xl max-w-[90vw] w-[360px] text-center">
          <h3 className="text-xl font-bold mb-4 text-[#1A237E]">Detection Result</h3>
          <p className="mb-2 font-medium">
            <span className="text-[#212121]">Result: </span>
            <span
              className={`font-bold ${
                result.is_likely_deepfake ? "text-red-600" : "text-green-600"
              }`}
            >
              {result.is_likely_deepfake ? "Likely Deepfake" : "Likely Real"}
            </span>
          </p>
          <p className="mb-2">
            <strong>Similarity Score:</strong>{" "}
            {result.similarity_score ?? result.cosine_similarity}
          </p>
          <p className="mb-4">
            <strong>Message:</strong> {result.message}
          </p>
          <button
            className="mt-2 bg-[#00ACC1] text-white px-6 py-2 rounded-lg hover:bg-[#F9A825] hover:text-[#212121] transition"
            onClick={() => {
              setShowPopup(false);
              setRealFile(null);
              setFakeFile(null);
              setResult(null);
              setError(null);
              setTimeout(() => setShowSuggestion(true), 200);
            }}
          >
            Close
          </button>
        </div>
      )}

      {/* Suggestion Prompt */}
      {showSuggestion && (
        <div className="mt-6 mx-auto text-center bg-[#e3f7fa] text-[#007c91] py-4 px-6 rounded-xl max-w-md font-medium shadow">
          Try uploading another sample to verify further.
        </div>
      )}
    </div>
  );
};

export default DetectPage;

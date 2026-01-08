"use client";

import React from "react";
import Script from "next/script";

const GoogleReviews = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="hr-container relative z-10">
        {/* Elfsight Google Reviews Widget */}
        <div
          className="elfsight-app-e6713a36-7ea1-4f7c-bbab-feee853fa214"
          data-elfsight-app-lazy
        />
      </div>
      <Script
        src="https://elfsightcdn.com/platform.js"
        strategy="lazyOnload"
      />
    </div>
  );
};

export default GoogleReviews;


import DefaultNavbar from "@/components/core/navbars/DefaultNavbar";
import DefaultFooter from "@/components/core/footer/DefaultFooter";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <DefaultNavbar />
      {children}
      <DefaultFooter />
    </div>
  );
};

export default layout;

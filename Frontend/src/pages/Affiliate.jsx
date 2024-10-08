import React from "react";

import AffiliateHero from "../components/Affiliate/AffiliateHero";
import AffiliateIntro from "../components/Affiliate/AffiliateIntro";
import AffiliatePage from "../components/Affiliate/AffiliatePage";

const Affiliate = () => {
  return (
    <div>
      {/* Your Affiliate page content here */}
      <AffiliateHero />  
        
      <AffiliateIntro />
      <AffiliatePage /> 
    </div>
  );
};

export default Affiliate; // Ensure this line is present

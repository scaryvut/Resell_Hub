
import ContactUs from "@/Component/ContactUs";
import HeroBanner from "@/Component/HeroBanner";
import MarketplaceStats from "@/Component/MarketplaceStats";
import SuccessStories from "@/Component/SuccessStory";
import SustainabilityImpact from "@/Component/SustainabilityImpact";
import TrustedSellers from "@/Component/TrustedSellers";

import Image from "next/image";

export default function Home() {
  return (
  <div>
    <HeroBanner></HeroBanner>
    <MarketplaceStats></MarketplaceStats>
    <SuccessStories></SuccessStories>
    <SustainabilityImpact></SustainabilityImpact>
    <TrustedSellers></TrustedSellers>
    <ContactUs></ContactUs>
  </div>
  );
}

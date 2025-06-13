import AboutUs from "@/Components/About";
import HomeBanner from "@/Components/HomeBanner";
import Product from "@/Components/Product";
import WhyChooseUs from "@/Components/WhyChooseUs";
import Category from "@/Components/Category";
import NewArrivingProductCarousel from "@/Components/Product/NewProduct";
import TestimonialSlider from "@/Components/Testimonial";
import ClientVisitSection from "@/Components/ClientVisitSection";

export default function Home() {
  return (
    <div>
      <HomeBanner />
      <AboutUs />
      <WhyChooseUs />
      <Category />
      <NewArrivingProductCarousel />
      <Product />
      {/* <PopularProductCarousel /> */}
      <ClientVisitSection />
      <TestimonialSlider />
    </div>
  );
}

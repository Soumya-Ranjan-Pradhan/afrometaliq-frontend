import AboutUs from "@/Components/About";
import HomeBanner from "@/Components/HomeBanner";
import Product from "@/Components/Product";
import TestimonialSlider from "@/Components/Testimonial";
import WhyChooseUs from "@/Components/WhyChooseUs";
import Category from "@/Components/Category";

export default function Home() {
  return (
    <div>
      <HomeBanner />
      <AboutUs />
      <WhyChooseUs />
      <Category />
      <Product />
      <TestimonialSlider />
    </div>
  );
}

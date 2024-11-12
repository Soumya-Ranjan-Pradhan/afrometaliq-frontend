import AboutUs from "@/Components/About";
import HomeBanner from "@/Components/HomeBanner";
import Product from "@/Components/Product";
import TestimonialSlider from "@/Components/Testimonial";
import WhyChooseUs from "@/Components/WhyChooseUs";
import Category from "@/Components/Category";
import PopularProductCarousel from "@/Components/Product/PopularProduct";
import NewArrivingProductCarousel from "@/Components/Product/NewProduct";

export default function Home() {
  return (
    <div>
      <HomeBanner />
      <AboutUs />
      <Category />
      <NewArrivingProductCarousel />
      <Product />
      <PopularProductCarousel />
      <WhyChooseUs />
      <TestimonialSlider />
    </div>
  );
}

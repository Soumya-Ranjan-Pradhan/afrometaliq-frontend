import ProductDetail from "./ProductDetail";

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <ProductDetail productId={params.id} />
    </>
  );
};

export default Page;

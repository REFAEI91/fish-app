import Product from "../components/Product";
import { useRouter } from "next/router";
import useSWRMutation from "swr/mutation";

export default function ProductDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  async function updateProduct(url, { arg }) {
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(arg),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      await response.json();
    } else {
      console.error(`Error: ${response.status}`);
    }
  }

  const { trigger, isMutating } = useSWRMutation(
    `/api/products/${id}`,
    updateProduct
  );
  async function handleEditProduct(event) {
    event.preventDefault();
    const fromData = new FormData(event.target);
    const productData = Object.fromEntries(fromData.entries());
    await trigger(productData);
    router.push(`/`);
  }
  async function handleDeleteProduct() {
    const response = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      await response.json();
      router.push(`/`);
    } else {
      console.error(`Error: ${response.status}`);
    }
  }
  if (isMutating) {
    return <p>Submitting your changes...</p>;
  }
  return (
    <Product onSubmit={handleEditProduct} onDelete={handleDeleteProduct} />
  );
}

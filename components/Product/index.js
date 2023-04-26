import useSWR from "swr";
import { useRouter } from "next/router";
import { StyledButton } from "../Button/Button.styled";
import { ProductCard } from "./Product.styled";

export default function Product() {
  const router = useRouter();
  const { id } = router.query;

  const { data } = useSWR(id ? `/api/products/${id}` : null);

  if (!data) {
    return <h1>Loading...</h1>;
  }

  return (
    <ProductCard>
      <h2>{data.name}</h2>
      <p>Description: {data.description}</p>
      <p>
        Price: {data.price} {data.currency}
      </p>
      {data.reviews && (
        <div>
          <h3>Reviews:</h3>
          {data.reviews.map((review) => (
            <div key={review.id}>
              <p>{review.title}</p>
              <p>{review.description}</p>
              <p>Rating: {review.rating}/5</p>
            </div>
          ))}
        </div>
      )}

      <StyledButton type="button" onClick={() => router.push("/")}>
        Back to all
      </StyledButton>
    </ProductCard>
  );
}

import { useLocation, useParams } from "@remix-run/react";

export default function PostDetail() {
  const params = useParams();
  const { state } = useLocation();
  return (
    <main>
      <h1>Product detail {params?.slug}</h1>
      <h4>Description {state?.description}</h4>
    </main>
  );
}

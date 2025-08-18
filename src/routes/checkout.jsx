import { createFileRoute } from "@tanstack/react-router";
import { CheckoutList } from "@/components";

export const Route = createFileRoute("/checkout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <h2 className="mb-8 scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Checkout
      </h2>
      <CheckoutList />
    </>
  );
}

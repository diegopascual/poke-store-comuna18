import { Outlet, createRootRoute } from "@tanstack/react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { NavBar } from "@/components";
import { BalanceProvider, CartProvider } from "@/providers";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <BalanceProvider>
        <CartProvider>
          <NavBar />
          <main className="mx-auto max-w-7xl p-8 pt-25 xl:px-0">
            <Outlet />
          </main>
        </CartProvider>
      </BalanceProvider>
      <ReactQueryDevtools initialIsOpen={false} />
      <TanStackRouterDevtools />
    </>
  );
}

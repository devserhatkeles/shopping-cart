import { Button, Stack } from "react-bootstrap";

import { HiOutlineMinusSm, HiOutlineX, HiPlusSm } from "react-icons/hi";
import { useShoppingCart } from "../context/ShoppingCartContext";
import storeItems from "../data/items.json";
import { formatCurrency } from "../utilities/formatCurrency";

interface CartItemProps {
  id: number;
  quantity: number;
}

export const CartItem = ({ id, quantity }: CartItemProps) => {
  const { removeFromCart, decreaseCartQuantity, increaseCartQuantity } =
    useShoppingCart();
  const item = storeItems.find((item) => item.id === id);
  if (!item) return null;

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={item.imgUrl}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {item.name}{" "}
          {quantity > 1 ? (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{quantity}
            </span>
          ) : null}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(item.price)}
        </div>
      </div>
      <div style={{ fontSize: "1rem" }}>
        {formatCurrency(item.price * quantity)}
      </div>
      <div style={{ display: "flex", gap: "3px" }}>
        <Button
          className="d-flex justify-content-center align-items-center"
          variant="outline-primary"
          size="sm"
          onClick={() => increaseCartQuantity(id)}
        >
          <HiPlusSm style={{ height: "1rem", width: "1rem" }} />
        </Button>
        <Button
          className="d-flex justify-content-center align-items-center"
          variant="outline-dark"
          size="sm"
          onClick={() => decreaseCartQuantity(id)}
        >
          <HiOutlineMinusSm style={{ height: "1rem", width: "1rem" }} />
        </Button>
        <Button
          className="d-flex justify-content-center align-items-center"
          variant="outline-danger"
          size="sm"
          onClick={() => removeFromCart(id)}
        >
          <HiOutlineX style={{ height: "1.25rem", width: "1rem" }} />
        </Button>
      </div>
    </Stack>
  );
};

export const capitalize = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1).replace(/-/g, " ");

export const formatNumberToFourDigits = (number) =>
  number.toString().padStart(4, "0");

export const formatPrice = ({ price, currency }) => {
  const intl = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  });

  return intl.format(price);
};

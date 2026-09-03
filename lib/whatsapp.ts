import { CartItem } from "@/store/cartStore";

export interface CustomerDetails {
  name: string;
  phone: string;
  address: string;
  city: string;
}

export function generateWhatsAppURL(
  items: CartItem[],
  customer: CustomerDetails
): string {
  const businessNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  if (!businessNumber) {
    throw new Error("WhatsApp business number not configured");
  }

  // Calculate totals
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Build order message
  let message = `*New Order from CuffKings Website*\n\n`;
  message += `*Customer Details:*\n`;
  message += `Name: ${customer.name}\n`;
  message += `Phone: ${customer.phone}\n`;
  message += `Address: ${customer.address}\n`;
  message += `City: ${customer.city}\n\n`;
  message += `*Order Items:*\n`;

  items.forEach((item, index) => {
    message += `\n${index + 1}. ${item.name}\n`;
    message += `   Material: ${item.material}\n`;
    message += `   Quantity: ${item.quantity}\n`;
    message += `   Price: Rs. ${item.price.toLocaleString()}\n`;
    message += `   Subtotal: Rs. ${(item.price * item.quantity).toLocaleString()}\n`;
  });

  message += `\n*Order Total: Rs. ${subtotal.toLocaleString()}*\n\n`;
  message += `Please confirm this order and let me know the delivery timeline.`;

  // URL encode the message
  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${businessNumber}?text=${encodedMessage}`;
}

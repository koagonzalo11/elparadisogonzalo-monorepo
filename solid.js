export function PayPalDonateButton() {
  return (
    <form
      action="https://www.paypal.com/donate"
      method="post"
      target="_blank"
      rel="noopener noreferrer"
    >
      <input type="hidden" name="business" value="koa@elparadisogonzalo.com" />
      <input type="hidden" name="currency_code" value="USD" />
      <button type="submit" style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
        Donate $5 to Gonzalo
      </button>
    </form>
  )
}
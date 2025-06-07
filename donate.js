document.addEventListener('DOMContentLoaded', function () {
  // Initialize Stripe with your publishable key (replace with your own key)
  const stripe = Stripe("pk_test_YourPublishableKeyHere");

  const donationForm = document.getElementById('donation-form');

  donationForm.addEventListener('submit', function (e) {
    e.preventDefault();
    
    // Get the donation amount in Rands from the input
    const donationInput = document.getElementById('donation-amount').value;
    
    // Stripe expects the amount in the smallest currency unit (cents)
    // Multiply by 100 and round to the nearest integer.
    const donationAmountCents = Math.round(parseFloat(donationInput) * 100);

    // Create a Checkout Session on your server with the donation amount and currency set to "zar"
    fetch('/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        donation_amount: donationAmountCents,
        currency: "zar"
      })
    })
    .then((response) => response.json())
    .then((session) => {
      if (session.id) {
        // Redirect to Stripe Checkout using the session ID
        return stripe.redirectToCheckout({ sessionId: session.id });
      } else {
        console.error("No Checkout Session ID returned.");
      }
    })
    .then((result) => {
      if (result.error) {
        // Inform the customer if there was an error.
        alert(result.error.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  });
});

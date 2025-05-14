document.addEventListener('DOMContentLoaded', function () {
  const mpButtons = document.querySelectorAll('.mp-button');
  mpButtons.forEach(button => {
    button.addEventListener('click', () => {
      const preferenceId = button.getAttribute('data-preference-id');
      if (!preferenceId) {
        console.error('MercadoPago preference ID missing');
        return;
      }
      const mp = new MercadoPago('YOUR_PUBLIC_KEY', {
        locale: 'pt-BR'
      });
      mp.checkout({
        preference: {
          id: preferenceId
        },
        autoOpen: true
      });
    });
  });
});

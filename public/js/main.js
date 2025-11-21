const loginButton = document.querySelector('#loginButton');
const loginModal = document.querySelector('#loginModal');
const submitLogin = document.querySelector('#submitLogin');

loginButton?.addEventListener('click', () => {
  loginModal?.classList.add('show');
});
window.addEventListener('click', (event) => {
  if (event.target === loginModal) {
    loginModal.classList.remove('show');
  }
});

submitLogin?.addEventListener('click', async (event) => {
  event.preventDefault(); // impede o form de recarregar a página antes da resposta

  const login = document.querySelector('#loginUser').value;
  const senha = document.querySelector('#loginPass').value;

  const response = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ login, senha })
  });
  if (response.redirected) {
    window.location.href = response.url; // recarrega a página já logado
  } else {
    alert('Login incorreto.');
  }
});

// async function carol() {
//   var p = new Promise((resolve, reject) => {
//     setTimeout(() => resolve(2), 3000);
//   });

//   var p2 = new Promise((resolve, reject) => {
//     setTimeout(() => resolve(2), 4000);
//   });

//   var p3 = new Promise((resolve, reject) => {
//     setTimeout(() => resolve(2), 5000);
//   });

//   var resultado = await Promise.race([p, p2, p3]);
//   console.log(resultado);
// }



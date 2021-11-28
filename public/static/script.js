
const menu = document.querySelector('.menuConfig');
const userMenu = document.querySelector('.userMenu');
// const menuMobile = document.querySelector('.menuMobile');
// alert('a')

menu.addEventListener('mouseover', (e) => {
  const isDropdownButton = e.target.matches('[data-dropdown-button]');
  if (!isDropdownButton && e.target.closest('[data-dropdown]') != null) return;

  let currentDropdown;
  if (isDropdownButton) {
    currentDropdown = e.target.closest('[data-dropdown]');
    currentDropdown.classList.toggle('activeClass');
  }

  document.querySelectorAll('[data-dropdown].activeClass').forEach((dropdown) => {
    if (dropdown === currentDropdown) return;
    dropdown.classList.remove('activeClass');
  });
});
menu.addEventListener('mouseleave', (e) => {
  document.querySelectorAll('[data-dropdown].activeClass').forEach((dropdown) => {
    dropdown.classList.remove('activeClass');
  });
});

userMenu.addEventListener('click', (e) => {
  const isDropdownButton = e.target.matches('[data-dropdown-button]');
  if (!isDropdownButton && e.target.closest('[data-dropdown]') != null) return;

  let currentDropdown;
  if (isDropdownButton) {
    currentDropdown = e.target.closest('[data-dropdown]');
    currentDropdown.classList.toggle('activeClass');
  }

  document.querySelectorAll('[data-dropdown].activeClass').forEach((dropdown) => {
    if (dropdown === currentDropdown) return;
    dropdown.classList.remove('activeClass');
  });
});
// menuMobile.addEventListener('click', (e) => {
//   const isDropdownButton = e.target.matches('[data-dropdown-button]');
//   if (!isDropdownButton && e.target.closest('[data-dropdown]') != null) return;

//   let currentDropdown;
//   if (isDropdownButton) {
//     currentDropdown = e.target.closest('[data-dropdown]');
//     currentDropdown.classList.toggle('activeClass');
//   }

//   document.querySelectorAll('[data-dropdown].activeClass').forEach((dropdown) => {
//     if (dropdown === currentDropdown) return;
//     dropdown.classList.remove('activeClass');
//   });
// });

// menu.addEventListener('mouseover', (e) => {
//   const isDropdownButton = e.target.matches('[data-dropdown-button]');
//   if (!isDropdownButton && e.target.closest('[data-dropdown]') != null) return;

//   let currentDropdown;
//   if (isDropdownButton) {
//     currentDropdown = e.target.closest('[data-dropdown]');
//     currentDropdown.classList.add('activeClass');
//     // alert()
//   }
//   if (!isDropdownButton && e.target.closest('[dropdown]') == null) {
//     document.querySelectorAll('[data-dropdown].activeClass').forEach((dropdown) => {
//       if (dropdown === currentDropdown) return;
//       dropdown.classList.remove('activeClass');
//     });
//   }
// });

// document.addEventListener('mouseleave', (e) => {
//   // const isDropdownButton = e.target.matches('[data-dropdown-button]');
//   // if (!isDropdownButton && e.target.closest('[data-dropdown]') != null) return;

//   // let currentDropdown;
//   // if (isDropdownButton) {
//   //   currentDropdown = e.target.closest('[data-dropdown]');
//   //   currentDropdown.classList.toggle('activeClass');
//   //   // alert()
//   // }

//   document.querySelectorAll('[data-dropdown].activeClass').forEach((dropdown) => {
//     // if (dropdown === currentDropdown) return;
//     dropdown.classList.remove('activeClass');
//   });
// });
// const menu = document.querySelector('.menuConfig');
// document.addEventListener('click', (e) => {
//   const isDropdownButton = e.target.matches('[data-dropdown-button]');
//   if (!isDropdownButton && e.target.closest('[data-dropdown]') != null) return;

//   let currentDropdown;
//   if (isDropdownButton) {
//     currentDropdown = e.target.closest('[data-dropdown]');
//     currentDropdown.classList.toggle('activeClass');
//   }

//   document.querySelectorAll('[data-dropdown].activeClass').forEach((dropdown) => {
//     if (dropdown === currentDropdown) return;
//     dropdown.classList.remove('activeClass');
//   });
// });

const menu = document.querySelector('.test');
menu.addEventListener('mouseover', (e) => {
  const isDropdownButton = e.target.matches('[data-dropdown-button]');
  if (!isDropdownButton && e.target.closest('[data-dropdown]') != null) return;

  let currentDropdown;
  if (isDropdownButton) {
    currentDropdown = e.target.closest('[data-dropdown]');
    currentDropdown.classList.add('activeClass');
    // alert()
  }

  // document.querySelectorAll('[data-dropdown].activeClass').forEach((dropdown) => {
  //   if (dropdown === currentDropdown) return;
  //   dropdown.classList.remove('activeClass');
  // });
});

document.addEventListener('mouseleave', (e) => {
  // const isDropdownButton = e.target.matches('[data-dropdown-button]');
  // if (!isDropdownButton && e.target.closest('[data-dropdown]') != null) return;

  // let currentDropdown;
  // if (isDropdownButton) {
  //   currentDropdown = e.target.closest('[data-dropdown]');
  //   currentDropdown.classList.toggle('activeClass');
  //   // alert()
  // }

  document.querySelectorAll('[data-dropdown].activeClass').forEach((dropdown) => {
    // if (dropdown === currentDropdown) return;
    dropdown.classList.remove('activeClass');
  });
});

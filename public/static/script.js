document.addEventListener('click', (e) => {
  const isDropdownButton = e.target.matches('[data-dropdown-button-user]');
  if (!isDropdownButton && e.target.closest('[data-dropdown-user]') != null) return;

  let currentDropdown;
  if (isDropdownButton) {
    currentDropdown = e.target.closest('[data-dropdown-user]');
    currentDropdown.classList.toggle('activeClass');
  }

  document.querySelectorAll('[data-dropdown-user].activeClass').forEach((dropdown) => {
    if (dropdown === currentDropdown) return;
    dropdown.classList.remove('activeClass');
  });
});

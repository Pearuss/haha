document.addEventListener('click', (e) => {
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

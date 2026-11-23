/* Homepage navbar session sync: kept separate so homepage rendering errors cannot block it. */
(async function syncLaunchpadHomeNavbar() {
  async function updateNavbar() {
    const actions = document.querySelector('.topbar .top-actions');
    if (!actions) return false;
    try {
      const response = await fetch('/api/me', {
        method: 'GET',
        credentials: 'same-origin',
        cache: 'no-store',
        headers: { 'Accept': 'application/json' }
      });
      if (!response.ok) return false;
      const data = await response.json();

      if (!data.authenticated || !data.user) {
        actions.innerHTML =
          '<a class="secondary-button header-access" href="/pages/student-login.html">Log in</a>' +
          '<a class="primary-button header-access" href="/pages/student-signup.html">Sign up</a>';
        return true;
      }

      const name = String(data.user.name || 'User').trim() || 'User';
      const avatarInitial = name.charAt(0).toUpperCase();
      actions.innerHTML = '';
      const identity = document.createElement('div');
      identity.className = 'auth-identity';
      identity.setAttribute('aria-label', 'Logged in as ' + name);

      const avatar = document.createElement('span');
      avatar.className = 'auth-avatar';
      avatar.setAttribute('aria-hidden', 'true');
      avatar.textContent = avatarInitial;

      const greeting = document.createElement('span');
      greeting.className = 'auth-greeting';
      greeting.textContent = 'Hi, ' + name;
      identity.append(avatar, greeting);

      const logout = document.createElement('button');
      logout.type = 'button';
      logout.className = 'secondary-button header-access';
      logout.textContent = 'Log out';
      logout.addEventListener('click', async function () {
        logout.disabled = true;
        try {
          const out = await fetch('/api/logout', {
            method: 'POST',
            credentials: 'same-origin',
            cache: 'no-store'
          });
          if (!out.ok) throw new Error('Logout failed');
          window.location.replace('/');
        } catch (error) {
          logout.disabled = false;
          alert('Logout failed. Please make sure the Flask server is running.');
        }
      });
      actions.append(identity, logout);
      return true;
    } catch (error) {
      console.error('Homepage navbar session check failed:', error);
      return false;
    }
  }

  // app.js renders the home page; run after it, then retry briefly in case rendering is delayed.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateNavbar, { once: true });
  } else {
    updateNavbar();
  }
  window.addEventListener('load', updateNavbar, { once: true });
})();

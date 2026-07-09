const createAnthemIcons = () => {
  if (window.lucide) {
    window.lucide.createIcons({ attrs: { 'aria-hidden': 'true' } });
  }
};

createAnthemIcons();

const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');

const normalizeAnthemChrome = () => {
  document.querySelectorAll('.brand-logo').forEach((logo) => {
    logo.src = 'assets/anthem-logo.png';
  });

  document.querySelectorAll('.nav-menu[aria-label="Services menu"]').forEach((menu) => {
    menu.innerHTML = `
      <a href="plumbing.html">Plumbing</a>
      <a href="water-heaters.html">Water Heaters</a>
      <a href="hvac.html">HVAC</a>
    `;
  });

  document.querySelectorAll('.nav-menu[aria-label="Locations menu"]').forEach((menu) => {
    menu.remove();
  });

  document.querySelectorAll('.footer-services').forEach((footerServices) => {
    footerServices.innerHTML = `
      <h2>Services</h2>
      <a href="plumbing.html"><i data-lucide="wrench"></i> Plumbing</a>
      <a href="water-heaters.html"><i data-lucide="droplets"></i> Water Heaters</a>
      <a href="hvac.html"><i data-lucide="thermometer-sun"></i> HVAC</a>
    `;
  });

  createAnthemIcons();
};

normalizeAnthemChrome();

menuButton?.addEventListener('click', () => {
  const isOpen = header.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.main-nav a, .header-actions a').forEach((link) => {
  link.addEventListener('click', () => {
    header.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

document.querySelectorAll('.main-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.main-nav a').forEach((item) => item.classList.remove('is-active'));
    link.classList.add('is-active');
  });
});

document.querySelectorAll('.nav-trigger').forEach((trigger) => {
  trigger.addEventListener('click', (event) => {
    if (trigger.tagName === 'A') return;
    event.preventDefault();
    const dropdown = trigger.closest('.nav-dropdown');
    if (!dropdown) return;

    const isOpen = dropdown.classList.contains('is-open');
    document.querySelectorAll('.nav-dropdown.is-open').forEach((item) => item.classList.remove('is-open'));
    dropdown.classList.toggle('is-open', !isOpen);
  });
});

document.addEventListener('click', (event) => {
  if (event.target.closest('.nav-dropdown')) return;
  document.querySelectorAll('.nav-dropdown.is-open').forEach((item) => item.classList.remove('is-open'));
});

const locationDetails = {
  boulder: {
    title: 'Anthem',
    copy: 'Anthem serves local homeowners with plumbing, heating, cooling, water heater, HVAC, and emergency help.',
    response: 'Same-day appointments may be available',
    services: 'Plumbing, heating, cooling, HVAC, water heaters',
    map: 'https://www.google.com/maps?q=Anthem%2C%20Arizona&output=embed',
    link: 'https://www.google.com/maps?q=Anthem%2C%20Arizona',
  },
  longmont: {
    title: 'Phoenix',
    copy: 'Anthem serves Phoenix homeowners with reliable plumbing, heating, cooling, water heater, HVAC, and emergency support.',
    response: 'Local scheduling available',
    services: 'Plumbing repairs, heating, cooling, HVAC',
    map: 'https://www.google.com/maps?q=Phoenix%2C%20Arizona&output=embed',
    link: 'https://www.google.com/maps?q=Phoenix%2C%20Arizona',
  },
  broomfield: {
    title: 'Glendale',
    copy: 'Anthem serves Glendale with plumbing repairs, heating, cooling, water heaters, HVAC, and emergency help.',
    response: 'Local scheduling available',
    services: 'Plumbing, heating, cooling, water heaters, HVAC',
    map: 'https://www.google.com/maps?q=Glendale%2C%20Arizona&output=embed',
    link: 'https://www.google.com/maps?q=Glendale%2C%20Arizona',
  },
  thornton: {
    title: 'Peoria',
    copy: 'Anthem serves Peoria with dependable plumbing, heating, cooling, water heater, HVAC, and urgent service support.',
    response: 'Appointments available by area route',
    services: 'Plumbing, heating, cooling, water heaters, HVAC',
    map: 'https://www.google.com/maps?q=Peoria%2C%20Arizona&output=embed',
    link: 'https://www.google.com/maps?q=Peoria%2C%20Arizona',
  },
  'commerce-city': {
    title: 'Scottsdale',
    copy: 'Anthem serves Scottsdale with plumbing repairs, heating, cooling, water heaters, HVAC, and emergency support.',
    response: 'Appointments available by area route',
    services: 'Plumbing, heating, cooling, water heaters, HVAC',
    map: 'https://www.google.com/maps?q=Scottsdale%2C%20Arizona&output=embed',
    link: 'https://www.google.com/maps?q=Scottsdale%2C%20Arizona',
  },
  lakewood: {
    title: 'Cave Creek',
    copy: 'Anthem serves Cave Creek with plumbing repairs, heating, cooling, water heaters, HVAC, and emergency help.',
    response: 'Local scheduling available',
    services: 'Plumbing, heating, cooling, water heaters, HVAC',
    map: 'https://www.google.com/maps?q=Cave Creek%2C%20Arizona&output=embed',
    link: 'https://www.google.com/maps?q=Cave Creek%2C%20Arizona',
  },
  arvada: {
    title: 'New River',
    copy: 'Anthem serves New River with dependable plumbing, heating, cooling, water heater, HVAC, and emergency service support.',
    response: 'Local scheduling available',
    services: 'Plumbing, heating, cooling, water heaters, HVAC',
    map: 'https://www.google.com/maps?q=New River%2C%20Arizona&output=embed',
    link: 'https://www.google.com/maps?q=New River%2C%20Arizona',
  },
  lafayette: {
    title: 'Deer Valley',
    copy: 'Anthem serves Deer Valley with plumbing repairs, heating, cooling, water heaters, HVAC, and emergency help.',
    response: 'Appointments available by area route',
    services: 'Plumbing, heating, cooling, water heaters, HVAC',
    map: 'https://www.google.com/maps?q=Deer Valley%2C%20Arizona&output=embed',
    link: 'https://www.google.com/maps?q=Deer Valley%2C%20Arizona',
  },
  louisville: {
    title: 'Louisville',
    copy: 'Nearby Anthem service area for clean, dependable plumbing, heating, and cooling work from a local team.',
    response: 'Fast local service when available',
    services: 'Plumbing, heating, cooling, emergency help',
    map: 'https://www.google.com/maps?q=Louisville%2C%20Arizona&output=embed',
    link: 'https://www.google.com/maps?q=Louisville%2C%20Arizona',
  },
  'anthem-main': {
    title: 'Anthem',
    copy: 'Anthem Air Conditioning & Plumbing Palm Desert provides plumbing, heating, cooling, water heater, and emergency service support.',
    response: 'Same-day appointments available',
    services: 'Plumbing, heating, cooling, HVAC, water heaters',
    map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106192.11715733845!2d-116.52661138359373!3d33.72178999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80daff53f41139d5%3A0x15faa6d51cc79841!2sAnthem%20Air%20Conditioning%20%26%20Plumbing%20Palm%20Desert!5e0!3m2!1sen!2sph!4v1783532755887!5m2!1sen!2sph',
    link: 'https://www.google.com/maps/search/?api=1&query=Anthem%20Air%20Conditioning%20%26%20Plumbing%20Palm%20Desert',
  },
  'anthem-club': {
    title: 'Anthem Club',
    copy: '6343 W 120th Avenue Suite 101 Glendale, AZ. Anthem Club supports nearby plumbing repairs and local service details.',
    response: 'Nearby service information',
    services: 'Plumbing repairs and local service details',
    map: 'https://www.google.com/maps?q=6343%20W%20120th%20Avenue%20Suite%20101%20Glendale%2C%20Arizona&output=embed',
    link: 'https://www.google.com/maps?q=6343%20W%20120th%20Avenue%20Suite%20101%20Glendale%2C%20Arizona',
  },
};

const bindAnthemContent = (root = document) => {
  createAnthemIcons();

  root.querySelectorAll('[data-service]:not([data-anthem-bound])').forEach((link) => {
    link.dataset.anthemBound = 'true';
    link.addEventListener('click', () => {
      const service = link.getAttribute('data-service');
      const input = document.querySelector(`input[name="service"][value="${service}"]`);
      const select = document.querySelector('select[name="service"]');
      if (input) input.checked = true;
      if (select) select.value = service;
    });
  });

  root.querySelectorAll('[data-review-toggle]:not([data-anthem-bound])').forEach((button) => {
    button.dataset.anthemBound = 'true';
    button.addEventListener('click', () => {
      button.classList.toggle('is-active');
    });
  });

  root.querySelectorAll('[data-location-button]:not([data-anthem-bound])').forEach((button) => {
    button.dataset.anthemBound = 'true';
    button.addEventListener('click', () => {
      const detail = locationDetails[button.dataset.location];
      if (!detail) return;

      document.querySelectorAll('[data-location-button]').forEach((item) => item.classList.remove('is-active'));
      button.classList.add('is-active');

      document.querySelector('[data-location-title]').textContent = detail.title;
      document.querySelector('[data-location-copy]').textContent = detail.copy;
      document.querySelector('[data-location-response]').textContent = detail.response;
      document.querySelector('[data-location-services]').textContent = detail.services;
      document.querySelector('[data-location-map]').src = detail.map;
      const locationLink = document.querySelector('[data-location-link]');
      if (locationLink) locationLink.href = detail.link;
    });
  });

  root.querySelectorAll('.location-hero-chips [data-location]:not([data-anthem-bound])').forEach((chip) => {
    chip.dataset.anthemBound = 'true';
    chip.addEventListener('click', (event) => {
      event.preventDefault();
      const detail = locationDetails[chip.dataset.location];
      if (!detail) return;

      const heroMap = document.querySelector('[data-hero-location-map]');
      const heroTitle = document.querySelector('[data-hero-location-title]');
      const heroCopy = document.querySelector('[data-hero-location-copy]');
      const heroResponse = document.querySelector('[data-hero-location-response]');
      const heroServices = document.querySelector('[data-hero-location-services]');

      document.querySelectorAll('.location-hero-chips [data-location]').forEach((item) => item.classList.remove('is-active'));
      chip.classList.add('is-active');

      if (heroMap) {
        heroMap.src = detail.map;
        heroMap.title = `${detail.title} service area map`;
      }
      if (heroTitle) heroTitle.textContent = `${detail.title}, AZ`;
      if (heroCopy) heroCopy.textContent = `Anthem provides trusted plumbing, heating, cooling, and HVAC service in ${detail.title}. Local experts. Fast response. Here when you need us.`;
      if (heroResponse) heroResponse.textContent = '24/7 Emergency Service';
      if (heroServices) heroServices.textContent = 'Licensed & Insured';
    });
  });

  root.querySelectorAll('.faq-accordion details:not([data-anthem-bound])').forEach((details) => {
    details.dataset.anthemBound = 'true';
    details.addEventListener('toggle', () => {
      if (!details.open) return;

      details.closest('.faq-accordion')?.querySelectorAll('details').forEach((item) => {
        if (item !== details) item.open = false;
      });
    });
  });

  root.querySelectorAll('[data-lead-form]:not([data-anthem-bound])').forEach((leadForm) => {
    leadForm.dataset.anthemBound = 'true';
    leadForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const data = new FormData(form);
      const name = String(data.get('name') || '').trim().split(' ')[0];
      const service = String(data.get('service') || 'service').toLowerCase();
      const message = form.querySelector('.form-message');

      message.textContent = `${name ? `Thanks, ${name}.` : 'Thanks.'} Your ${service} request is ready. Anthem can connect this form to email, CRM, or scheduling next.`;
      message.classList.add('is-visible');
      form.reset();
    });
  });
};

bindAnthemContent();
document.addEventListener('anthem:content-loaded', () => {
  normalizeAnthemChrome();
  bindAnthemContent();
});

const createAnthemIcons = () => {
  if (window.lucide) {
    window.lucide.createIcons({ attrs: { 'aria-hidden': 'true' } });
  }
};

createAnthemIcons();

const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');

const serviceMenuGroups = [
  {
    title: 'Plumbing',
    href: 'plumbing.html',
    links: [
      ['AC', 'services.html?service=ac'],
      ['Drain Cleaning', 'services.html?service=drain-cleaning'],
      ['Emergency Plumbing', 'services.html?service=emergency-plumbing'],
      ['Sewer Repair', 'services.html?service=sewer-repair'],
      ['Waterline Repair', 'services.html?service=waterline-repair'],
      ['Water Heater Repair', 'services.html?service=water-heater-repair'],
      ['Gas Line Repair', 'services.html?service=gas-line-repair'],
      ['Water Softener Installation', 'services.html?service=water-softener-installation'],
      ['Hydro Jetting', 'services.html?service=hydro-jetting'],
    ],
  },
  {
    title: 'Cooling',
    href: 'cooling.html',
    links: [
      ['AC Repair', 'services.html?service=ac-repair'],
      ['AC Replacement', 'services.html?service=ac-replacement'],
      ['AC Installation', 'services.html?service=ac-installation'],
      ['Insulation', 'services.html?service=insulation'],
      ['Air Duct Cleaning', 'services.html?service=air-duct-cleaning'],
    ],
  },
  {
    title: 'Heating',
    href: 'heating.html',
    links: [
      ['Furnace Repair', 'services.html?service=furnace-repair'],
      ['Furnace Replacement', 'services.html?service=furnace-replacement'],
      ['Heater Repair', 'services.html?service=heater-repair'],
      ['Heat Pump Repair', 'services.html?service=heat-pump-repair'],
    ],
  },
];

const locationMenuItems = [
  ['Palm Springs', 'palm-springs'],
  ['Palm Desert', 'palm-desert'],
  ['Indio', 'indio'],
  ['Cathedral City', 'cathedral-city'],
  ['La Quinta', 'la-quinta'],
  ['Coachella', 'coachella'],
  ['Desert Hot Springs', 'desert-hot-springs'],
  ['Rancho Mirage', 'rancho-mirage'],
];

const normalizeAnthemChrome = () => {
  document.querySelectorAll('.brand-logo').forEach((logo) => {
    logo.src = 'assets/anthem-logo.png';
  });

  document.querySelectorAll('.nav-menu[aria-label="Services menu"]').forEach((menu) => {
    menu.classList.remove('service-mega-menu');
    menu.innerHTML = `
      <a href="plumbing.html">Plumbing</a>
      <a href="ac.html">AC</a>
      <a href="heater.html">Heater</a>
    `;
  });

  document.querySelectorAll('.nav-menu[aria-label="Locations menu"]').forEach((menu) => {
    menu.innerHTML = locationMenuItems.map(([label, slug]) => `<a href="locations.html?location=${slug}">${label}</a>`).join('');
  });

  document.querySelectorAll('.footer-services').forEach((footerServices) => {
    footerServices.innerHTML = `
      <h2>Services</h2>
      <a href="plumbing.html"><i data-lucide="wrench"></i> Plumbing</a>
      <a href="ac.html"><i data-lucide="snowflake"></i> AC</a>
      <a href="heater.html"><i data-lucide="flame"></i> Heater</a>
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

const makeLocationDetail = (title) => ({
  title,
  copy: `Anthem Air Conditioning & Plumbing serves ${title} with plumbing, cooling, heating, water heater, and emergency service support.`,
  response: 'Same-day appointments may be available',
  services: 'Plumbing, cooling, heating, water heaters, emergency service',
  map: `https://www.google.com/maps?q=${encodeURIComponent(`${title}, CA`)}&output=embed`,
  link: `https://www.google.com/maps?q=${encodeURIComponent(`${title}, CA`)}`,
});

const locationDetails = Object.fromEntries(locationMenuItems.map(([title, slug]) => [slug, makeLocationDetail(title)]));
locationDetails['anthem-main'] = {
  title: 'Anthem',
  copy: 'Anthem Air Conditioning & Plumbing Palm Desert provides plumbing, heating, cooling, water heater, and emergency service support.',
  response: 'Same-day appointments available',
  services: 'Plumbing, heating, cooling, HVAC, water heaters',
  map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106192.11715733845!2d-116.52661138359373!3d33.72178999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80daff53f41139d5%3A0x15faa6d51cc79841!2sAnthem%20Air%20Conditioning%20%26%20Plumbing%20Palm%20Desert!5e0!3m2!1sen!2sph!4v1783532755887!5m2!1sen!2sph',
  link: 'https://www.google.com/maps/search/?api=1&query=Anthem%20Air%20Conditioning%20%26%20Plumbing%20Palm%20Desert',
};

const getCurrentLocationSlug = () => {
  const requested = new URLSearchParams(window.location.search).get('location');
  return locationDetails[requested] ? requested : 'palm-springs';
};

const setLocationDisplay = (slug) => {
  const detail = locationDetails[slug];
  if (!detail) return;

  document.querySelectorAll('[data-location-button], .location-hero-chips [data-location]').forEach((item) => {
    item.classList.toggle('is-active', item.dataset.location === slug);
  });

  const title = document.querySelector('[data-location-title]');
  const copy = document.querySelector('[data-location-copy]');
  const response = document.querySelector('[data-location-response]');
  const services = document.querySelector('[data-location-services]');
  const map = document.querySelector('[data-location-map]');
  const link = document.querySelector('[data-location-link]');
  const heroMap = document.querySelector('[data-hero-location-map]');
  const heroTitle = document.querySelector('[data-hero-location-title]');
  const heroCopy = document.querySelector('[data-hero-location-copy]');
  const heroResponse = document.querySelector('[data-hero-location-response]');
  const heroServices = document.querySelector('[data-hero-location-services]');

  if (title) title.textContent = detail.title;
  if (copy) copy.textContent = detail.copy;
  if (response) response.textContent = detail.response;
  if (services) services.textContent = detail.services;
  if (map) map.src = detail.map;
  if (link) link.href = detail.link;
  if (heroMap) {
    heroMap.src = detail.map;
    heroMap.title = `${detail.title} service area map`;
  }
  if (heroTitle) heroTitle.textContent = `${detail.title}, CA`;
  if (heroCopy) heroCopy.textContent = `Anthem provides trusted plumbing, cooling, heating, and water heater service in ${detail.title}. Local experts. Fast response. Here when you need us.`;
  if (heroResponse) heroResponse.textContent = detail.response;
  if (heroServices) heroServices.textContent = detail.services;
};

const normalizeLocationInterfaces = (root = document) => {
  const locationButtons = locationMenuItems.map(([title, slug]) => `
    <button class="location-button" type="button" data-location-button data-location="${slug}">
      <i data-lucide="map-pin"></i>
      <span><strong>${title}</strong><small>California</small></span>
    </button>
  `).join('');

  const locationChips = locationMenuItems.map(([title, slug]) => `
    <button type="button" data-location="${slug}">${title}</button>
  `).join('');

  root.querySelectorAll('.location-list').forEach((list) => {
    list.innerHTML = locationButtons;
  });
  root.querySelectorAll('.location-hero-chips').forEach((chips) => {
    chips.innerHTML = locationChips;
  });
  setLocationDisplay(getCurrentLocationSlug());
  createAnthemIcons();
};

const bindAnthemContent = (root = document) => {
  createAnthemIcons();
  if (document.body.classList.contains('locations-reference-page')) {
    normalizeLocationInterfaces(root);
  }

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
      setLocationDisplay(button.dataset.location);
    });
  });

  root.querySelectorAll('.location-hero-chips [data-location]:not([data-anthem-bound])').forEach((chip) => {
    chip.dataset.anthemBound = 'true';
    chip.addEventListener('click', (event) => {
      event.preventDefault();
      setLocationDisplay(chip.dataset.location);
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

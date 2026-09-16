/**
 * Hero flavour cycling.
 *
 * PROGRESSIVE ENHANCEMENT. The markup renders every flavour's can and
 * ingredient list, with the lead one visible and the controls hidden. This
 * script reveals the controls and switches between them. With JavaScript off
 * the hero is exactly what it was before: the lead flavour, no controls, no
 * dead buttons.
 *
 * The colour field replays its fill-from-the-bottom on every change, in the new
 * flavour's colour. That is deliberate and is the one place the site animates
 * on interaction: it is user-initiated, it communicates the change, and it is
 * the same gesture the page already makes on load rather than a new one.
 *
 * Under prefers-reduced-motion the colour still changes, instantly. The point
 * of the animation is to signal the switch, and the switch is already obvious
 * from the can and the list.
 */

const DURATION = 700;
const EASING = 'cubic-bezier(0.2, 0.7, 0.3, 1)';

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const setUp = (root: HTMLElement): void => {
  const cans = [...root.querySelectorAll<HTMLElement>('[data-flavor-can]')];
  const panels = [...root.querySelectorAll<HTMLElement>('[data-flavor-panel]')];
  const field = root.querySelector<HTMLElement>('[data-flavor-field]');
  const controls = root.querySelector<HTMLElement>('[data-flavor-controls]');
  const nameEl = root.querySelector<HTMLElement>('[data-flavor-current]');
  const prev = root.querySelector<HTMLButtonElement>('[data-flavor-prev]');
  const next = root.querySelector<HTMLButtonElement>('[data-flavor-next]');

  // One flavour is not a carousel.
  if (cans.length < 2 || !controls || !prev || !next) return;

  let index = 0;

  const show = (to: number, animate: boolean): void => {
    index = (to + cans.length) % cans.length;

    cans.forEach((el, i) => { el.hidden = i !== index; });
    panels.forEach((el, i) => { el.hidden = i !== index; });

    const active = cans[index]!;
    const color = active.dataset.canColor;
    const name = active.dataset.canName ?? '';

    if (nameEl) nameEl.textContent = name;
    prev.setAttribute('aria-label', `Previous flavour, currently ${name}`);
    next.setAttribute('aria-label', `Next flavour, currently ${name}`);

    if (field && color) {
      field.style.setProperty('--field', color);
      // Replay the fill. Web Animations rather than a class toggle, because it
      // restarts reliably without a forced reflow and is trivial to skip.
      if (animate && !prefersReducedMotion()) {
        field.animate(
          [{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }],
          { duration: DURATION, easing: EASING, fill: 'both' }
        );
      }
    }
  };

  // Controls are inert until there is a script to drive them.
  controls.hidden = false;

  prev.addEventListener('click', () => show(index - 1, true));
  next.addEventListener('click', () => show(index + 1, true));

  // Arrow keys, once focus is inside the control cluster.
  controls.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); show(index - 1, true); }
    if (event.key === 'ArrowRight') { event.preventDefault(); show(index + 1, true); }
  });

  show(0, false);
};

document
  .querySelectorAll<HTMLElement>('[data-flavor-carousel]')
  .forEach(setUp);

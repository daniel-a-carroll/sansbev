/**
 * Hero flavour cycling.
 *
 * PROGRESSIVE ENHANCEMENT. The markup renders every flavour's can and
 * ingredient list, with the lead one visible and the controls hidden. This
 * script reveals the controls and switches between them. With JavaScript off
 * the hero is exactly what it was before: the lead flavour, no controls, no
 * dead buttons.
 *
 * THE TRANSITION. The outgoing can slides out of the coloured stage and the
 * incoming one slides in from the opposite side, while the colour field
 * replays its fill in the new flavour's colour. The stage clips, so a can
 * leaving simply disappears at the colour's edge instead of tracking across the
 * page.
 *
 * Direction follows the button: next sends the old can left and brings the new
 * one in from the right, previous mirrors it. A carousel that always moved the
 * same way would feel wrong going backwards.
 *
 * Under prefers-reduced-motion nothing moves or fades. The can and the list
 * swap instantly and the colour changes instantly, which is already an
 * unmistakable change of state.
 */

const FIELD_MS = 700;
const OUT_MS = 300;
const IN_MS = 380;
/** The new can waits for the old one to clear, so the two never read as a pair. */
const IN_DELAY_MS = 130;
const EASING = 'cubic-bezier(0.2, 0.7, 0.3, 1)';
const OFFSET = '130%';

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const setUp = (root: HTMLElement): void => {
  const cans = [...root.querySelectorAll<HTMLElement>('[data-flavor-can]')];
  const panels = [...document.querySelectorAll<HTMLElement>('[data-flavor-panel]')];
  const field = root.querySelector<HTMLElement>('[data-flavor-field]');
  const wipe = root.querySelector<HTMLElement>('[data-flavor-wipe]');
  const controls = root.querySelector<HTMLElement>('[data-flavor-controls]');
  const nameEl = root.querySelector<HTMLElement>('[data-flavor-current]');
  const prev = root.querySelector<HTMLButtonElement>('[data-flavor-prev]');
  const next = root.querySelector<HTMLButtonElement>('[data-flavor-next]');

  // One flavour is not a carousel.
  if (cans.length < 2 || !controls || !prev || !next) return;

  let index = 0;
  let running: Animation[] = [];

  /** Rapid clicking must not leave a half-slid can behind. */
  const settle = (): void => {
    running.forEach((a) => a.cancel());
    running = [];
    if (wipe) wipe.style.removeProperty('--wipe');
    cans.forEach((can) => {
      can.hidden = Number(can.dataset.flavorCan) !== index;
      can.style.transform = '';
      can.style.opacity = '';
    });
  };

  const label = (name: string): void => {
    if (nameEl) nameEl.textContent = name;
    prev.setAttribute('aria-label', `Previous flavour, currently ${name}`);
    next.setAttribute('aria-label', `Next flavour, currently ${name}`);
  };

  /**
   * The incoming colour rises OVER the outgoing one rather than the field
   * scaling up from nothing. Scaling a single layer left the cream page
   * showing behind the can for the first few hundred milliseconds, which read
   * as the can floating rather than as the colour changing.
   */
  const paintField = (color: string | undefined, animate: boolean): void => {
    if (!field || !color) return;

    if (!animate || !wipe) {
      field.style.setProperty('--field', color);
      return;
    }

    wipe.style.setProperty('--wipe', color);
    const rise = wipe.animate(
      [{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }],
      { duration: FIELD_MS, easing: EASING, fill: 'both' }
    );
    running.push(rise);
    rise.finished
      .then(() => {
        // Hand the colour down to the base, then reset the wipe. Both are the
        // same colour at this instant, so the swap is invisible.
        field.style.setProperty('--field', color);
        rise.cancel();
      })
      .catch(() => { /* superseded by a newer change */ });
  };

  const show = (to: number, direction: number): void => {
    const from = index;
    const target = (to + cans.length) % cans.length;
    if (target === from) return;

    settle();
    index = target;

    const outgoing = cans[from]!;
    const incoming = cans[index]!;
    const name = incoming.dataset.canName ?? '';

    panels.forEach((el) => {
      el.hidden = Number(el.dataset.flavorPanel) !== index;
    });
    label(name);

    if (prefersReducedMotion()) {
      outgoing.hidden = true;
      incoming.hidden = false;
      paintField(incoming.dataset.canColor, false);
      return;
    }

    paintField(incoming.dataset.canColor, true);

    // Leaving: slide out of the stage and vanish at the colour's edge.
    const exit = direction > 0 ? `-${OFFSET}` : OFFSET;
    const outAnim = outgoing.animate(
      [
        { transform: 'translateX(0)', opacity: 1 },
        { transform: `translateX(${exit})`, opacity: 0 },
      ],
      { duration: OUT_MS, easing: EASING, fill: 'both' }
    );
    running.push(outAnim);
    outAnim.finished
      .then(() => {
        // Only tidy up if this is still the can that left.
        if (cans[index] !== outgoing) {
          outgoing.hidden = true;
          outgoing.style.transform = '';
          outgoing.style.opacity = '';
        }
      })
      .catch(() => { /* cancelled by a newer click; settle() already tidied */ });

    // Arriving: in from the opposite side.
    const entry = direction > 0 ? OFFSET : `-${OFFSET}`;
    incoming.hidden = false;
    running.push(
      incoming.animate(
        [
          { transform: `translateX(${entry})`, opacity: 0 },
          { transform: 'translateX(0)', opacity: 1 },
        ],
        { duration: IN_MS, delay: IN_DELAY_MS, easing: EASING, fill: 'both' }
      )
    );
  };

  // Inert until there is a script to drive them.
  controls.hidden = false;
  label(cans[0]!.dataset.canName ?? '');

  prev.addEventListener('click', () => show(index - 1, -1));
  next.addEventListener('click', () => show(index + 1, 1));

  controls.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); show(index - 1, -1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); show(index + 1, 1); }
  });
};

document
  .querySelectorAll<HTMLElement>('[data-flavor-carousel]')
  .forEach(setUp);

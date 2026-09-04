/**
 * Progressive enhancement for every form on the site.
 *
 * The forms work fully without this file — they post natively and the Worker
 * redirects to /thank-you. This upgrades them to inline async submission with
 * field-level errors, and no page navigation.
 *
 * Deliberately dependency-free and small. It attaches to any [data-form] and
 * needs no per-form configuration.
 */

interface ErrorResponse {
  ok: false;
  errors?: Record<string, string>;
  formError?: string;
}

type SubmitResponse = { ok: true } | ErrorResponse;

const setFieldError = (form: HTMLFormElement, field: string, message: string): void => {
  const el = form.querySelector<HTMLElement>(`[data-error-for="${CSS.escape(field)}"]`);
  const control = form.querySelector<HTMLElement>(`[data-field="${CSS.escape(field)}"]`);
  if (el) {
    el.textContent = message;
    el.hidden = false;
  }
  control?.closest('.field')?.setAttribute('data-invalid', 'true');
  control?.setAttribute('aria-invalid', 'true');
};

const clearErrors = (shell: HTMLElement, form: HTMLFormElement): void => {
  form.querySelectorAll<HTMLElement>('[data-error-for]').forEach((el) => {
    el.textContent = '';
    el.hidden = true;
  });
  form.querySelectorAll('.field[data-invalid]').forEach((el) =>
    el.removeAttribute('data-invalid')
  );
  form.querySelectorAll('[aria-invalid]').forEach((el) =>
    el.removeAttribute('aria-invalid')
  );
  const summary = shell.querySelector<HTMLElement>('[data-error-summary]');
  if (summary) summary.hidden = true;
};

const showSummary = (
  shell: HTMLElement,
  form: HTMLFormElement,
  errors: Record<string, string>
): void => {
  const summary = shell.querySelector<HTMLElement>('[data-error-summary]');
  const list = shell.querySelector<HTMLElement>('[data-error-list]');
  if (!summary || !list) return;

  list.replaceChildren(
    ...Object.entries(errors).map(([field, message]) => {
      const li = document.createElement('li');
      const control = form.querySelector<HTMLElement>(`[data-field="${CSS.escape(field)}"]`);

      // Link each problem to its field so a keyboard user lands on it directly.
      if (control?.id) {
        const a = document.createElement('a');
        a.href = `#${control.id}`;
        a.textContent = message;
        a.addEventListener('click', (event) => {
          event.preventDefault();
          control.focus();
        });
        li.append(a);
      } else {
        li.textContent = message;
      }
      return li;
    })
  );

  summary.hidden = false;
  summary.focus();
};

/**
 * Client-side pre-check. Mirrors the required/pattern rules the Worker
 * enforces; it exists to save a round trip, never to replace validation.
 */
const validateLocally = (form: HTMLFormElement): Record<string, string> => {
  const errors: Record<string, string> = {};

  form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
    '[data-field]'
  ).forEach((control) => {
    const name = control.dataset.field!;
    const label =
      form.querySelector(`label[for="${CSS.escape(control.id)}"]`)?.textContent?.replace(
        '(optional)',
        ''
      ).trim() ?? name;

    if (control.required && !control.value.trim()) {
      errors[name] = `Enter ${label.toLowerCase()}.`;
      return;
    }
    if (control.value && !control.checkValidity()) {
      errors[name] =
        control.type === 'email'
          ? 'Enter a valid email address, like name@example.com.'
          : `Check ${label.toLowerCase()}.`;
    }
  });

  return errors;
};

const enhance = (shell: HTMLElement): void => {
  const form = shell.querySelector<HTMLFormElement>('[data-form]');
  const success = shell.querySelector<HTMLElement>('[data-success]');
  if (!form || !success) return;

  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const originalLabel = button?.textContent ?? '';

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    clearErrors(shell, form);

    const localErrors = validateLocally(form);
    if (Object.keys(localErrors).length > 0) {
      for (const [field, message] of Object.entries(localErrors)) {
        setFieldError(form, field, message);
      }
      showSummary(shell, form, localErrors);
      return;
    }

    if (button) {
      button.setAttribute('aria-disabled', 'true');
      button.textContent = 'Sending…';
    }

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });

      const result = (await response.json()) as SubmitResponse;

      if (result.ok) {
        form.hidden = true;
        success.hidden = false;
        success.focus();
        return;
      }

      const errors = result.errors ?? {
        _: result.formError ?? 'Something went wrong. Please try again.',
      };
      for (const [field, message] of Object.entries(errors)) {
        if (field !== '_') setFieldError(form, field, message);
      }
      showSummary(shell, form, errors);
    } catch {
      showSummary(shell, form, {
        _: 'Could not reach the server. Check your connection and try again.',
      });
    } finally {
      if (button) {
        button.removeAttribute('aria-disabled');
        button.textContent = originalLabel;
      }
    }
  });
};

document.querySelectorAll<HTMLElement>('[data-form-shell]').forEach(enhance);

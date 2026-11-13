const ICONS = {
  success: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  `,
  warning: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
      <line x1="12" y1="9" x2="12" y2="13"></line>
      <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
  `,
  error: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="15" y1="9" x2="9" y2="15"></line>
      <line x1="9" y1="9" x2="15" y2="15"></line>
    </svg>
  `,
}

const DEFAULT_TITLES = {
  success: "Sucesso",
  warning: "Atenção",
  error: "Algo deu errado",
}

function getContainer() {
  let container = document.querySelector(".toast-container")
  if (!container) {
    container = document.createElement("div")
    container.className = "toast-container"
    document.body.appendChild(container)
  }
  return container
}

function showToast({ type = "success", title, message, duration = 3800 }) {
  const container = getContainer()

  const toastEl = document.createElement("div")
  toastEl.className = `toast toast--${type}`
  toastEl.setAttribute("role", "alert")

  const resolvedTitle = title || DEFAULT_TITLES[type]

  toastEl.innerHTML = `
    <div class="toast-icon">${ICONS[type] || ICONS.success}</div>
    <div class="toast-content">
      <strong class="toast-title">${resolvedTitle}</strong>
      <span class="toast-message">${message}</span>
    </div>
    <button type="button" class="toast-close" aria-label="Fechar">✕</button>
    <div class="toast-progress" style="animation-duration: ${duration}ms"></div>
  `

  const removeToast = () => {
    if (toastEl.classList.contains("toast-leaving")) return
    toastEl.classList.add("toast-leaving")
    toastEl.addEventListener("animationend", () => toastEl.remove(), {
      once: true,
    })
  }

  toastEl.querySelector(".toast-close").addEventListener("click", removeToast)
  container.appendChild(toastEl)

  setTimeout(removeToast, duration)
}

export const toast = {
  success: (message, title) => showToast({ type: "success", title, message }),
  warning: (message, title) => showToast({ type: "warning", title, message }),
  error: (message, title) => showToast({ type: "error", title, message }),
}

export function confirmModal({
  title = "Cancelar agendamento",
  message = "Tem certeza que deseja cancelar este agendamento?",
  confirmText = "Sim, cancelar",
  cancelText = "Voltar",
} = {}) {
  return new Promise((resolve) => {
    const overlay = document.createElement("div")
    overlay.className = "modal-overlay"

    overlay.innerHTML = `
      <div class="modal-card" role="dialog" aria-modal="true">
        <div class="modal-icon">${ICONS.warning}</div>
        <strong class="modal-title">${title}</strong>
        <p class="modal-message">${message}</p>
        <div class="modal-actions">
          <button type="button" class="modal-btn modal-btn--cancel">${cancelText}</button>
          <button type="button" class="modal-btn modal-btn--confirm">${confirmText}</button>
        </div>
      </div>
    `

    const close = (result) => {
      overlay.classList.add("modal-leaving")
      overlay.addEventListener(
        "animationend",
        () => {
          overlay.remove()
          resolve(result)
        },
        { once: true }
      )
    }

    overlay
      .querySelector(".modal-btn--cancel")
      .addEventListener("click", () => close(false))
    overlay
      .querySelector(".modal-btn--confirm")
      .addEventListener("click", () => close(true))
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) close(false)
    })

    document.body.appendChild(overlay)
  })
}


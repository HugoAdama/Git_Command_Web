/**
 * Copies plain text to the user's system clipboard with fallback support
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Continue to fallback
  }

  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const success = (document as unknown as { execCommand: (c: string) => boolean }).execCommand('copy');
    document.body.removeChild(textArea);
    return Boolean(success);
  } catch {
    return false;
  }
}

let toastTimeoutId: number | undefined;

/**
 * Triggers a global floating toast notification
 */
export function showToast(message: string, duration = 2200): void {
  const toast = document.getElementById('copy-toast');
  const toastText = document.getElementById('toast-text');
  if (!toast || !toastText) return;

  if (toastTimeoutId) {
    window.clearTimeout(toastTimeoutId);
  }

  toastText.textContent = message;
  toast.hidden = false;

  toastTimeoutId = window.setTimeout(() => {
    toast.hidden = true;
    toastTimeoutId = undefined;
  }, duration);
}

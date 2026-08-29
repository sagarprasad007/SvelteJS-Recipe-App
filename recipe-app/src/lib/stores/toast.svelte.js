class ToastStore {
  message = $state('');
  type = $state('success');
  visible = $state(false);
  timer = null;

  /**
   * @param {string} msg
   * @param {'success' | 'info' | 'error'} toastType
   */
  show(msg, toastType = 'success') {
    if (this.timer) clearTimeout(this.timer);
    this.message = msg;
    this.type = toastType;
    this.visible = true;

    this.timer = setTimeout(() => {
      this.visible = false;
    }, 3000);
  }

  dismiss() {
    this.visible = false;
  }
}

export const toastStore = new ToastStore();

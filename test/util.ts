export default class TestUtil {
  static preview(message: string): string {
    if (message === ``) {
      return `<empty string>`;
    }

    return message.length > 32 ? message.substring(0, 32) + `...` : message;
  }
}

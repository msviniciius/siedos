export namespace CookiesUtils {
  export function get(key: string): string {
    key = key + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }

      if (c.indexOf(key) == 0) {
        return safeDecodeURIComponent(c.substring(key.length, c.length));
      }
    }
    return null;
  }

  export function set(key: string, value: string, expiration?: Date, domain?: string): void {
    let cookie = `${key}=${value};`;

    if (expiration) {
      cookie += ` expires=${expiration.toUTCString()};`
    }

    if (domain) {
      cookie += ` domain=${domain};`;
    }

    document.cookie = `${cookie} path=/`;
  }

  export function remove(key: string, domain?: string): void {
    const date = new Date();
    date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));

    let cookie = `${key}=; expires=${date.toUTCString()};`;

    if (domain) {
      cookie += ` domain=${domain};`;
    }

    document.cookie = `${cookie} path=/`;
  }

  export function getDomain(location: Location): string {
    if (!location?.hostname) {
      return null;
    }
    else if (location.hostname == "localhost" || location.hostname == "127.0.0.1") {
      return location.hostname;
    }

    const urlParts = location.hostname.toLowerCase().split(".");
    const comIndex = urlParts.indexOf("com");

    return `.${urlParts.slice(comIndex - 1, urlParts.length).join('.')}`;
  }

  export function safeDecodeURIComponent(str) {
    try {
      return decodeURIComponent(str);
    } catch (e) {
      return str;
    }
  }
}

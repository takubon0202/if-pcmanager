import liff from "@line/liff";

let initialized = false;

export async function initLiff(): Promise<void> {
  if (initialized) return;

  const liffId = process.env.NEXT_PUBLIC_LIFF_ID;
  if (!liffId) {
    console.error("LIFF ID is not set");
    return;
  }

  try {
    await liff.init({ liffId });
    initialized = true;
  } catch (error) {
    console.error("LIFF initialization failed:", error);
    throw error;
  }
}

export function getLiff() {
  return liff;
}

export function isInClient(): boolean {
  return liff.isInClient();
}

export function isLoggedIn(): boolean {
  return liff.isLoggedIn();
}

export function login(): void {
  liff.login();
}

export function logout(): void {
  liff.logout();
}

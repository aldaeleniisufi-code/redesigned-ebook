import { cookies } from "next/headers";

const ACTIVE_CHILD_COOKIE = "active_child_id";

export async function getActiveChildId(): Promise<string | null> {
  const store = await cookies();
  return store.get(ACTIVE_CHILD_COOKIE)?.value ?? null;
}

export async function setActiveChildId(childId: string) {
  const store = await cookies();
  store.set(ACTIVE_CHILD_COOKIE, childId, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function clearActiveChildId() {
  const store = await cookies();
  store.delete(ACTIVE_CHILD_COOKIE);
}

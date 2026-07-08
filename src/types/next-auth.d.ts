import type { DefaultSession } from "@auth/core/types";

declare module "@auth/core/types" {
  interface Session {
    user: {
      id: string;
      role: "ADMIN" | "PARENT";
    } & DefaultSession["user"];
  }

  interface User {
    id?: string;
    role?: "ADMIN" | "PARENT";
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id?: string;
    role?: "ADMIN" | "PARENT";
  }
}

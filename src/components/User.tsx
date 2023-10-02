"use client";

import { useSession } from "next-auth/react";

export const User = () => {
  const { data: session } = useSession();
  return (
    <div>
      <p className="break-words">{JSON.stringify(session)}</p>
    </div>
  );
};

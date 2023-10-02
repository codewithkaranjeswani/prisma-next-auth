"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import ThemeSwitcher from "./Themeswitcher";
import { signOut, useSession } from "next-auth/react";

function Navbar() {
  const { data: session, status } = useSession();
  const [navbar, setNavbar] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="container mx-auto border-b px-4 sm:px-6">
      <div className="flex flex-wrap items-center justify-between">
        <div className="py-3 hover:cursor-pointer md:block">
          <Link href="/">
            <h2 className="text-2xl text-neutral-900 hover:text-neutral-700 dark:text-neutral-100 dark:hover:text-neutral-300">
              Auth Example
            </h2>
          </Link>
        </div>

        <div className="flex gap-x-2">
          {status === "authenticated" ? (
            <div className="flex gap-x-2">
              <button
                className="flex justify-between rounded-xl p-2 w-32"
                onClick={() => setDropdown((dr) => !dr)}
              >
                <p className="w-28 truncate">{session.user?.email}</p>
                <svg
                  className="mt-1 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              <div className="absolute w-32">
                <ul
                  className={`${
                    dropdown ? "" : "hidden"
                  } fixed z-10 mt-10 flex w-32 flex-col rounded text-base shadow`}
                >
                  <li key={"a"}>
                    <button
                      className="block px-2 py-2 text-sm"
                      onClick={() => signOut({ callbackUrl: "/" })}
                    >
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div>
              <Link
                href="/api/auth/signin"
                className="flex h-full items-center text-neutral-900 hover:text-neutral-700 dark:text-neutral-100 dark:hover:text-neutral-300"
                onClick={() => setNavbar((nb) => !nb)}
              >
                Sign In
              </Link>
            </div>
          )}
          <ThemeSwitcher mounted={mounted} />
        </div>
      </div>
    </header>
  );
}

export default Navbar;

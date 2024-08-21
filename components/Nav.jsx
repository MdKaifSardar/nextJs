"use client";

import React, { useEffect, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

import Link from "next/link";
import Image from "next/image";
import { logo } from "@app/assets/images";

const Nav = () => {
  const [providers, setProviders] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const setUpProviders = async () => {
      const res = await getProviders();

      setProviders(res);
    };

    setUpProviders();
  }, []);

  // useEffect(() => {
  //   console.log(providers);
  // }, []);
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/">
        <Image
          width={37}
          height={37}
          src={logo}
          alt="Promptopia I
        mage"
        />
      </Link>
      <p className="logo_text">Promptopia</p>
      {session?.user ? (
        // desktop nav
        <div className="sm:flex hidden flex-row justify-center items-center w-fit">
          <Link href="create-prompt" className="black_btn">
            {" "}
            Create a new post
          </Link>
          <button className="outline_btn" onClick={signOut}>Sign Out</button>
          <Link href="/profile" className="">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => {}}
            ></Image>
          </Link>
        </div>
      ) : (
        <>
          {providers &&
            Object.values(providers).map((provider) => (
              <button
                type="button"
                key={provider.name}
                onClick={() => {
                  signIn(provider.id);
                }}
                className="black_btn"
              >
                Sign in
              </button>
            ))}
        </>
      )}

      {/* mobile navigation */}
      <div className="sm:hidden flex">
        {session?.user ? (
          <div
            className="p-2 hover:bg-slate-300/40 rounded-full"
            onClick={() => {
              setIsOpen((prev) => {
                setIsOpen(!prev);
              });
            }}
          >
            <IoMdMenu className="text-2xl" />
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="black_btn"
                >
                  Sign in
                </button>
              ))}
          </>
        )}

        {isOpen && (
          <div className="absolute top-20 justify-center items-start right-5 flex flex-col gap-2 p-2 rounded-md bg-white">
            <Image src={session?.user.image} alt="Profile Image" width={37} height={37} className="rounded-full"></Image>
            <Link href="/" className="hover:bg-slate-300/20">
              Create Prompt
            </Link>
            <button
              className="btn_black"
              onClick={() => {
                setIsOpen(false);
                signOut();
              }}
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;

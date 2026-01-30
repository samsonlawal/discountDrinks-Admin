import Link from 'next/link';
import React from 'react';

function AuthPageHeader({
  title = 'title here',
  subtitle = 'subtitle here',
  showLogo = true,
}: {
  title?: string;
  subtitle?: string;
  showLogo: boolean;
}) {
  return (
    <div className="md:w-[510px] flex flex-col items-center lg:items-start mx-auto pt-[60px] lg:pt-[100px] gap-2">
      {showLogo && (
        <Link href="/">
          <img src="/icons/logo-dark.svg" alt="logo-dark" />
        </Link>
      )}

      <div className="mt-12">
        <h1 className="p-0 m-0 text-center lg:text-start font-gordita text-[34px] medium leading-[42px] text-[#111111] dark:text-white font-[500]">
          {title}
        </h1>
        <h2 className="p-0 m-0 text-center lg:text-start text-base font-gordita font-normal text-[#4e4e4e] dark:text-[#838383]">
          {subtitle}
        </h2>
      </div>
    </div>
  );
}

export default AuthPageHeader;

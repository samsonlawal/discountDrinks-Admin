'use client';
import React from 'react';
import AuthPageHeader from './auth-page-header';

function AuthPageWrapper({
  children,
  title = '',
  subtitle = '',
  showLogo = true,
}: {
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
}) {
  return (
    <div className="w-full h-fit md:min-h-[99vh] md:overflow-hidden flex box-border">
      <div className="flex-1 bg-[#3149D7] overflow-hidden hidden lg:block">
        <img src="/images/auth-background.webp" alt="auth_bg" className="w-full h-full object-cover" />
      </div>

      <div className="flex-1 flex flex-col pb-[38px] lg:pb-[45px]">
        <div className="flex flex-col flex-grow px-5">
          <AuthPageHeader title={title} subtitle={subtitle} showLogo={showLogo} />
          {children}
        </div>
        <div className="mt-[95px] lg:ml-[52px] text-center lg:text-start">
          <div className="text-sm font-gordita leading-[22px] font-normal dark:text-[#838383]">
            © 2018–2024 Mobbin. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPageWrapper;

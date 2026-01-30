const SocialAuthButton = ({
  containerId,
  buttonId,
  text,
  icon,
  title,
}: {
  containerId: string;
  buttonId: string;
  text: string;
  icon: JSX.Element;
  title: string;
}) => {
  return (
    <div className="flex flex-1 self-stretch md:self-start" id={containerId}>
      <button
        title={title}
        className="flex-1 inline-flex items-center justify-center gap-[15px] font-gordita text-base leading-6 font-normal text-[#4e4e4e] dark:text-[#838383] rounded-[10px] border-[1px] border-[#E6E8EC] dark:border-[#292929] p-[15px]"
        type="button"
        id={buttonId}
      >
        {icon}
        {text}
      </button>
    </div>
  );
};

export const SocialAuthProviders = () => {
  return (
    <div className="flex flex-col md:flex-row gap-y-4 md:gap-5 items-center gap-x-5 md:justify-between w-full">
      <SocialAuthButton
        containerId="signup-with-google"
        title="google"
        buttonId="social-auth-provider-google-web"
        text="Sign Up with Google"
        icon={<img src="/icons/GoogleIcon.svg" alt="Google Login" />}
      />
      <SocialAuthButton
        containerId="signup-with-microsoft"
        title="microsoft"
        buttonId="social-auth-provider-microsoft-web"
        text="Sign Up with Microsoft"
        icon={<img src="/icons/MicrosoftIcon.svg" alt="Microsoft Login" />}
      />
    </div>
  );
};

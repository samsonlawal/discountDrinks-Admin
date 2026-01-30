import { FormCTA } from '../FormCTA';
import { SocialAuthProviders } from '../SocialAuthProviders';

const AuthFormFooter = ({ text, link, linkText }: { text: string; link: string; linkText: string }) => {
  return (
    <div>
      <div className="my-6 relative flex gap-x-4 items-center">
        <div className="h-px bg-[#E7E7E7] dark:bg-[#292929] flex-1" />
        <div className="text-[#4e4e4e] dark:text-[#838383] font-gordita text-base font-normal">OR</div>
        <div className="h-px bg-[#E7E7E7] dark:bg-[#292929] flex-1" />
      </div>
      <SocialAuthProviders />
      <div className="mt-12">
        <div className="flex justify-center">
          <FormCTA text={text} link={link} linkText={linkText} />
        </div>
      </div>
    </div>
  );
};

export { AuthFormFooter };

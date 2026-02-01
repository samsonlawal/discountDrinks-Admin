import { ReactNode } from 'react';

export type DialogName = 'user' | 'category' | 'tag' | 'website';

export interface DialogProps {
   trigger: ReactNode;
   dialogName: DialogName;
   mode?: string;
   id?: string;
   action?: () => Promise<void>;
   actionName?: string;
   actionButtonLabel?: string;
   buttonClassName?: string;
   open?: boolean; // this allow you to controll the modal from outside. it will opt out from the local state mode
   onOpenChange?: () => void; // provide this if open is provided as a params
}

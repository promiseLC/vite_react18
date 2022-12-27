import { ReactNode, useMemo } from 'react';
import type { FC } from 'react';

type IsShowComponentInterface =  {
  authStr: string;
  children: ReactNode
  onClick?: () => any;
  replace?: ReactNode;
}&JSX.IntrinsicElements["div"]

const authList = ['newCase', 'open','replaceDom'];

const IsShowComponent: FC<IsShowComponentInterface> = ({ authStr, children, onClick, replace, ...props }) => {
  
  const isShow: boolean = useMemo(
    () => {
      return authList.includes(authStr);
    },
    [authStr]
  );

  const defaultReplaceDom = useMemo(() => {
    return replace ? <>{replace}</> : null;
  }, [replace])
  


  return !isShow ? defaultReplaceDom : <div {...props} onClick={() => {
    
    onClick && onClick();
  }} >{children}</div>;
};

export default IsShowComponent;

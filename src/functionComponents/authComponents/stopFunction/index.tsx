import { ReactNode, useMemo,cloneElement } from 'react';
import type { FC } from 'react';


const authList = ['newCase', 'open'];

type StopFunctionComponentInterface = {
  authStr: string;
  children: ReactNode;
} & JSX.IntrinsicElements['div'];

const StopFunctionComponent:FC<StopFunctionComponentInterface> = ({authStr,children}) => {
  


  const stopEventDom = useMemo(() => {
    return children ? cloneElement(children as React.ReactElement<any>, authList.includes(authStr) ? {} : {
      onClick:()=>{}
    }):null

  }, [
    children,authStr
  ])

  





  return <div onClick={(e) => {
    e.stopPropagation();
  }} >{ children}</div>
}

export default StopFunctionComponent;
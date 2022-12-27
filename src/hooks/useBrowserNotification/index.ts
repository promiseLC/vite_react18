import { useRef, useMemo } from 'react';
import Icon from '@/assets/react.svg';

const useBrowserNotification = () => {
  const notificationRef = useRef(window.Notification);

  const notification = useMemo(() => {
    return notificationRef.current;
  }, []);

  const pushBrowserNotification = ({ body, icon = Icon, title, data }: { body: string; icon?: string; title: string; data: any }) => {
    if (notification) {
      // 可以通过使用箭头函数变更this指向
      notification.requestPermission(result => {
        console.log(result); // granted（允许） || denied（拒绝）
        if ('denied' == result) {
          console.warn('请授权浏览器通知!');
        } else {
          const tag = 'tag' + new Date().getTime();
          // let notification = new Notification(title, options)
          // https://developer.mozilla.org/zh-CN/docs/Web/API/notification
          const notify = new notification(
            title, // title标题
            {
              dir: 'auto', // 文字的方向；它的值可以是 auto（自动）, ltr（从左到右）, or rtl（从右到左）
              lang: 'zh-CN', // 指定通知中所使用的语言
              body, // 通知中额外显示的字符串
              tag: tag, // 赋予通知一个ID，以便在必要的时候对通知进行刷新、替换或移除
              icon, // 将被用于显示通知的图标,可使用import引入，也可以填写图标存放路径
              data,
            }
          );
          notify.onclick = e => {
            console.info('click methods', e);

            window.open(notify.data.url);
          };
          notify.onerror = () => {
            console.error('error methods');
          };
          notify.onshow = () => {
            console.log('show methods');
          };
          notify.onclose = () => {
            console.info('close methods');
          };
        }
      });
    } else {
      console.warn('浏览器不支持通知!');
    }
  };

  return { pushBrowserNotification };
};

export default useBrowserNotification;

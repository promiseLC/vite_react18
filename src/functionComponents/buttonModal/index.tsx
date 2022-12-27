import type { ReactElement } from 'react';
import React, { useImperativeHandle, useEffect, useState, forwardRef } from 'react';

import type { ModalProps, ModalFuncProps } from 'antd';
import { Modal } from 'antd';
import './index.scss';

interface IModalFuncProps extends ModalFuncProps {
  type: ModalFuncProps['type'];
}

interface Iprops {
  onSuccess?: (callback?: () => void) => void; // 成功回调   callback 一般用来关闭弹窗;
  openCallback?: () => void; // 弹窗弹出回调
  renderButton: ReactElement; // 触发弹窗 按钮
  modalProps?: ModalProps; // 弹窗props
  children?: ReactElement;
  modalFuncProps?: IModalFuncProps; // 属性存在,不在渲染Modal,直接返回Modal[type],用来做二次确认;
}

// TODO:暂时不能控制弹窗开启时机,可满足部分需求;

const ButtonModal = (props: Iprops, ref: React.ForwardedRef<any>) => {
  const { onSuccess, children, openCallback, renderButton, modalProps = {}, modalFuncProps = {} } = props;

  const { type } = modalFuncProps as IModalFuncProps;

  const [visible, setVisible] = useState<boolean>(false);

  const onCancel = () => setVisible(false);

  const showModal = () => setVisible(true);

  const showConfirm = () => {
    if (!type) return;
    Modal[type](modalFuncProps);
  };

  useImperativeHandle(ref, () => ({
    hide: onCancel,
    show: showModal,
  }));

  useEffect(() => {
    if (!visible) return;
    openCallback && openCallback();
  }, [visible]);

  return (
    <div>
      {React.cloneElement(renderButton, { onClick: type ? showConfirm : showModal })}
      {!type && (
        <Modal
          {...modalProps}
          onOk={() => {
            onSuccess && onSuccess(onCancel);
          }}
          onCancel={onCancel}
          visible={visible}>
          {children}
        </Modal>
      )}
    </div>
  );
};

export default forwardRef(ButtonModal);
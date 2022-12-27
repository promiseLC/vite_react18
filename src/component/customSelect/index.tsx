import { useEffect, useMemo, useState } from 'react';
import { Select, Button, InputNumber } from 'antd';
import styles from './index.module.less';

type ValueType = (number)[];

interface Iprops {
  value?: string | null;
  onChange?: (v: string | null) => void;
  total?: number;
  selected?: string;
}

enum errorType {
  SKIP = 'skip',
  REPEAT = 'repeat',
}

const { itemColorHas, itemColorWaring, itemColorSelect, itemColorDefault } = styles;

const CustomSelect = (props: Iprops) => {
  const { value, onChange, total = 100, selected = '0-0' } = props;

  // 本次选择的步数
  const [startAndEnd, setStartAndEnd] = useState<ValueType>([]);

  // 选择1步时的数量
  const [number, setNumber] = useState<number | string | null>();

  // 关闭打开下拉
  const [open, setOpen] = useState<boolean | undefined>(false);

  // select的受控值
  const [selectValue, setSelectValue] = useState<string | null>(null);

  // 显示可选择的总数
  const showItemNumber = useMemo(
    () => {
      return new Array(total).fill(1).map((item, index) => {
        return index + 1;
      });
    },
    [total]
  );

  // 已经发货的
  const selectedList = useMemo(
    () => {
      if (selected.includes('-')) {
        const [start, end] = selected.split('-').map(v => +v);

        console.log(showItemNumber.slice(start - 1, end));
        return showItemNumber.slice(start - 1, end);
      }

      return [];
    },
    [selected, showItemNumber]
  );

  // 本次选中的
  const selectItem = useMemo<ValueType>(
    () => {
      const [start, end] = startAndEnd;

      if (!start && !end) {
        return [];
      }

      if (startAndEnd.length === 1) {
        return startAndEnd;
      }

      return showItemNumber.slice(start - 1, end);
    },
    [startAndEnd]
  );

  // error选择的
  const errorSelect = useMemo(
    () => {
      const start = selectedList[selectedList.length - 1] || 0;
      const [end] = startAndEnd;

      if (end - start > 1) {
        // 有跳步产生
        return {
          error: errorType.SKIP,
          list: showItemNumber.slice(start, end - 1),
        };
      }

      if (end - start < 1) {
        // 有重复产生
        return {
          error: errorType.REPEAT,
          list: selectItem.filter(v => selectedList.includes(v)),
        };
      }

      return {};
    },
    [selectedList, startAndEnd, showItemNumber, selectItem]
  );

  // 回填
  useEffect(
    () => {
      if (value) {
        if (value.includes('-')) {
          setStartAndEnd(value.split('-').map(item => +item));
          setSelectValue(value);
        }

        if (value.includes('*')) {
          setStartAndEnd([value.split('*').map(item => +item)[0]]);
          setNumber(value.split('*').map(item => +item)[1]);
          setSelectValue(value);
        }
      }
    },
    [value]
  );

  const itemClassName = (index: number) => {
    let className = itemColorDefault;

    if (selectItem.includes(index)) {
      className = `${itemColorDefault} ${itemColorSelect}`;
    }

    if (selectedList.includes(index)) {
      className = `${itemColorDefault} ${itemColorHas}`;
    }

    if (errorSelect.error && errorSelect.list.includes(index)) {
      className = `${itemColorDefault} ${itemColorWaring}`;
    }

    return className;
  };

  const currentValue = useMemo(
    () => {
      const [start, end] = startAndEnd;

      if ((!start || !end) && !number) {
        return null;
      }

      if (start && number) {
        return `${start}*${number}`;
      }

      return `${start}-${end}`;
    },
    [startAndEnd, number]
  );

  const dropdownItem = (index: number) => {
    return (
      <div
        className={`${styles.dropdownItem} ${itemClassName(index)}`}
        onClick={() => {
          setNumber(null);
          let current;
          if (startAndEnd.includes(index)) {
            current = startAndEnd.filter(v => v !== index);

            setStartAndEnd(current);

            return;
          }

          if (startAndEnd.length === 2) {
            current = [index];
          } else {
            current = [...startAndEnd, index].sort((a: any, b: any) => a - b);
          }
          setStartAndEnd(current);
        }}
        key={index}>
        {index}
      </div>
    );
  };

  const dropdownRender = () => {
    return (
      <div className={styles.dropdown}>
        <div className={styles.dropdownContent}>
          {showItemNumber.map(text => {
            return dropdownItem(text);
          })}
        </div>

        <div className={styles.tip}>
          {errorSelect.error &&
            <div className={styles.error}>
              {errorSelect.error === errorType.REPEAT ? '重复生产' : '跳步生产'}
            </div>}
          {startAndEnd.length === 1 &&
            <div className={styles.numberInput}>
              <div>输入数量：</div>
              <InputNumber
                addonAfter={<div>副</div>}
                precision={0}
                value={number}
                onChange={v => {
                  setNumber(v);
                }}
              />
            </div>}
        </div>

        <div className={styles.bottom}>
          <div>
            <span>已选择:</span>
            <span>
              {currentValue}
            </span>
          </div>
          <Button
            onClick={() => {
              onChange && onChange(currentValue);
              setSelectValue(currentValue);
              setOpen(false);
            }}
            type="primary">
            确定
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.customSelect}>
      <Select
        dropdownRender={dropdownRender}
        onFocus={() => {
          setOpen(undefined);
        }}
        open={open}
        placeholder="请选择"
        value={selectValue}
        style={{ width: '609px' }}
      />
    </div>
  );
};

export default CustomSelect;

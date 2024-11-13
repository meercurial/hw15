import React, { SelectHTMLAttributes, DetailedHTMLProps, ChangeEvent } from 'react';
import s from './SuperSelect.module.css';

type DefaultSelectPropsType = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

type SuperSelectPropsType = DefaultSelectPropsType & {
  //options?: any[];
  options?: Array<{ id: number; value: string | number }>;
  onChangeOption?: (option: number) => void;
};

const SuperSelect: React.FC<SuperSelectPropsType> = ({
  options,
  className,
  onChange,
  onChangeOption,
  ...restProps
}) => {
  const mappedOptions: any[] = options
    ? options.map((o) => (
        <option id={'hw7-option-' + o.id} className={s.option} key={o.id} value={o.id}>
          {o.value}
        </option>
      ))
    : []; // map options with key

  const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = Number(e.target.value); // Преобразуем значение в число
    if (onChangeOption) {
      onChangeOption(selectedValue); // Вызываем onChangeOption с выбранным значением
    }

    if (onChange) {
      onChange(e); // Если есть onChange, вызываем его
    }
  };


  const finalSelectClassName = s.select + (className ? ' ' + className : '');

  return (
    <select className={finalSelectClassName} onChange={onChangeCallback} {...restProps}>
      {mappedOptions}
    </select>
  );
};

export default SuperSelect;

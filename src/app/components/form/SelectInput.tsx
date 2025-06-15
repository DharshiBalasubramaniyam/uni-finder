"use client";
import React from "react";
import Select, { MultiValue } from "react-select";

type OptionType = { value: string; label: string };

interface SelectInputProps {
   isMultiple: boolean; 
   id: string;
   options: OptionType[];
   value: OptionType | OptionType[] | null;
   onChange: (value: OptionType | MultiValue<OptionType> | null) => void;
   placeholder?: string;
   required: boolean;
   isOptionDisabled?: () => boolean;
   autoFocus?: boolean;
   ref?: React.Ref<any>;
}

function SelectInput({ isMultiple, id, options, value, onChange, placeholder, required, isOptionDisabled, ref, autoFocus = false }: SelectInputProps) {
   
   return (
      isMultiple ? (
         <Select<OptionType, true>
            isMulti
            id={id}
            options={options}
            value={value}
            isOptionDisabled={isOptionDisabled}
            onChange={onChange}
            autoFocus={autoFocus}
            isClearable
            required={required}
            ref={ref}
            placeholder={placeholder}
            styles={{
               input: (base) => ({
                  ...base,
                  color: "#fff",
               }),
               control: (base, state) => ({
                  ...base,
                  backgroundColor: '#171717', // background of the select box
                  color: '#f00',              // text color inside the box
                  borderColor: state.isFocused ? '#fff' : '#fff',
                  borderWidth: 2,
                  boxShadow: state.isFocused ? '0 0 0 1px #0000ff' : 'none',
                  '&:hover': {
                     borderColor: '#999',
                  },
               }),
               multiValue: (base) => ({
                  ...base,
                  backgroundColor: '#0000ff',
               }),
               multiValueLabel: (base) => ({
                  ...base,
                  color: '#fff',
               }),
               multiValueRemove: (base) => ({
                  ...base,
                  color: '#fff',
                  ':hover': {
                     backgroundColor: '#999',
                     color: 'white',
                  },
               }),
               option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isFocused
                     ? '#6c757d' // on hover
                     : state.isSelected
                        ? '#0000ff' // selected option
                        : '#171717',
                  color: '#fff',
               })
            }}
         />
      ) : (
         <Select<OptionType>
            options={options}
            id={id}
            value={value}
            onChange={onChange}
            isClearable
            required={required}
            ref={ref}
            placeholder={placeholder}
            styles={{
               control: (base, state) => ({
                  ...base,
                  backgroundColor: '#171717', // background of the select box
                  color: '#f00',              // text color inside the box
                  borderColor: state.isFocused ? '#fff' : '#fff',
                  borderWidth: 2,
                  boxShadow: state.isFocused ? '0 0 0 1px #0000ff' : 'none',
                  '&:hover': {
                     borderColor: '#999',
                  },
               }),
               singleValue: (base) => ({
                  ...base,
                  color: '#fff', // selected value text color
               }),
               option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isFocused
                     ? '#6c757d' // on hover
                     : state.isSelected
                        ? '#0000ff' // selected option
                        : '#171717',
                  color: '#fff',
               }),
               placeholder: (base) => ({
                  ...base,
                  color: '#888',
               }),
               input: (base) => ({
                  ...base,
                  color: '#fff', // text color inside the input
               }),
            }}
         />
      )
   )
}

export default SelectInput;
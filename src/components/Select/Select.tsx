import React, { memo } from 'react';
import ReactSelect, { components } from 'react-select';
import classNames from 'classnames';

import useStyles from './select.styles';

interface IProps {
  name: string;
  options: { label?: string; value?: any; [key: string]: any }[];
  onChange: (data: { name: string; value: any }) => void;
  id?: string;
  disabled?: boolean;
  className?: string;
  isSearchable?: boolean;
  [key: string]: any;
}

const Select: React.FC<IProps> = ({
  id,
  name,
  options,
  onChange,
  disabled,
  dataTest,
  className,
  ...restProps
}) => {
  const classes = useStyles();

  return (
    <ReactSelect
      instanceId={id || name}
      name={name}
      onChange={(value) => onChange({ name, value })}
      options={options}
      className={classNames(classes.select, className)}
      classNamePrefix="custom-react-select"
      isDisabled={disabled}
      components={{
        DropdownIndicator: (props) => (
          <components.DropdownIndicator {...props}>
            <i className="icon-triangle-down" />
          </components.DropdownIndicator>
        ),
      }}
      {...restProps}
    />
  );
};
Select.defaultProps = {
  id: '',
  className: '',
  disabled: false,
  isSearchable: false,
};

export default memo(Select);

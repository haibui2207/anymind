import React, { memo } from 'react';
import classNames from 'classnames';

import useStyles from './button.styles';

interface IProps {
  children: React.ReactNode;
  tag?: keyof JSX.IntrinsicElements;
  disabled?: boolean;
  className?: string;
  color?: 'primary' | 'secondary' | 'tertiary';
}

const Button: React.FC<IProps> = ({
  tag,
  color,
  disabled,
  children,
  className,
  ...restProps
}) => {
  const classes = useStyles();
  const Component = `${tag}` as keyof JSX.IntrinsicElements;

  return (
    <Component
      className={classNames(
        classes.root,
        color,
        disabled && 'disabled',
        className,
      )}
      disabled={disabled}
      {...restProps}
    >
      {children}
    </Component>
  );
};
Button.defaultProps = {
  className: '',
  tag: 'button',
  disabled: false,
  color: 'primary',
};

export default memo(Button);

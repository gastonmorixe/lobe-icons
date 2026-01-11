/**
 * Simple antd component replacements
 */
import React, { CSSProperties, FC, HTMLAttributes, ReactNode } from 'react';

// ============ Empty Component ============

export const Empty: FC<
  HTMLAttributes<HTMLDivElement> & {
    image?: ReactNode | string;
    description?: ReactNode;
  }
> & {
  PRESENTED_IMAGE_SIMPLE: string;
} = ({ image, description, style, ...props }) => {
  const emptyStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '32px 0',
    color: 'var(--color-text-tertiary, rgba(0, 0, 0, 0.45))',
    ...style,
  };

  return (
    <div style={emptyStyle} {...props}>
      {image && typeof image === 'string' ? (
        <div style={{ fontSize: '48px', marginBottom: '8px' }}>📭</div>
      ) : (
        image
      )}
      {description && <div style={{ marginTop: '8px' }}>{description}</div>}
      {!description && <div style={{ marginTop: '8px' }}>No Data</div>}
    </div>
  );
};

Empty.PRESENTED_IMAGE_SIMPLE = 'simple';

// ============ Segmented Component ============

export interface SegmentedOption {
  label: ReactNode;
  value: string | number;
  disabled?: boolean;
}

export const Segmented: FC<
  HTMLAttributes<HTMLDivElement> & {
    options: SegmentedOption[];
    defaultValue?: string | number;
    value?: string | number;
    onChange?: (value: string | number) => void;
  }
> = ({ options, defaultValue, value, onChange, style, ...props }) => {
  const [selected, setSelected] = React.useState(value || defaultValue || options[0]?.value);

  React.useEffect(() => {
    if (value !== undefined) {
      setSelected(value);
    }
  }, [value]);

  const handleClick = (optionValue: string | number) => {
    setSelected(optionValue);
    onChange?.(optionValue);
  };

  const containerStyle: CSSProperties = {
    display: 'inline-flex',
    padding: '2px',
    backgroundColor: 'var(--color-bg-layout, #f5f5f5)',
    borderRadius: 'var(--border-radius, 6px)',
    ...style,
  };

  const optionStyle = (isSelected: boolean): CSSProperties => ({
    padding: '4px 11px',
    cursor: 'pointer',
    borderRadius: 'var(--border-radius-sm, 4px)',
    backgroundColor: isSelected ? 'var(--color-bg-container, #ffffff)' : 'transparent',
    color: isSelected ? 'var(--color-text, rgba(0, 0, 0, 0.88))' : 'var(--color-text-secondary, rgba(0, 0, 0, 0.65))',
    transition: 'all 0.2s',
    userSelect: 'none',
    boxShadow: isSelected ? '0 2px 8px rgba(0, 0, 0, 0.06)' : 'none',
  });

  return (
    <div style={containerStyle} {...props}>
      {options.map((option) => (
        <div
          key={option.value}
          style={optionStyle(selected === option.value)}
          onClick={() => !option.disabled && handleClick(option.value)}
        >
          {option.label}
        </div>
      ))}
    </div>
  );
};

// ============ Divider Component ============

export const Divider: FC<
  HTMLAttributes<HTMLDivElement> & {
    type?: 'horizontal' | 'vertical';
    dashed?: boolean;
  }
> = ({ type = 'horizontal', dashed = false, style, ...props }) => {
  const dividerStyle: CSSProperties = {
    ...(type === 'horizontal'
      ? {
          width: '100%',
          height: '1px',
          margin: '16px 0',
        }
      : {
          width: '1px',
          height: '100%',
          margin: '0 16px',
          display: 'inline-block',
        }),
    backgroundColor: 'var(--color-border, #d9d9d9)',
    borderStyle: dashed ? 'dashed' : 'solid',
    ...style,
  };

  return <div style={dividerStyle} {...props} />;
};

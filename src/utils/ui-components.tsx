/**
 * Simple UI component replacements for @lobehub/ui
 */
import React, { CSSProperties, FC, HTMLAttributes, ReactNode } from 'react';

// ============ Basic Type Definitions ============

export type DivProps = HTMLAttributes<HTMLDivElement>;

export interface FlexboxProps extends DivProps {
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';
  gap?: number;
  horizontal?: boolean;
  flex?: string | number;
  width?: string | number;
  height?: string | number;
}

export interface CenterProps extends DivProps {
  inline?: boolean;
}

export interface TagProps extends DivProps {
  color?: string;
  bordered?: boolean;
}

// ============ Flexbox Component ============

export const Flexbox: FC<FlexboxProps> = ({
  align = 'stretch',
  justify = 'start',
  gap = 0,
  horizontal = false,
  flex,
  width,
  height,
  style,
  className,
  children,
  ...props
}) => {
  const flexStyle: CSSProperties = {
    display: 'flex',
    flexDirection: horizontal ? 'row' : 'column',
    alignItems: align,
    justifyContent: justify,
    gap: typeof gap === 'number' ? `${gap}px` : gap,
    ...(flex !== undefined && { flex }),
    ...(width !== undefined && { width: typeof width === 'number' ? `${width}px` : width }),
    ...(height !== undefined && { height: typeof height === 'number' ? `${height}px` : height }),
    ...style,
  };

  return (
    <div className={className} style={flexStyle} {...props}>
      {children}
    </div>
  );
};

// ============ Center Component ============

export const Center: FC<CenterProps> = ({ inline = false, style, children, ...props }) => {
  const centerStyle: CSSProperties = {
    display: inline ? 'inline-flex' : 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...style,
  };

  return (
    <div style={centerStyle} {...props}>
      {children}
    </div>
  );
};

// ============ Block Component ============

export const Block: FC<DivProps> = ({ style, children, ...props }) => {
  const blockStyle: CSSProperties = {
    display: 'block',
    width: '100%',
    ...style,
  };

  return (
    <div style={blockStyle} {...props}>
      {children}
    </div>
  );
};

// ============ Text Component ============

export const Text: FC<DivProps & { size?: number; type?: 'primary' | 'secondary' | 'tertiary' }> = ({
  size,
  type = 'primary',
  style,
  children,
  ...props
}) => {
  const textStyle: CSSProperties = {
    ...(size && { fontSize: `${size}px` }),
    color:
      type === 'secondary'
        ? 'var(--color-text-secondary, rgba(0, 0, 0, 0.65))'
        : type === 'tertiary'
          ? 'var(--color-text-tertiary, rgba(0, 0, 0, 0.45))'
          : 'var(--color-text, rgba(0, 0, 0, 0.88))',
    ...style,
  };

  return (
    <div style={textStyle} {...props}>
      {children}
    </div>
  );
};

// ============ Tag Component ============

export const Tag: FC<TagProps> = ({ color, bordered = true, style, children, ...props }) => {
  const tagStyle: CSSProperties = {
    display: 'inline-block',
    padding: '0 7px',
    fontSize: '12px',
    lineHeight: '20px',
    borderRadius: '4px',
    border: bordered ? '1px solid var(--color-border, #d9d9d9)' : 'none',
    backgroundColor: color || 'var(--color-bg-container, #fafafa)',
    ...style,
  };

  return (
    <span style={tagStyle} {...props}>
      {children}
    </span>
  );
};

// ============ Grid Component ============

export const Grid: FC<
  DivProps & {
    rows?: number;
    columns?: number;
    maxItemWidth?: number;
    gap?: number;
  }
> = ({ rows, columns, maxItemWidth, gap = 16, style, children, ...props }) => {
  const gridStyle: CSSProperties = {
    display: 'grid',
    gap: `${gap}px`,
    gridTemplateColumns: maxItemWidth
      ? `repeat(auto-fill, minmax(${maxItemWidth}px, 1fr))`
      : columns
        ? `repeat(${columns}, 1fr)`
        : undefined,
    gridTemplateRows: rows ? `repeat(${rows}, auto)` : undefined,
    ...style,
  };

  return (
    <div style={gridStyle} {...props}>
      {children}
    </div>
  );
};

// ============ SearchBar Component ============

export const SearchBar: FC<
  DivProps & {
    placeholder?: string;
    defaultValue?: string;
    allowClear?: boolean;
    onSearch?: (value: string) => void;
    type?: 'block' | 'inline';
  }
> = ({ placeholder, defaultValue, allowClear = false, onSearch, type = 'inline', style, ...props }) => {
  const [value, setValue] = React.useState(defaultValue || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(value);
    }
  };

  const handleClear = () => {
    setValue('');
    onSearch?.('');
  };

  const searchBarStyle: CSSProperties = {
    position: 'relative',
    display: type === 'block' ? 'block' : 'inline-block',
    width: type === 'block' ? '100%' : 'auto',
    ...style,
  };

  const inputStyle: CSSProperties = {
    width: '100%',
    padding: '4px 11px',
    fontSize: '14px',
    lineHeight: '1.5715',
    border: '1px solid var(--color-border, #d9d9d9)',
    borderRadius: 'var(--border-radius, 6px)',
    outline: 'none',
    transition: 'all 0.2s',
  };

  return (
    <div style={searchBarStyle} {...props}>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        style={inputStyle}
      />
      {allowClear && value && (
        <button
          onClick={handleClear}
          style={{
            position: 'absolute',
            right: '8px',
            top: '50%',
            transform: 'translateY(-50%)',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            padding: '4px',
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
};

// ============ Tooltip & TooltipGroup Component ============

export const Tooltip: FC<DivProps & { content?: ReactNode }> = ({ content, children, ...props }) => {
  return <div {...props}>{children}</div>;
};

export const TooltipGroup: FC<DivProps> = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};

// ============ ActionIcon Component ============

export type ActionIconSize = 'small' | 'normal' | 'large';

export const ActionIcon: FC<
  HTMLAttributes<HTMLButtonElement> & {
    icon?: ReactNode;
    size?: ActionIconSize;
  }
> = ({ icon, size = 'normal', style, children, ...props }) => {
  const sizeMap = {
    small: 24,
    normal: 32,
    large: 40,
  };

  const iconStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: `${sizeMap[size]}px`,
    height: `${sizeMap[size]}px`,
    border: '1px solid var(--color-border, #d9d9d9)',
    borderRadius: 'var(--border-radius, 6px)',
    background: 'transparent',
    cursor: 'pointer',
    transition: 'all 0.2s',
    ...style,
  };

  return (
    <button style={iconStyle} {...(props as any)}>
      {icon || children}
    </button>
  );
};

// ============ CopyButton Component ============

export const CopyButton: FC<
  HTMLAttributes<HTMLButtonElement> & {
    content?: string;
  }
> = ({ content, style, children, ...props }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (content) {
      navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const buttonStyle: CSSProperties = {
    padding: '4px 8px',
    fontSize: '12px',
    border: '1px solid var(--color-border, #d9d9d9)',
    borderRadius: 'var(--border-radius, 6px)',
    background: 'var(--color-bg-container, #ffffff)',
    cursor: 'pointer',
    transition: 'all 0.2s',
    ...style,
  };

  return (
    <button style={buttonStyle} onClick={handleCopy} {...(props as any)}>
      {copied ? '✓' : children || 'Copy'}
    </button>
  );
};

// ============ Highlighter Component ============

export const Highlighter: FC<
  DivProps & {
    language?: string;
  }
> = ({ language, style, children, ...props }) => {
  const highlighterStyle: CSSProperties = {
    fontFamily: 'monospace',
    padding: '12px',
    backgroundColor: 'var(--color-bg-layout, #f5f5f5)',
    borderRadius: 'var(--border-radius, 6px)',
    overflow: 'auto',
    ...style,
  };

  return (
    <pre style={highlighterStyle} {...props}>
      <code>{children}</code>
    </pre>
  );
};

// ============ Icon Component ============

export const Icon: FC<
  DivProps & {
    icon?: ReactNode;
    size?: number | string;
  }
> = ({ icon, size = 24, style, children, ...props }) => {
  const iconStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: typeof size === 'number' ? `${size}px` : size,
    height: typeof size === 'number' ? `${size}px` : size,
    fontSize: typeof size === 'number' ? `${size}px` : size,
    ...style,
  };

  return (
    <span style={iconStyle} {...props}>
      {icon || children}
    </span>
  );
};

// ============ StoryBook Component (placeholder) ============

export const StoryBook: FC<
  DivProps & {
    levaStore?: any;
  }
> = ({ levaStore, children, ...props }) => {
  return <div {...props}>{children}</div>;
};

export const useControls = (controls: any, options?: any): any => {
  return controls;
};

export const useCreateStore = (): any => {
  return null;
};

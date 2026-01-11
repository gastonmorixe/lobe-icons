/**
 * Simple UI component replacements for @lobehub/ui
 */
import React, { CSSProperties, FC, HTMLAttributes, ReactNode } from 'react';

// ============ Basic Type Definitions ============

export type DivProps = HTMLAttributes<HTMLDivElement>;

export interface FlexboxProps extends DivProps {
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly' | 'flex-start' | 'flex-end';
  gap?: number;
  horizontal?: boolean;
  flex?: string | number;
  width?: string | number;
  height?: string | number;
  paddingBlock?: number;
  paddingInline?: number;
  ref?: React.Ref<HTMLDivElement>;
}

export interface CenterProps extends DivProps {
  inline?: boolean;
  flex?: string | number;
  height?: number;
  width?: string | number;
  horizontal?: boolean;
  paddingInline?: number;
  ref?: React.Ref<HTMLDivElement>;
}

export interface TagProps extends DivProps {
  color?: string;
  bordered?: boolean;
  icon?: ReactNode;
}

// ============ Flexbox Component ============

export const Flexbox = React.forwardRef<HTMLDivElement, FlexboxProps>(({
  align = 'stretch',
  justify = 'start',
  gap = 0,
  horizontal = false,
  flex,
  width,
  height,
  paddingBlock,
  paddingInline,
  style,
  className,
  children,
  ...props
}, ref) => {
  const flexStyle: CSSProperties = {
    display: 'flex',
    flexDirection: horizontal ? 'row' : 'column',
    alignItems: align,
    justifyContent: justify === 'flex-start' ? 'start' : justify === 'flex-end' ? 'end' : justify,
    gap: typeof gap === 'number' ? `${gap}px` : gap,
    ...(flex !== undefined && { flex }),
    ...(width !== undefined && { width: typeof width === 'number' ? `${width}px` : width }),
    ...(height !== undefined && { height: typeof height === 'number' ? `${height}px` : height }),
    ...(paddingBlock !== undefined && { paddingBlock: `${paddingBlock}px` }),
    ...(paddingInline !== undefined && { paddingInline: `${paddingInline}px` }),
    ...style,
  };

  return (
    <div ref={ref} className={className} style={flexStyle} {...props}>
      {children}
    </div>
  );
});

Flexbox.displayName = 'Flexbox';

// ============ Center Component ============

export const Center = React.forwardRef<HTMLDivElement, CenterProps>(({ 
  inline = false, 
  flex, 
  height, 
  width,
  horizontal = false,
  paddingInline,
  style, 
  children, 
  ...props 
}, ref) => {
  const centerStyle: CSSProperties = {
    display: inline ? 'inline-flex' : 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: horizontal ? 'row' : undefined,
    ...(flex !== undefined && { flex }),
    ...(height !== undefined && { height: typeof height === 'number' ? `${height}px` : height }),
    ...(width !== undefined && { width: typeof width === 'number' ? `${width}px` : width }),
    ...(paddingInline !== undefined && { paddingInline: `${paddingInline}px` }),
    ...style,
  };

  return (
    <div ref={ref} style={centerStyle} {...props}>
      {children}
    </div>
  );
});

Center.displayName = 'Center';

// ============ Block Component ============

export const Block: FC<DivProps & { variant?: string }> = ({ variant, style, children, ...props }) => {
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

export const Text: FC<
  DivProps & { 
    size?: number; 
    type?: 'primary' | 'secondary' | 'tertiary';
    as?: 'span' | 'p' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    ellipsis?: boolean;
  }
> = ({
  size,
  type = 'primary',
  as = 'div',
  ellipsis = false,
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
    ...(ellipsis && {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    }),
    ...style,
  };

  const Component = as;

  return (
    <Component style={textStyle} {...props}>
      {children}
    </Component>
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

const ICON_SIZE_RATIO = 0.6; // Icon size relative to container

export const ActionIcon: FC<
  HTMLAttributes<HTMLButtonElement> & {
    icon?: ReactNode | any;
    size?: ActionIconSize;
    glass?: boolean;
  }
> = ({ icon, size = 'normal', glass = false, style, children, ...props }) => {
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

  // Handle Lucide icons which are components
  const IconComponent = icon;
  const iconContent = IconComponent && typeof IconComponent === 'function' 
    ? <IconComponent size={sizeMap[size] * ICON_SIZE_RATIO} /> 
    : icon;

  return (
    <button style={iconStyle} {...(props as any)}>
      {iconContent || children}
    </button>
  );
};

// ============ CopyButton Component ============

export const CopyButton: FC<
  HTMLAttributes<HTMLButtonElement> & {
    content?: string;
    size?: string;
    color?: string;
  }
> = ({ content, size, color, style, children, ...props }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    if (content) {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(content);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const buttonStyle: CSSProperties = {
    padding: '4px 8px',
    fontSize: '12px',
    border: '1px solid var(--color-border, #d9d9d9)',
    borderRadius: 'var(--border-radius, 6px)',
    background: color || 'var(--color-bg-container, #ffffff)',
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
  HTMLAttributes<HTMLPreElement> & {
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
    icon?: ReactNode | any;
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

  // Handle Lucide icons which are components
  const IconComponent = icon;
  const iconContent = IconComponent && typeof IconComponent === 'function' 
    ? <IconComponent size={size} /> 
    : icon;

  return (
    <span style={iconStyle} {...props}>
      {iconContent || children}
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

export const useControls = (...args: any[]): any => {
  // Extract the first object which contains the controls
  const controls = args.find(arg => arg && typeof arg === 'object' && !arg.store && !arg.collapsed);
  return controls || {};
};

export const useCreateStore = (): any => {
  return null;
};

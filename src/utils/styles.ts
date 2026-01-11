/**
 * Simple CSS utilities to replace antd-style
 */

// Simple classname concatenation utility
export const cx = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

// CSS variables helper
export const cssVar = {
  colorBorder: 'var(--color-border, #d9d9d9)',
  colorBorderSecondary: 'var(--color-border-secondary, #f0f0f0)',
  colorBgContainer: 'var(--color-bg-container, #ffffff)',
  colorBgLayout: 'var(--color-bg-layout, #f5f5f5)',
  colorText: 'var(--color-text, rgba(0, 0, 0, 0.88))',
  colorTextSecondary: 'var(--color-text-secondary, rgba(0, 0, 0, 0.65))',
  colorTextTertiary: 'var(--color-text-tertiary, rgba(0, 0, 0, 0.45))',
  colorPrimary: 'var(--color-primary, #1677ff)',
  colorPrimaryHover: 'var(--color-primary-hover, #4096ff)',
  borderRadius: 'var(--border-radius, 6px)',
  borderRadiusLG: 'var(--border-radius-lg, 8px)',
  borderRadiusSM: 'var(--border-radius-sm, 4px)',
};

// Simple CSS-in-JS helper for creating scoped styles
let styleCounter = 0;

export const createStaticStyles = (
  stylesFn: (context: {
    css: (strings: TemplateStringsArray, ...values: any[]) => string;
    cssVar: typeof cssVar;
  }) => Record<string, string>
) => {
  const classPrefix = `lobe-icons-${styleCounter++}`;
  
  const css = (strings: TemplateStringsArray, ...values: any[]): string => {
    const className = `${classPrefix}-${Math.random().toString(36).substring(7)}`;
    const cssText = strings.reduce((acc, str, i) => {
      return acc + str + (values[i] || '');
    }, '');
    
    // Inject the style into the document
    if (typeof document !== 'undefined') {
      const styleId = `style-${className}`;
      if (!document.getElementById(styleId)) {
        const styleElement = document.createElement('style');
        styleElement.id = styleId;
        styleElement.textContent = `.${className} { ${cssText} }`;
        document.head.appendChild(styleElement);
      }
    }
    
    return className;
  };

  return stylesFn({ css, cssVar });
};

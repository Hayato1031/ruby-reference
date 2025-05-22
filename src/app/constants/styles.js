export const colors = {
  rubyRed: '#dc2626',
  rubyRedLight: '#ef4444',
  rubyRedDark: '#b91c1c',
  textPrimary: '#111827',
  textSecondary: '#6b7280',
  textTertiary: '#9ca3af',
  bgPrimary: '#ffffff',
  bgSecondary: '#f9fafb',
  borderLight: '#e5e7eb',
  borderMedium: '#d1d5db',
};

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
};

export const gradients = {
  ruby: `linear-gradient(135deg, ${colors.rubyRed} 0%, ${colors.rubyRedLight} 100%)`,
  background: 'linear-gradient(135deg, #fafafa 0%, #ffffff 100%)',
};

export const fontFamily = {
  sans: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  mono: "'JetBrains Mono', monospace",
}; 
import { colors } from '../constants/styles';

const Sidebar = ({ sections, activeSection, onSectionChange }) => {
  const styles = {
    sidebar: {
      position: 'sticky',
      top: '6rem',
      height: 'fit-content',
    },
    card: {
      background: colors.bgSecondary,
      border: `1px solid ${colors.borderLight}`,
      borderRadius: '12px',
      padding: '1.5rem',
    },
    section: {
      marginBottom: '2rem',
    },
    sectionTitle: {
      fontSize: '0.85rem',
      fontWeight: 700,
      color: colors.textPrimary,
      marginBottom: '1rem',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },
    navItem: {
      padding: '0.75rem 1rem',
      margin: '0.25rem 0',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      fontWeight: 500,
      fontSize: '0.9rem',
      color: colors.textSecondary,
      minHeight: '44px',
      display: 'flex',
      alignItems: 'center',
    },
    activeNavItem: {
      background: colors.rubyRed,
      color: 'white',
    },
  };

  return (
    <aside style={styles.sidebar}>
      <div style={styles.card}>
        {sections.map((section, idx) => (
          <div
            key={section.id}
            style={{
              ...styles.section,
              marginBottom: idx === sections.length - 1 ? 0 : styles.section.marginBottom,
            }}
          >
            <h3 style={styles.sectionTitle}>{section.title}</h3>
            {section.items.map((item) => {
              const isActive = activeSection.groupId === section.id && activeSection.genreId === item.id;
              
              return (
                <div
                  key={`${section.id}-${item.id}`}
                  style={{
                    ...styles.navItem,
                    ...(isActive ? styles.activeNavItem : {}),
                  }}
                  onClick={() => onSectionChange(item.id, section.id)}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.target.style.background = colors.bgPrimary;
                      e.target.style.color = colors.rubyRed;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.target.style.background = 'transparent';
                      e.target.style.color = colors.textSecondary;
                    }
                  }}
                  role="button"
                  tabIndex="0"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSectionChange(item.id, section.id);
                    }
                  }}
                  aria-label={`${section.title} - ${item.name}を選択`}
                >
                  {item.name}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
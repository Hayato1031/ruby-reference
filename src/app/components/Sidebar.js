import { colors } from '../constants/styles';

const Sidebar = ({ sections, activeSection, onSectionChange }) => {
  const styles = {
    sidebar: {
      position: 'sticky',
      top: '6rem',
      height: 'fit-content',
      '@media (max-width: 768px)': {
        position: 'relative',
        top: 0,
        marginBottom: '2rem',
      },
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
      '&:hover': {
        background: colors.bgPrimary,
        color: colors.rubyRed,
      },
    },
    activeNavItem: {
      background: colors.rubyRed,
      color: 'white',
      '&:hover': {
        background: colors.rubyRed,
        color: 'white',
      },
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
            {section.items.map((item) => (
              <div
                key={`${section.id}-${item.id}`}
                style={{
                  ...styles.navItem,
                  ...((activeSection.groupId === section.id && activeSection.genreId === item.id) ? styles.activeNavItem : {}),
                }}
                onClick={() => onSectionChange(item.id, section.id)}
              >
                {item.name}
              </div>
            ))}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;  
import { Expand, GitPullRequest, Trees } from 'lucide-react';

import { Center, Flexbox } from '../src/utils/ui-components';
import Dashboard from '../src/components/Dashboard';

// Simple Snippet component replacement
const Snippet = ({ language, children }: { language?: string; children: React.ReactNode }) => (
  <pre style={{ 
    padding: '12px',
    backgroundColor: '#f5f5f5',
    borderRadius: '6px',
    fontFamily: 'monospace',
    fontSize: '14px',
  }}>
    <code>{children}</code>
  </pre>
);

// Simple Features component replacement
interface FeaturesProps {
  items: Array<{
    icon: React.ComponentType<any>;
    title: string;
    description: string;
  }>;
}

const Features = ({ items }: FeaturesProps) => (
  <div style={{ 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
    marginTop: '32px',
  }}>
    {items.map((item, index) => (
      <div key={index} style={{ 
        padding: '24px',
        border: '1px solid var(--color-border, #d9d9d9)',
        borderRadius: '8px',
      }}>
        <item.icon style={{ width: '32px', height: '32px', marginBottom: '12px' }} />
        <h3 style={{ marginBottom: '8px' }}>{item.title}</h3>
        <p style={{ color: 'var(--color-text-secondary, rgba(0, 0, 0, 0.65))' }}>{item.description}</p>
      </div>
    ))}
  </div>
);

const items = [
  {
    description:
      'Icons are designed to be lightweight, utilizing highly optimized scalable vector graphics (SVG) for the best performance and quality.',
    icon: Expand,
    title: 'Lightweight & Scalable',
  },
  {
    description:
      'The collection is tree-shakable, ensuring that you only import the icons that you use, which helps in reducing the overall bundle size of your project.',
    icon: Trees,
    title: 'Tree Shakable',
  },
  {
    description:
      'Lobe Icons boasts an active community of designers and developers. Engage with us on platforms like GitHub and Discord to contribute or get support.',
    icon: GitPullRequest,
    title: 'Active Community',
  },
];

export default () => {
  return (
    <Flexbox gap={48}>
      <Center>
        <h2 style={{ fontSize: 20 }}>To install Lobe Icons, run the following command:</h2>
        <Snippet language={'bash'}>{'$ bun add @lobehub/icons'}</Snippet>
        <div style={{ marginTop: 16, zIndex: 100 }}>
          <a
            href="https://www.producthunt.com/products/lobe-icons?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-lobe&#0045;icons"
            rel="noreferrer"
            target="_blank"
          >
            <img
              alt="Lobe&#0032;Icons - A&#0032;Collection&#0032;of&#0032;AI&#0032;Company&#0032;&#0032;&#0047;&#0032;LLM&#0032;Model&#0032;Logo | Product Hunt"
              height="54"
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1047110&theme=light&t=1765199661410"
              style={{ height: 54, width: 250 }}
              width="250"
            />
          </a>
        </div>
      </Center>
      <Dashboard />
      <Features items={items} />
    </Flexbox>
  );
};

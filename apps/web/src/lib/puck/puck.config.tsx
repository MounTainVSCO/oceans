import { Config, DropZone } from '@measured/puck';

// Import our components
import { HeadingBlock } from './components/HeadingBlock';
import { TextBlock } from './components/TextBlock';
import { ImageBlock } from './components/ImageBlock';
import { GridContainer } from './components/GridContainer';
import { GridItem } from './components/GridItem';
import { HeroSection } from './components/HeroSection';
import { CardBlock } from './components/CardBlock';
import { HeaderBlock } from './components/HeaderBlock';
import { FooterBlock } from './components/FooterBlock';
import { Root } from './Root';

// Define the component props types
export type Props = {
  HeadingBlock: {
    title: string;
    level: 1 | 2 | 3 | 4 | 5 | 6;
    textAlign: 'left' | 'center' | 'right';
    color: string;
  };
  TextBlock: {
    content: string;
    textAlign: 'left' | 'center' | 'right';
    fontSize: string;
    color: string;
  };
  ImageBlock: {
    src: string;
    alt: string;
    width: string;
    height: string;
    borderRadius: string;
  };
  GridContainer: {
    columns: number;
    gap: number;
    padding: number;
    verticalPadding: number;
    layout: 'horizontal' | 'vertical';
    backgroundColor: string;
  };
  GridItem: {
    columnSpan: number;
    rowSpan: number;
    backgroundColor: string;
    padding: number;
  };
  HeroSection: {
    quote: string;
    title: string;
    description: string;
    buttons: { label: string; href: string }[];
    align: 'left' | 'center';
    image: { url: string; mode: 'inline' | 'bg' | 'custom' };
    paddingTop: number;
    paddingBottom: number;
    paddingLeft: number;
    paddingRight: number;
  };
  CardBlock: {
    title: string;
    content: string;
    imageUrl: string;
    backgroundColor: string;
    textColor: string;
    borderRadius: number;
    padding: number;
  };
};

// Puck configuration
export const config: Config<Props> = {
  // Define all available components
  components: {
    HeadingBlock: {
      fields: {
        title: { type: 'text' },
        level: {
          type: 'select',
          options: [
            { label: 'H1', value: 1 },
            { label: 'H2', value: 2 },
            { label: 'H3', value: 3 },
            { label: 'H4', value: 4 },
            { label: 'H5', value: 5 },
            { label: 'H6', value: 6 },
          ],
        },
        textAlign: {
          type: 'select',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' },
          ],
        },
        color: {
          type: 'select',
          options: [
            { label: 'Default', value: 'inherit' },
            { label: 'Primary', value: '#3B82F6' },
            { label: 'Secondary', value: '#6B7280' },
            { label: 'Success', value: '#10B981' },
            { label: 'Warning', value: '#F59E0B' },
            { label: 'Error', value: '#EF4444' },
            { label: 'Dark', value: '#1F2937' },
            { label: 'Light', value: '#F9FAFB' },
          ],
        },
      },
      defaultProps: {
        title: 'Heading',
        level: 2,
        textAlign: 'left',
        color: 'inherit',
      },
      render: HeadingBlock,
    },
    TextBlock: {
      fields: {
        content: { type: 'textarea' },
        textAlign: {
          type: 'select',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' },
          ],
        },
        fontSize: {
          type: 'select',
          options: [
            { label: 'Small', value: 'text-sm' },
            { label: 'Base', value: 'text-base' },
            { label: 'Large', value: 'text-lg' },
            { label: 'XL', value: 'text-xl' },
            { label: '2XL', value: 'text-2xl' },
            { label: '3XL', value: 'text-3xl' },
            { label: '4XL', value: 'text-4xl' },
          ],
        },
        color: {
          type: 'select',
          options: [
            { label: 'Default', value: 'inherit' },
            { label: 'Primary', value: '#3B82F6' },
            { label: 'Secondary', value: '#6B7280' },
            { label: 'Success', value: '#10B981' },
            { label: 'Warning', value: '#F59E0B' },
            { label: 'Error', value: '#EF4444' },
            { label: 'Dark', value: '#1F2937' },
            { label: 'Light', value: '#F9FAFB' },
          ],
        },
      },
      defaultProps: {
        content: 'Enter your text here...',
        textAlign: 'left',
        fontSize: 'text-base',
        color: 'inherit',
      },
      render: TextBlock,
    },
    ImageBlock: {
      fields: {
        src: { type: 'text', label: 'Image URL' },
        alt: { type: 'text', label: 'Alt Text' },
        width: {
          type: 'select',
          options: [
            { label: 'Full Width', value: 'w-full' },
            { label: 'Half Width', value: 'w-1/2' },
            { label: 'Third Width', value: 'w-1/3' },
            { label: 'Quarter Width', value: 'w-1/4' },
            { label: 'Auto', value: 'w-auto' },
          ],
        },
        height: {
          type: 'select',
          options: [
            { label: 'Auto', value: 'h-auto' },
            { label: 'Small', value: 'h-32' },
            { label: 'Medium', value: 'h-48' },
            { label: 'Large', value: 'h-64' },
            { label: 'Extra Large', value: 'h-96' },
          ],
        },
        borderRadius: {
          type: 'select',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Small', value: 'rounded' },
            { label: 'Medium', value: 'rounded-lg' },
            { label: 'Large', value: 'rounded-xl' },
            { label: 'Full', value: 'rounded-full' },
          ],
        },
      },
      defaultProps: {
        src: 'https://via.placeholder.com/400x300?text=Image',
        alt: 'Image description',
        width: 'w-full',
        height: 'h-auto',
        borderRadius: 'rounded-lg',
      },
      render: ImageBlock,
    },
    GridContainer: {
      fields: {
        columns: {
          type: 'number',
          min: 1,
          max: 12,
          label: 'Number of Columns',
        },
        gap: {
          type: 'number',
          min: 8,
          max: 64,
          label: 'Gap (px)',
        },
        padding: {
          type: 'number',
          min: 0,
          max: 64,
          label: 'Horizontal Padding (px)',
        },
        verticalPadding: {
          type: 'number',
          min: 0,
          max: 64,
          label: 'Vertical Padding (px)',
        },
        layout: {
          type: 'select',
          options: [
            { label: 'Grid Layout', value: 'horizontal' },
            { label: 'Vertical Stack', value: 'vertical' },
          ],
          label: 'Layout Type',
        },
        backgroundColor: {
          type: 'select',
          options: [
            { label: 'Transparent', value: 'transparent' },
            { label: 'White', value: '#FFFFFF' },
            { label: 'Gray 50', value: '#F9FAFB' },
            { label: 'Gray 100', value: '#F3F4F6' },
            { label: 'Blue 50', value: '#EFF6FF' },
            { label: 'Green 50', value: '#F0FDF4' },
            { label: 'Yellow 50', value: '#FFFBEB' },
            { label: 'Purple 50', value: '#FAF5FF' },
          ],
        },
      },
      defaultProps: {
        columns: 3,
        gap: 16,
        padding: 16,
        verticalPadding: 16,
        layout: 'horizontal',
        backgroundColor: 'transparent',
      },
      render: GridContainer,
    },
    GridItem: {
      fields: {
        columnSpan: {
          type: 'number',
          min: 1,
          max: 12,
          label: 'Column Span',
        },
        rowSpan: {
          type: 'number',
          min: 1,
          max: 6,
          label: 'Row Span',
        },
        backgroundColor: {
          type: 'select',
          options: [
            { label: 'Transparent', value: 'transparent' },
            { label: 'White', value: '#FFFFFF' },
            { label: 'Gray 50', value: '#F9FAFB' },
            { label: 'Gray 100', value: '#F3F4F6' },
            { label: 'Blue 50', value: '#EFF6FF' },
            { label: 'Green 50', value: '#F0FDF4' },
          ],
        },
        padding: {
          type: 'number',
          min: 0,
          max: 32,
          label: 'Padding (px)',
        },
      },
      defaultProps: {
        columnSpan: 1,
        rowSpan: 1,
        backgroundColor: '#FFFFFF',
        padding: 16,
      },
      render: GridItem,
    },
    HeroSection: {
      fields: {
        quote: { type: 'text', label: 'Quote' },
        title: { type: 'text', label: 'Title' },
        description: { type: 'textarea', label: 'Description' },
        buttons: {
          type: 'array',
          label: 'Buttons',
          of: {
            type: 'object',
            fields: {
              label: { type: 'text', label: 'Label' },
              href: { type: 'text', label: 'Link' },
            },
          },
        },
        align: {
          type: 'select',
          label: 'Align',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
          ],
        },
        image: {
          type: 'object',
          label: 'Image',
          fields: {
            url: { type: 'text', label: 'URL' },
            mode: {
              type: 'select',
              label: 'Mode',
              options: [
                { label: 'Inline', value: 'inline' },
                { label: 'Background', value: 'bg' },
                { label: 'Custom', value: 'custom' },
              ],
            },
          },
        },
        paddingTop: { type: 'number', label: 'Padding Top', min: 0, max: 128 },
        paddingBottom: {
          type: 'number',
          label: 'Padding Bottom',
          min: 0,
          max: 128,
        },
        paddingLeft: {
          type: 'number',
          label: 'Padding Left',
          min: 0,
          max: 128,
        },
        paddingRight: {
          type: 'number',
          label: 'Padding Right',
          min: 0,
          max: 128,
        },
      },
      defaultProps: {
        quote: '',
        title: 'Welcome to My Portfolio',
        description: 'A showcase of my work and skills',
        buttons: [
          { label: 'Learn more', href: '#' },
          { label: 'Button', href: '#' },
        ],
        align: 'left',
        image: { url: '', mode: 'inline' },
        paddingTop: 48,
        paddingBottom: 48,
        paddingLeft: 24,
        paddingRight: 24,
      },
      render: HeroSection,
    },
    CardBlock: {
      fields: {
        title: { type: 'text' },
        content: { type: 'textarea' },
        imageUrl: { type: 'text', label: 'Image URL' },
        backgroundColor: {
          type: 'select',
          options: [
            { label: 'Transparent', value: 'transparent' },
            { label: 'White', value: '#FFFFFF' },
            { label: 'Gray 50', value: '#F9FAFB' },
            { label: 'Gray 100', value: '#F3F4F6' },
            { label: 'Blue 50', value: '#EFF6FF' },
            { label: 'Green 50', value: '#F0FDF4' },
          ],
        },
        textColor: {
          type: 'select',
          options: [
            { label: 'Default', value: 'inherit' },
            { label: 'Dark', value: '#1F2937' },
            { label: 'Gray', value: '#6B7280' },
            { label: 'Blue', value: '#3B82F6' },
            { label: 'Green', value: '#10B981' },
          ],
        },
        borderRadius: {
          type: 'number',
          min: 0,
          max: 32,
          label: 'Border Radius (px)',
        },
        padding: {
          type: 'number',
          min: 0,
          max: 32,
          label: 'Padding (px)',
        },
      },
      defaultProps: {
        title: 'Card Title',
        content: 'Card content goes here...',
        imageUrl: '',
        backgroundColor: '#FFFFFF',
        textColor: '#1F2937',
        borderRadius: 8,
        padding: 16,
      },
      render: CardBlock,
    },
  },

  // Custom root component for responsive design
  root: Root,

  // Default data for new pages
  defaultData: {
    root: {
      type: 'root',
      props: {},
      children: [
        // The main drop zone for user content will be in the Root layout as zone="default-zone"
      ],
      zones: {
        'default-zone': [
          // Optionally, you can add a default section/component here
        ],
      },
    },
  },
};

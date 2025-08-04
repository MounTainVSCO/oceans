import { Button } from './blocks/Button';
import { Card } from './blocks/Card';
import { Grid } from './blocks/Grid';
import { Hero } from './blocks/Hero';
import { Heading } from './blocks/Heading';
import { Flex } from './blocks/Flex';
import { Logos } from './blocks/Logos';
import { Stats } from './blocks/Stats';
import { Template } from './blocks/Template';
import { Text } from './blocks/Text';
import { Space } from './blocks/Space';

import Root from '../Root';
// Placeholder types and initialData
export type UserConfig = any;
export const initialData = {};

export const conf: UserConfig = {
  root: Root,
  categories: {
    layout: {
      components: ['Grid', 'Flex', 'Space'],
    },
    typography: {
      components: ['Heading', 'Text'],
    },
    interactive: {
      title: 'Actions',
      components: ['Button'],
    },
    other: {
      title: 'Other',
      components: ['Card', 'Logos', 'Stats', 'Template' /*'Hero'*/],
    },
  },
  components: {
    Button,
    Card,
    Grid,
    //Hero,
    Heading,
    Flex,
    Logos,
    Stats,
    Template,
    Text,
    Space,
  },
};

// function toBase64(str: string) {
//   if (typeof window !== 'undefined' && window.btoa) {
//     return window.btoa(unescape(encodeURIComponent(str)));
//   }
//   if (typeof Buffer !== 'undefined') {
//     return Buffer.from(str, 'utf-8').toString('base64');
//   }
//   throw new Error('No base64 encoding available');
// }

// export const componentKey = toBase64(
//   `${Object.keys(conf.components).join('-')}-${JSON.stringify(initialData)}`
// );

export default conf;

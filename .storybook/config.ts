/*
 * @Date: 2019-11-21 11:40:00
 * @LastEditors: Tian Zhi
 * @LastEditTime: 2019-11-21 11:40:28
 */
import { configure, addParameters } from '@storybook/react';
// automatically import all files ending in *.stories.tsx
configure(require.context('../src', true, /\.stories\.tsx?$/), module)

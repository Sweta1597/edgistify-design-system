'use client';
import { useState } from 'react';
import {
  Menu, Select, MultiSelect, CascadeSelect, TreeSelect,
} from '@edgistify/design-system/react/Menu';
import { Popover, useDropdown } from '@edgistify/design-system/react/Popover';
import { Button, ButtonGroup } from '@edgistify/design-system/react/Button';
import { Example } from '@/components/Example';

/* `Select` here is the listbox from the menu family, not the native <select>
   from the input family. They never share a scope, so neither needs renaming. */
export function MenuDemo(props) {
  return (
    <Example {...props}
      scope={{ Menu, Select, MultiSelect, CascadeSelect, TreeSelect,
               Popover, useDropdown, Button, ButtonGroup, useState }} />
  );
}

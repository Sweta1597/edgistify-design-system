'use client';
import { useState } from 'react';
import {
  Field, Input, Textarea, Select, InputGroup, InputAddon, InputIcon, Checkbox, Radio,
} from '@edgistify/design-system/react/Input';
import { Button } from '@edgistify/design-system/react/Button';
import { Example } from '@/components/Example';

export function InputDemo(props) {
  return (
    <Example {...props}
      scope={{ Field, Input, Textarea, Select, InputGroup, InputAddon, InputIcon,
               Checkbox, Radio, Button, useState }} />
  );
}

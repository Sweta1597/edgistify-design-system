'use client';
import { useState } from 'react';
import { Modal, ModalBody, ModalFooter } from '@edgistify/design-system/react/Modal';
import { Button, ButtonGroup } from '@edgistify/design-system/react/Button';
import { Field, Input, Select } from '@edgistify/design-system/react/Input';
import { Example } from '@/components/Example';

/* Modal examples need state, so they run with noInline and call render(). */
export function ModalDemo(props) {
  return (
    <Example {...props} noInline
      scope={{ Modal, ModalBody, ModalFooter, Button, ButtonGroup, Field, Input, Select, useState }} />
  );
}

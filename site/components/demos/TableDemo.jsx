'use client';
import { useState } from 'react';
import { Table } from '@edgistify/design-system/react/Table';
import { Button } from '@edgistify/design-system/react/Button';
import { Example } from '@/components/Example';

export function TableDemo(props) {
  return <Example {...props} scope={{ Table, Button, useState }} />;
}

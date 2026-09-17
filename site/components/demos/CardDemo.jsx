'use client';
import { Card } from '@edgistify/design-system/react/Card';
import { Button, ButtonGroup } from '@edgistify/design-system/react/Button';
import { Example } from '@/components/Example';

export function CardDemo(props) {
  return <Example {...props} scope={{ Card, Button, ButtonGroup }} />;
}

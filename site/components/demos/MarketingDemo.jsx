'use client';
import * as M from '@edgistify/design-system/react/marketing';
import { SiteHeader } from '@edgistify/design-system/react/marketing/Header';
import { Button } from '@edgistify/design-system/react/Button';
import { Badge } from '@edgistify/design-system/react/Badge';
import { Icon } from '@edgistify/design-system/react/Icon';
import { Package, Warehouse, Truck, CalendarClock, Building, Layers, Sparkles } from '@edgistify/design-system/icons';
import { Example } from '@/components/Example';

/* Every marketing example renders inside the `.ed-mk` scope, exactly as a
   page would, so the sizes you see are the sizes the website ships. */
export function MarketingDemo(props) {
  return (
    <div className="ed-mk mk-demo">
      <Example {...props} scope={{ ...M, SiteHeader, Button, Badge, Icon, Package, Warehouse, Truck, CalendarClock, Building, Layers, Sparkles }} />
    </div>
  );
}

import { Badge } from '@/components/ui/badge';

interface ProductStatusProps {
  status: string;
}

export function ProductStatus({ status }: ProductStatusProps) {
  if (status === 'published') {
    return <Badge variant='default'>Published</Badge>;
  }

  if (status === 'draft') {
    return <Badge variant='outline'>Draft</Badge>;
  }

  if (status === 'archived') {
    return <Badge variant='secondary'>Archived</Badge>;
  }

  return null;
}

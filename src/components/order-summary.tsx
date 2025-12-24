import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { type Order, useOrderStore } from '@/store/useOrderStore';

interface OrderSummaryProps {
  order: Order;
  onBid: () => void;
}

export default function OrderSummary({ order, onBid }: OrderSummaryProps) {
  const t = useTranslations('orderSummary');
  const getBids = useOrderStore((state) => state.getBids);
  const bids = getBids(order.id);

  return (
    <div className='border rounded-lg p-4 sticky top-4'>
      <h2 className='text-2xl font-semibold mb-4'>{t('title')}</h2>
      <div className='space-y-2 mb-4'>
        <p>
          {t('orderDate')}: {order.date}
        </p>
        <p>
          {t('totalItems')}:{' '}
          {order.items.reduce((sum, item) => sum + item.quantity, 0)}
        </p>
        <p>
          {t('total')}: ${order.total.toFixed(2)}
        </p>
        <p>
          {t('status')}: {order.status}
        </p>
      </div>
      <Button onClick={onBid} className='w-full mb-4'>
        {t('placeBid')}
      </Button>
      <h3 className='text-xl font-semibold mb-2'>{t('currentBids')}</h3>
      {bids.length > 0 ? (
        <ul className='space-y-2'>
          {bids.map((bid) => (
            <li key={bid.id} className='border-b pb-2'>
              <p>
                {t('bidder')}: {bid.agentName}
              </p>
              <p>
                {t('bidAmount')}: ${bid.amount.toFixed(2)}
              </p>
              <p>
                {t('estimatedDelivery')}: {bid.estimatedDeliveryDate}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>{t('noBids')}</p>
      )}
    </div>
  );
}

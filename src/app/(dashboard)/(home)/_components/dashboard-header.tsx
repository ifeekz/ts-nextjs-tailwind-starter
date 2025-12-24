'use client';

import dayjs from 'dayjs';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export function DashboardHeader() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Dashboard</h1>
        <p className='text-muted-foreground'>
          Welcome back to your Price Match dashboard
        </p>
      </div>
      <Card>
        <CardContent className='p-2'>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                className='w-[240px] justify-start text-left font-normal'
              >
                <CalendarIcon className='mr-2 h-4 w-4' />
                {date ? (
                  dayjs(date).format('MMMM D, YYYY')
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='end'>
              <Calendar
                mode='single'
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </CardContent>
      </Card>
    </div>
  );
}

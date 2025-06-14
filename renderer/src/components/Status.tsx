import { forwardRef } from 'react';

export const Status = forwardRef<
  HTMLDivElement,
  { running: boolean; status: string | null }
>(({ running }, ref) => {
  return (
    <div
      ref={ref}
      className={`flex flex-row items-center bg-white rounded-3xl py-3 px-6 font-bold ${
        running ? 'text-green-600' : 'text-gray-500'
      } mt-10 text-sm`}
    >
      <span
        className={`w-2 h-2 rounded-full ${
          running ? 'bg-green-600' : 'bg-gray-500'
        } mr-2`}
      ></span>{' '}
      {running ? 'Online' : 'Offline'}
    </div>
  );
});

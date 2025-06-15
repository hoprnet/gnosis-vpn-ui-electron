import { forwardRef } from 'react';
import { useStateStore } from '../stores/stateStore';
import { colors } from '../const/colors';

export const Status = forwardRef<HTMLDivElement>((_, ref) => {
  const status = useStateStore(state => state.status);

  return (
    <div
      ref={ref}
      className={`flex flex-row items-center bg-white rounded-3xl py-3 px-6 font-bold ${
        colors[status].text
      } mt-10 text-sm capitalize border-1 ${colors[status].border} ${
        status === 'quitting' ? 'animate-pulse' : ''
      }`}
    >
      <span
        className={`w-2 h-2 rounded-full ${colors[status].bg} mr-2 ${colors[status].text}`}
      ></span>{' '}
      {status === 'loading' ? 'connecting' : status}
    </div>
  );
});

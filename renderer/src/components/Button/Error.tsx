import { colors } from '../../const/colors';

export const Error = () => {
  return (
    <div
      className={`rounded-2xl bg-orange-50 p-6 w-full mb-4 flex flex-col gap-2 `}
    >
      <div className={`flex text-xs ${colors.error.text} text-bold`}>Error</div>
    </div>
  );
};

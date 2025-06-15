import { colors } from '../const/colors';
import { useStateStore } from '../stores/stateStore';

export const Config = () => {
  const status = useStateStore(state => state.status);
  const apiConfigSet = useStateStore(state => state.apiConfigSet);
  const apiConfig = useStateStore(state => state.apiConfig);
  const setApiConfig = useStateStore(state => state.setApiConfig);

  if (status !== 'offline') return null;

  if (apiConfigSet) return null;

  return (
    <div className="rounded-2xl bg-white p-6 w-[300px] my-4 flex flex-col text-left gap-2 border-1 border-neutral-200">
      <div className="flex text-neutral-800 text-sm font-bold">
        <img
          src="/api-endpoint.svg"
          alt="api endpoint"
          width={16}
          height={17}
          className="mr-2"
        />
        API endpoint
      </div>
      <input
        type="text"
        value={apiConfig.apiEndpoint}
        onChange={e => setApiConfig(e.target.value, apiConfig.apiToken)}
        className={`bg-gray-200/80 border-1 border-gray-200 rounded-lg p-2 outline-none ${colors.offline.text} text-xs font-bold`}
      ></input>

      <div className="flex text-neutral-800 text-sm font-bold">
        <img
          src="/api-token.svg"
          alt="api token"
          width={16}
          height={17}
          className="mr-2"
        />
        API token
      </div>
      <input
        type="text"
        value={apiConfig.apiToken}
        onChange={e => setApiConfig(apiConfig.apiEndpoint, e.target.value)}
        className={`bg-gray-200/80 border-1 border-gray-200 rounded-lg p-2 outline-none ${colors.offline.text} text-xs font-bold`}
      ></input>
    </div>
  );
};

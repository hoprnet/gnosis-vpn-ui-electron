const countries = [
  { name: 'Germany', type: 'exit', selected: true },
  { name: 'Spain', type: 'hub', selected: true },
  { name: 'India', type: 'hub', selected: false },
  { name: 'United States', type: 'hub', selected: false },
];

const ManageRouteModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const handleBack = () => {
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-gray-100 p-6 flex flex-col">
      <button
        className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-4 hover:bg-gray-200 transition hover:cursor-pointer"
        onClick={handleBack}
        aria-label="Back"
      >
        <img src="/chevron-left.png" alt="Back" className="w-6 h-6" />
      </button>

      {/* Modal Container */}
      <div className="bg-white rounded-3xl p-6 flex-1">
        <h2 className="text-2xl font-bold mb-2">Manage route</h2>
        <p className="text-gray-500 mb-6">
          Customize your route by selecting which countries your traffic passes
          through.
        </p>

        <div className="space-y-6">
          {countries.map(country => (
            <div
              key={country.name}
              className={`flex items-center justify-between ${
                country.selected ? '' : 'opacity-40'
              }`}
            >
              <div className="flex items-center">
                {/* Drag Handle */}
                <div className="w-4 h-4 mr-4 flex flex-col justify-center items-center">
                  <div className="w-1 h-1 bg-gray-400 rounded-full mb-0.5" />
                  <div className="w-1 h-1 bg-gray-400 rounded-full mb-0.5" />
                  <div className="w-1 h-1 bg-gray-400 rounded-full" />
                </div>

                {/* Icon */}
                {country.type === 'exit' ? (
                  <div className="bg-green-700 p-2 rounded-md mr-3">
                    <div className="w-3 h-3 border-2 border-white rounded-sm"></div>
                  </div>
                ) : (
                  <div className="relative mr-3">
                    <div className="w-6 h-6 bg-green-700 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div className="absolute top-1 left-1 w-6 h-6 border-2 border-white rounded-full"></div>
                  </div>
                )}

                <div className="flex flex-col">
                  <span className="text-xs font-bold text-green-700 uppercase">
                    {country.type}
                  </span>
                  <span className="font-bold text-green-700 text-lg">
                    {country.name}
                  </span>
                </div>
              </div>

              {/* Selection Check/Empty */}
              <div className="text-2xl">
                {country.selected ? (
                  <span className="text-black">\u2713</span>
                ) : (
                  <span className="text-gray-400">\u25CB</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Description Note */}
        <p className="text-sm text-gray-400 mt-6">
          Your <span className="text-green-700">\u25A2 EXIT</span> country is
          where websites see you connecting from.{' '}
          <span className="text-green-700">\u25EF HUB</span> countries add
          privacy layers.
        </p>
      </div>
    </div>
  );
};

export default ManageRouteModal;

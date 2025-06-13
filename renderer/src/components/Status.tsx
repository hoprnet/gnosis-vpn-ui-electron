export const Status = ({ running }: { running: boolean }) => {
  return <div>Status: {running ? 'Running' : 'Stopped'}</div>;
};

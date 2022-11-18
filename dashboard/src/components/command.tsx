import dayjs from 'dayjs';
import { useState } from 'preact/hooks';
import { createPortal } from 'preact/compat';

export const Command = (props: {
  command: {
    timestamp: number;
    username: string;
    userID: string;
    command: string;
    options: { name: string; value: string }[];
    response: string;
  };
}) => {
  const [responseHidden, setResponseHidden] = useState(true);

  return (
    <div
      class={`flex flex-col text-xs hover:bg-zinc-700 rounded-md cursor-pointer ${
        !responseHidden ? 'bg-zinc-700' : ''
      }`}
      onClick={() => setResponseHidden((prev) => !prev)}
    >
      <div class="flex items-center gap-2 p-1 px-2">
        <span class="bg-green-800 rounded-md p-1 border">
          {dayjs(props.command.timestamp).format('YYYY/MM/DD HH:mm:ss')}
        </span>
        <span class="border rounded-md p-1" title={props.command.userID}>
          {props.command.username}
        </span>
        <p class="rounded-md p-1 border">{props.command.command}</p>
        {props.command.options.map((x) => (
          <div class="border flex items-center rounded-md">
            <p class="bg-green-800 rounded-l-md p-1 mr-1">{x.name}:</p>
            <p class="p-1">{x.value}</p>
          </div>
        ))}
      </div>
      {!responseHidden &&
        createPortal(
          <div class="block text-sm overflow-y-auto w-max mx-auto p-2 rounded-md border my-auto bg-zinc-800 flex flex-col">
            <div class="flex justify-between items-center">
              <p>Response</p>
              <button
                onClick={() => setResponseHidden((prev) => !prev)}
                class="ml-auto border p-1 rounded-md pointer-events-auto"
              >
                close
              </button>
            </div>
            <pre class="pt-2 pointer-events-auto">{props.command.response}</pre>
          </div>,
          document.getElementById('modal')!
        )}
    </div>
  );
};

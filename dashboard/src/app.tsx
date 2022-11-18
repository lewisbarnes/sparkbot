import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { useEffect, useState } from 'preact/hooks';
import * as socketio from 'socket.io-client';
import './app.css';
import sparkBotLogo from './assets/sparkbot.webp';
import { Command } from './components/command';

dayjs.extend(duration);

export function App() {
  const apiEndPoint = 'http://localhost:3000/api';
  const [socket, setSocket] = useState<socketio.Socket>();
  const [botUptime, setBotUptime] = useState(dayjs.duration(0));
  const [lastUpdate, setLastUpdate] = useState(dayjs());
  const [executedCommands, setExecutedCommands] = useState<
    {
      timestamp: number;
      username: string;
      command: string;
      userID: string;
      options: { name: string; value: string }[];
      response: string;
    }[]
  >([]);

  const refreshData = () => {
    fetch(`${apiEndPoint}/commands`)
      .then((res) => res.json())
      .then((commands: any) => {
        setExecutedCommands(commands);
        setLastUpdate(dayjs());
      });

    fetch(`${apiEndPoint}/uptime`)
      .then((res) => res.json())
      .then((uptime) => setBotUptime(dayjs.duration(uptime.uptime)));
  };

  useEffect(() => {
    const uptimeInterval = setInterval(() => {
      setBotUptime((prev) => dayjs.duration(prev.asMilliseconds() + 1000));
    }, 1000);

    const dataInterval = setInterval(() => {
      refreshData();
    }, 30000);

    refreshData();

    return () => {
      clearInterval(uptimeInterval);
    };
  }, []);

  return (
    <>
      <div class="absolute w-screen h-screen z-50 grid pointer-events-none" id="modal"></div>
      <div class="flex flex-col bg-black h-screen text-white gap-4 p-4">
        <div class="flex flex-row gap-4 items-center" id="header">
          <img class="rounded-full h-8 w-8 border-2" src={sparkBotLogo} />
          <h1 class="text-2xl">SparkBot Dashboard</h1>
        </div>
        <div class="flex flex-grow gap-2 max-h-[87vh]">
          <div
            class="flex flex-col gap-2 lg:w-[80%] flex-grow bg-zinc-900 rounded-md border"
            id="commands"
          >
            <div class="flex flex-col flex-grow gap-2 p-2 overflow-y-auto font-mono text-xs">
              {executedCommands
                .sort((a, b) => (a.timestamp < b.timestamp ? -1 : 1))
                .map((command, i) => (
                  <Command command={command} />
                ))}
            </div>
          </div>
          <div class="hidden md:block flex flex-col gap-1 flex-grow bg-zinc-900 rounded-md border p-2 text-sm">
            <p>
              Uptime:{' '}
              {`${Math.floor(
                botUptime.asHours()
              )}h ${botUptime.minutes()}m ${botUptime.seconds()}s`}
            </p>
            <p class="">Commands Executed: {executedCommands.length}</p>
          </div>
        </div>

        <div class="flex justify-between text-sm items-center">
          <button onClick={refreshData} class="border p-2 rounded-md hover:scale-[104%]">
            Refresh
          </button>
          <div class="flex gap-2 items-center">
            <span>Data last updated: {lastUpdate.format('YYYY/MM/DD HH:mm:ss')}</span>
          </div>
        </div>
      </div>
    </>
  );
}

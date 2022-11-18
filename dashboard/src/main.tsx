import { render } from 'preact';
import { App } from './app';
import './index.css';
import { install } from 'twind';
import config from './twind.config';

install(config);

render(<App />, document.getElementById('app') as HTMLElement);

import { publicSettings, defaultSettings } from './index.js';

const visible = publicSettings(defaultSettings);

// @ts-expect-error публичные настройки нельзя менять
visible.currency = 'EUR';

// @ts-expect-error заметка не входит в публичные настройки
visible.note;

// @ts-expect-error валюта ограничена списком
publicSettings({ ...defaultSettings, currency: 'USD' });

/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

const CI_COMMIT_TAG_MESSAGE = process.env.CI_COMMIT_TAG_MESSAGE ?? '';
const SLACK_CHANNEL_IDS = (process.env.SLACK_CHANNEL_IDS ?? '').split(',').filter(Boolean);
const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN ?? '';
const TAG = process.env.CI_COMMIT_TAG ?? '';
const PACKAGE_URL = `https://www.npmjs.com/package/@grabjs/superapp-sdk/v/${TAG.replace(/^v/, '')}`;
const DOCS_URL = 'https://grab.github.io/superapp-sdk/index.html';

function formatChangelog(text) {
  if (!text) return '';

  return text
    .replace(/\\n/g, '\n')
    .replace(/^###\s+(.+)$/gm, '*$1*')
    .replace(/^##\s+(.+)$/gm, '*$1*')
    .replace(/^#\s+(.+)$/gm, '*$1*');
}

const PAYLOAD = {
  blocks: [
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: `🚀 New release: ${TAG}`,
        emoji: true,
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: formatChangelog(CI_COMMIT_TAG_MESSAGE),
      },
    },
    {
      type: 'actions',
      elements: [
        {
          type: 'button',
          text: { type: 'plain_text', text: '📦 npm' },
          url: PACKAGE_URL,
        },
        {
          type: 'button',
          text: { type: 'plain_text', text: '📚 Docs' },
          url: DOCS_URL,
        },
      ],
    },
  ],
};

async function notifySlack(channelId) {
  const response = await fetch('https://slack.com/api/chat.postMessage', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${SLACK_BOT_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ channel: channelId.trim(), ...PAYLOAD }),
  });

  const result = await response.json();

  if (!result.ok) {
    console.error(`Failed to notify ${channelId}:`, result.error);
    return false;
  }

  console.log(`Notified ${channelId}`);
  return true;
}

async function main() {
  if (!SLACK_BOT_TOKEN) {
    console.error('SLACK_BOT_TOKEN is not set');
    process.exit(1);
  }

  if (SLACK_CHANNEL_IDS.length === 0) {
    console.error('SLACK_CHANNEL_IDS is not set');
    process.exit(1);
  }

  console.log(`Notifying ${SLACK_CHANNEL_IDS.length} channels...`);

  const results = await Promise.all(SLACK_CHANNEL_IDS.map(notifySlack));
  const failed = results.filter((r) => !r).length;

  if (failed > 0) {
    console.error(`${failed} channel(s) failed to notify`);
    process.exit(1);
  }

  console.log('All channels notified successfully!');
}

main();
